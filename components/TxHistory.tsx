"use client"
import { useArkade } from "@/hooks/useArkade";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TxHistory() {
    const { history, isLoading } = useArkade();

    function newDate(obj:any){
        const timestamp = new Date(obj * 1000);
        const formattedDate = format(timestamp, 'MMM d yyyy, h:mm a');
        return formattedDate
    }
    
    return (
        <>
            {!history && isLoading ? (
                <div className="bg-[#121214] border border-zinc-800/60 rounded-3xl p-6 shadow-sm hover:border-zinc-700 transition mt-8 items-center justify-center text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-b-transparent border-amber-500 mx-auto"></div>
                </div>
            ) : (
                <div className="bg-[#121214] border border-zinc-800/60 rounded-3xl p-6 shadow-sm hover:border-zinc-700 transition mt-8">
                    <h2 className='mb-6 text-[[#D69225]] text-xs font-bold uppercase tracking-wider justify-center'>Transaction history</h2>
                    {history && history.map((item:any, key:any) => (
                        <div key={key} className='bg-zinc-800/40 border border-zinc-800/90 rounded-3xl p-4 my-2'>
                        <div className='flex gap-8 items-center'>
                            <div className='flex gap-4 items-center'>
                            <div className='p-1 border border-zinc-800/90 rounded-full bg-white shadow-lg'>
                                {item.type == "received" ? (
                                <ArrowDownLeft className='text-zinc-800/90'/>
                                ) : (
                                <ArrowUpRight className='text-zinc-800/90'/>
                                )}
                            </div>
                            <p className='text-lg font-semibold'>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                            </div>
                            <p className='font-semibold text-gray-300 text-lg'>{item.type == "received" ? "+ "+item.amount : "- "+item.amount} sats</p>
                        </div>
                        <p className='mt-4'>{newDate(item.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}