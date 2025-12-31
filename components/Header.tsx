"use client"
import { useArkade } from "@/hooks/useArkade";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Header({ pageName }: { pageName: string }) {
    const { refreshBalance } = useArkade();
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refreshBalance();
        setTimeout(() => setRefreshing(false), 800);
    };

    return (
        <>
            <header className="flex justify-between items-center mb-6 lg:mb-8">
                <h1 className="text-xl lg:text-2xl font-bold hidden lg:block">{pageName}</h1>
                <div className="lg:hidden text-sm font-bold text-zinc-400">{pageName}</div>
                <div className="flex gap-4">
                <button onClick={handleRefresh} className={`p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 transition ${refreshing ? 'animate-spin' : ''}`}>
                    <RefreshCw size={18} className="text-zinc-400" />
                </button>
                <div className="bg-amber-950/30 border border-amber-900/50 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    <span className="text-amber-500 text-[10px] lg:text-xs font-bold">MUTINYNET</span>
                </div>
                </div>
            </header>
        </>
    )
}