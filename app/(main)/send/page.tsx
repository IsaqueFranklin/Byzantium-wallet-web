"use client"
import Header from "@/components/Header";
import { useArkade } from "@/hooks/useArkade";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReceivePage() {
    const { payArkAddress } = useArkade();
    const [sats, setSats] = useState<number | undefined>();
    const [address, setAddress] = useState<string>('');
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const router = useRouter();

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
        setLoadingButton(true);

        if(sats != undefined){
            await payArkAddress(sats, address);
            setLoadingButton(false);
            router.push('/');
        };
    }

    return (
       <>
        <Header pageName="Send" />
        <div className="bg-[#121214] border border-zinc-800/60 rounded-3xl p-4 lg:p-6 shadow-sm max-w-4xl mx-auto">
            <h1 className="text-xl mb-6">Send sats</h1>
            <div className="space-y-6">
                <input type="number" onChange={handleSatsChange} value={sats} className="bg-white text-gray-900 border border-white rounded-xl px-4 py-2 text-md w-full" placeholder="Amount" />
                <input type="text" onChange={handleAddressChange} value={address} className="bg-white text-gray-900 border border-white rounded-xl px-4 py-2 text-md w-full" placeholder="Ark Address" />
                <button onClick={sendPayment} className="flex-1 w-full cursor-pointer lg:flex-none justify-center bg-black/20 hover:bg-amber-500/70 text-white border border-white/20 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition backdrop-blur-sm text-sm lg:text-base cursor-pointer">
                    {loadingButton ? (<div className="animate-spin rounded-full h-10 w-10 border-4 border-b-transparent border-white mx-auto"></div>) : "Send"}
                </button>
            </div>
        </div>
    </>
    )
}