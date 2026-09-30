import {NextResponse} from 'next/server';

export const runtime='nodejs';

type ChatMessage={role:'user'|'assistant';content:string};

const systemPrompt=`You are Budget AI, a personal budget assistant inside a multi-currency budget manager.
Answer in the user's language. Be concise, practical, and transparent.
Never invent balances, transactions, budgets, exchange rates, or other financial facts. If account data is not provided, explicitly say that you need the relevant data.
You can explain spending patterns, calculate simple totals from supplied numbers, help create budgets and savings plans, and identify tradeoffs.
For financial decisions, present assumptions and calculations rather than pretending certainty.
The app's base currency is MAD unless the user specifies another currency.
Current account snapshot is not connected yet, so do not claim access to private financial data.`;

export async function POST(request:Request){
 try{
  const body=await request.json() as {messages?:ChatMessage[]};
  const messages=Array.isArray(body.messages)?body.messages.filter(m=>m&&['user','assistant'].includes(m.role)&&typeof m.content==='string').slice(-12):[];
  if(!messages.length)return NextResponse.json({error:'Message requis.'},{status:400});

  const apiKey=process.env.OPENAI_API_KEY;
  if(!apiKey){
   const last=messages[messages.length-1].content.toLowerCase();
   const fallback=last.includes('dépense')||last.includes('depense')
    ?"Pour analyser vos dépenses réelles, connectez d'abord les transactions de votre compte. Je peux ensuite calculer les totaux par catégorie, comparer au budget et repérer les variations."
    :"Je suis prêt à analyser votre budget. Ajoutez vos revenus, dépenses et budgets dans l'application, puis demandez-moi une analyse précise.";
   return NextResponse.json({message:fallback,configured:false});
  }

  const response=await fetch('https://api.openai.com/v1/chat/completions',{
   method:'POST',
   headers:{'Content-Type':'application/json',Authorization:`Bearer ${apiKey}`},
   body:JSON.stringify({
    model:process.env.OPENAI_MODEL||'gpt-5.6-mini',
    messages:[{role:'system',content:systemPrompt},...messages],
    temperature:0.2,
    max_tokens:700,
   }),
  });
  if(!response.ok){
   const detail=await response.text();
   console.error('OpenAI API error',detail);
   return NextResponse.json({error:'Le service IA est temporairement indisponible.'},{status:502});
  }
  const data=await response.json();
  const message=data?.choices?.[0]?.message?.content;
  if(typeof message!=='string')return NextResponse.json({error:'Réponse IA invalide.'},{status:502});
  return NextResponse.json({message,configured:true});
 }catch(error){
  console.error('AI chat error',error);
  return NextResponse.json({error:'Requête invalide.'},{status:400});
 }
}
