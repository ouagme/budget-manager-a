import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'Budget Manager',description:'Personal multi-currency budget manager'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
