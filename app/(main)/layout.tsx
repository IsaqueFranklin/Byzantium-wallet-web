'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useArkade } from '../../hooks/useArkade'; // Ajuste o caminho ../../
import Image from 'next/image';
import { 
  LayoutDashboard, ArrowDownLeft, ArrowUpRight, Settings, 
  Activity, Menu, X, Zap, RefreshCw,
  SaveIcon,
  ForwardIcon
} from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { address, create, isLoading } = useArkade();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="flex min-h-screen bg-[#09090b]" />;
    }

    if (!address) {
        return (
        <main className="relative flex min-h-screen flex-col items-center justify-center bg-black/90 text-white p-8 overflow-hidden">
            <Image
            src="/constantinople.jpg"
            alt="Background"
            fill
            priority
            quality={100}
            className="object-cover -z-10 opacity-90" 
            />
            <div className="z-10 text-center max-w-lg backdrop-blur-sm bg-black/40 p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="mb-6 flex justify-center">
                <div className="h-32 w-32  rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                    <img 
                        src="/logo.png" 
                        alt="logo"
                        className="w-64 rounded-full" 
                    />
                </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Byzantium</h1>
            <p className="text-zinc-300 mb-8 text-md">An Arkade powered Ark protocol wallet</p>
            
            <button 
                onClick={create}
                disabled={isLoading}
                className="w-full bg-[#D69225] hover:bg-[#D69225]/60 text-white font-semibold py-3 md:py-4 px-4 md:px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
                {isLoading ? <RefreshCw className="animate-spin" /> : <Zap size={20} />}
                {isLoading ? 'Forging Wallet...' : 'Create New Wallet'}
            </button>
            </div>
        </main>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-amber-500/30">
        
        {isSidebarOpen && (
            <div 
            className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
            />
        )}

        <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-[#0c0c0e] border-r border-zinc-800/60 
            transform transition-transform duration-300 ease-in-out flex flex-col
            lg:static lg:translate-x-0 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex items-center justify-between px-6 py-6 mb-2">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                    <img 
                        src="/logo.png" 
                        alt="logo"
                        className="w-12 rounded-full" 
                    />
                </div>
                <div>
                <h2 className="font-bold text-sm tracking-wide">Byzantium</h2>
                <span className="text-xs text-zinc-500">Ark Testnet</span>
                </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
                <X size={24} />
            </button>
            </div>

            <nav className="flex-1 space-y-1 px-4">
                <NavItem href="/" icon={<LayoutDashboard size={20} />} label="Overview" active={pathname === '/'} />
                <NavItem href="/send" icon={<ArrowUpRight size={20} />} label="Send" active={pathname === '/send'} />
                <NavItem href="/receive" icon={<ArrowDownLeft size={20} />} label="Receive" active={pathname === '/receive'} />
                <NavItem href="/activity" icon={<Activity size={20} />} label="Activity" active={pathname === '/activity'} />
                <NavItem href="/backup" icon={<SaveIcon size={20} />} label="backup" active={pathname === '/backup'} />
                <div className="pt-4 mt-4 border-t border-zinc-800/60">
                    <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" active={pathname === '/settings'} />
                </div>
            </nav>

            <div className="mt-auto p-4">
            <NavItem href="/relays" icon={<ForwardIcon size={20} />} label="Nostr relays" active={pathname === '/relays'} />
            </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0c0c0e] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="h-12 w-12  rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                        <img 
                            src="/logo.png" 
                            alt="logo"
                            className="w-12 rounded-full" 
                        />
                    </div>
                    <span className="font-bold text-lg">Byzantium</span>
                </div>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-zinc-300 hover:bg-zinc-800 rounded-lg">
                    <Menu size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
            {children} 
            </div>
        </main>
        </div>
    );
}

function NavItem({ icon, label, active, href }: any) {
    return (
        <Link href={href} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
        active ? 'bg-[#D69225]/80 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
        }`}>
        {icon} <span>{label}</span>
        </Link>
    );
}