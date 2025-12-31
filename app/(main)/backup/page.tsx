"use client"
import Header from "@/components/Header";
import { useArkade } from "@/hooks/useArkade";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function BackupPage() {
    const { address, balance, privateKey, refreshBalance } = useArkade();
    const [showKey, setShowKey] = useState(false);

    return (
        <>
            <Header pageName="Backup" />

            <div className="col-span-12 lg:col-span-4 space-y-4 lg:space-y-6">
                <div className="bg-[#121214] border border-zinc-800/60 rounded-3xl p-6 h-full flex flex-col">
                    <h3 className="text-zinc-400 text-xs uppercase font-bold mb-4 tracking-wider">Ark Address</h3>
                    <div className="bg-black/50 p-4 rounded-xl border border-zinc-800 break-all font-mono text-[10px] lg:text-xs text-zinc-300 leading-relaxed relative group">
                    {address}
                    <button onClick={() => navigator.clipboard.writeText(address)} className="absolute top-2 right-2 p-2 bg-zinc-800 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-zinc-700 cursor-pointer">
                        <Copy size={14} />
                    </button>
                    </div>
                </div>
                <div className="bg-[#121214] border border-red-900/20 rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-2">
                    <h3 className="text-red-400 text-xs uppercase font-bold tracking-wider">Private Key</h3>
                    <button onClick={() => setShowKey(!showKey)} className="text-zinc-500 hover:text-zinc-300 cursor-pointer">{showKey ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
                    </div>
                    <div className={`font-mono text-[10px] lg:text-xs break-all transition-all duration-300 ${showKey ? 'text-red-300 blur-none' : 'text-red-900 blur-sm select-none'}`}>
                    {showKey ? privateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                    </div>
                </div>
            </div>
        </>
    )
}