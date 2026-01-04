"use client"
import Header from "@/components/Header";
import { useArkade } from "@/hooks/useArkade";
import { useState } from "react";

export default function ReceivePage() {
    const { payArkAddress } = useArkade();
    const [sats, setSats] = useState<number | undefined>();
    const [address, setAddress] = useState<string>('');

    const handleSatsChange = (event: any) => {
        event.preventDefault();
        setSats(event.target.value)
    }

    const handleAddressChange = (event: any) => {
        event.preventDefault();
        setAddress(event.target.value)
    }

    const sendPayment = async (event: any) => {
        event.preventDefault();
        if(sats != undefined){
            await payArkAddress(sats, address)
            alert("bingo")
        }
    }

    return (
       <>
        <Header pageName="Send" />
        <div className="bg-[#121214] border border-zinc-800/60 rounded-3xl p-4 lg:p-6 shadow-sm max-w-4xl mx-auto">
            <h1 className="text-lg mb-6">Yo send</h1>
            <div className="space-y-6">
                <input type="number" onChange={handleSatsChange} value={sats} className="bg-white text-gray-800 border border-white rounded-3xl px-4 py-2 text-sm w-full" placeholder="Amount" />
                <input type="text" onChange={handleAddressChange} value={address} className="bg-white text-gray-800 border border-white rounded-3xl px-4 py-2 text-sm w-full" placeholder="Ark Address" />
                <button onClick={sendPayment} className="flex-1 w-full cursor-pointer lg:flex-none justify-center bg-black/20 hover:bg-black/30 text-white border border-white/20 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition backdrop-blur-sm text-sm lg:text-base cursor-pointer">
                    Send
                </button>
            </div>
        </div>
    </>
    )
}