"use client"
import Header from "@/components/Header";
import ReceiveQRcode from "@/components/ReceiveQRcode";
import { useArkade } from "@/hooks/useArkade";
import { Copy } from "lucide-react";

export default function ReceivePage() {
    const { address } = useArkade();

    return (
        <>
            <Header pageName="Receive" />
            <div className="bg-[#121214] border border-zinc-800/60 rounded-3xl p-6 shadow-sm hover:border-zinc-700 transition mt-8 py-16">
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-zinc-400 text-xs uppercase font-bold mb-4 tracking-wider">Ark QR code address</h2>
                        <div className="flex justify-center w-full">
                            <div className="rounded-2xl overflow-hidden border border-zinc-800/60">
                                <ReceiveQRcode />
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/20 border border-zinc-800/60 rounded-3xl p-6 h-full flex flex-col">
                        <h3 className="text-gray-100 text-xs uppercase font-bold mb-4 tracking-wider">Your Ark Address</h3>
                        <div className="bg-black/50 p-4 rounded-xl border border-zinc-800 break-all font-mono text-[10px] lg:text-xs text-zinc-300 leading-relaxed relative group">
                        {address}
                        <button onClick={() => navigator.clipboard.writeText(address)} className="absolute top-2 right-2 p-2 bg-zinc-800 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-zinc-700 cursor-pointer">
                            <Copy size={14} />
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}