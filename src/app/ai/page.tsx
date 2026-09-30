'use client';

import {FormEvent, useMemo, useState} from 'react';
import {Bot, Brain, ChevronLeft, Loader2, Send, Sparkles, WalletCards} from 'lucide-react';
import Link from 'next/link';

type Message={role:'user'|'assistant';content:string};

const starter:Message[]=[
 {role:'assistant',content:"Bonjour ! Je suis Budget AI. Je peux analyser vos dépenses, vos revenus et vos budgets, expliquer vos tendances et vous aider à planifier votre épargne. Que souhaitez-vous savoir ?"},
];

const quickPrompts=[
 "Analyse mes dépenses du mois",
 "Où puis-je réduire mes dépenses ?",
 "Puis-je me permettre une dépense de 1 500 MAD ?",
 "Crée-moi un plan d'épargne",
];

export default function AIPage(){
 const [messages,setMessages]=useState<Message[]>(starter);
 const [input,setInput]=useState('');
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState('');

 const conversation=useMemo(()=>messages.slice(-12),[messages]);

 async function sendMessage(text=input){
  const value=text.trim();
  if(!value||loading)return;
  setInput('');
  setError('');
  setMessages(m=>[...m,{role:'user',content:value}]);
  setLoading(true);
  try{
   const res=await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[...conversation,{role:'user',content:value}]} )});
   const data=await res.json();
   if(!res.ok) throw new Error(data.error||'Impossible de contacter Budget AI.');
   setMessages(m=>[...m,{role:'assistant',content:data.message}]);
  }catch(e){
   setError(e instanceof Error?e.message:'Une erreur est survenue.');
  }finally{setLoading(false);}
 }

 function submit(e:FormEvent){e.preventDefault();void sendMessage();}

 return <main className="min-h-screen bg-[#f7f8fb] text-slate-900">
  <header className="border-b border-slate-200 bg-white">
   <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
    <div className="flex items-center gap-3">
     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white"><WalletCards size={20}/></div>
     <div><div className="font-bold">Budget Manager</div><div className="text-xs text-slate-500">Assistant financier IA</div></div>
    </div>
    <Link href="/dashboard" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"><ChevronLeft size={16}/> Dashboard</Link>
   </div>
  </header>

  <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
   <aside className="hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
    <div className="mb-6 flex items-center gap-2 font-semibold"><Brain size={18}/> Budget AI</div>
    <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
     <div className="mb-2 flex items-center gap-2 font-medium text-slate-900"><Sparkles size={16}/> Ce que je peux faire</div>
     <ul className="space-y-2">
      <li>• analyser les dépenses</li><li>• comparer revenus et charges</li><li>• suivre les budgets</li><li>• préparer un plan d'épargne</li><li>• répondre en MAD, EUR, USD...</li>
     </ul>
    </div>
    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">Les réponses financières sont basées sur les données disponibles dans votre compte. Vérifiez toujours les montants avant une décision importante.</div>
   </aside>

   <section className="flex min-h-[calc(100vh-145px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-4">
     <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Bot size={21}/></div>
      <div><h1 className="font-bold">Budget AI</h1><p className="text-xs text-slate-500">Votre assistant budget personnel</p></div>
      <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">● En ligne</span>
     </div>
    </div>

    <div className="flex-1 space-y-4 overflow-y-auto p-5">
     {messages.map((m,i)=><div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
      <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${m.role==='user'?'bg-slate-950 text-white':'bg-slate-100 text-slate-800'}`}>{m.content}</div>
     </div>)}
     {loading&&<div className="flex justify-start"><div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500"><Loader2 className="animate-spin" size={16}/> Analyse de votre budget...</div></div>}
     {error&&<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    </div>

    <div className="border-t border-slate-200 p-4">
     <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
      {quickPrompts.map(q=><button key={q} onClick={()=>void sendMessage(q)} disabled={loading} className="shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-slate-400 hover:text-slate-900 disabled:opacity-50">{q}</button>)}
     </div>
     <form onSubmit={submit} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-2 focus-within:border-slate-500">
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Posez une question sur votre budget..." className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" />
      <button type="submit" disabled={!input.trim()||loading} className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white disabled:opacity-40"><Send size={17}/></button>
     </form>
     <p className="mt-2 text-center text-[11px] text-slate-400">Budget AI peut se tromper. Les données financières restent la source de vérité.</p>
    </div>
   </section>
  </div>
 </main>;
}
