'use client';

import Link from 'next/link';
import {ArrowUpRight, Bot, CreditCard, PiggyBank, TrendingDown, Wallet} from 'lucide-react';

const stats=[['Solde total','12 450 MAD',Wallet],['Revenus','9 200 MAD',TrendingDown],['Dépenses','4 680 MAD',CreditCard],['Épargne','4 520 MAD',PiggyBank]] as const;

export default function Dashboard(){
 return <main className="min-h-screen bg-[#f7f8fb] text-slate-900">
  <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"><div><div className="text-lg font-bold">Budget Manager</div><div className="text-xs text-slate-500">Tableau de bord</div></div><Link href="/ai" className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"><Bot size={17}/> Budget AI</Link></div></header>
  <div className="mx-auto max-w-6xl px-4 py-8"><div className="mb-6"><h1 className="text-2xl font-bold">Bonjour 👋</h1><p className="mt-1 text-sm text-slate-500">Voici un aperçu de votre budget.</p></div>
   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([label,value,Icon])=><div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">{label}</span><Icon size={18} className="text-slate-400"/></div><div className="mt-3 text-2xl font-bold">{value}</div></div>)}</div>
   <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]"><div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><h2 className="font-bold">Dépenses récentes</h2><span className="text-xs text-slate-400">Exemple de données</span></div><div className="mt-5 space-y-3">{[['Courses','- 650 MAD'],['Transport','- 420 MAD'],['Logement','- 2 100 MAD'],['Restaurants','- 390 MAD']].map(x=><div key={x[0]} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm"><span>{x[0]}</span><span className="font-medium">{x[1]}</span></div>)}</div></div>
    <div className="rounded-2xl bg-slate-950 p-6 text-white"><div className="flex items-center gap-2 text-sm font-medium"><Bot size={18}/> Budget AI</div><h2 className="mt-4 text-xl font-bold">Votre budget, expliqué par l'IA.</h2><p className="mt-2 text-sm leading-6 text-slate-300">Analysez vos dépenses, posez vos questions et construisez un plan d'épargne.</p><Link href="/ai" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950">Ouvrir Budget AI <ArrowUpRight size={16}/></Link></div>
   </div>
  </div>
 </main>;
}
