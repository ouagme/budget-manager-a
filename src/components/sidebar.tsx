'use client';
import Link from 'next/link';
import {LayoutDashboard,ArrowLeftRight,WalletCards,Target,ChartNoAxesCombined,Coins,Settings} from 'lucide-react';
const items=[['Dashboard','/dashboard',LayoutDashboard],['Transactions','/transactions',ArrowLeftRight],['Accounts','/accounts',WalletCards],['Budgets','/budgets',Target],['Savings','/savings',Target],['Reports','/reports',ChartNoAxesCombined],['Currencies','/currencies',Coins],['Settings','/settings',Settings]] as const;
export function Sidebar(){return <aside className="hidden lg:block w-64 p-4"><div className="card sticky top-4 p-4"><div className="text-xl font-bold mb-6">💰 Budget Manager</div>{items.map(([label,href,Icon])=><Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 mb-1 hover:bg-gray-100"><Icon size={18}/>{label}</Link>)}</div></aside>}
