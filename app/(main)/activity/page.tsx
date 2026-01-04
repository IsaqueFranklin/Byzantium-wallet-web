"use client"
import Header from "@/components/Header";
import TxHistory from "@/components/TxHistory";
import { Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { name: 'D-6', value: 0 }, { name: 'D-5', value: 100 }, { name: 'D-4', value: 50 },
    { name: 'D-3', value: 200 }, { name: 'D-2', value: 150 }, { name: 'Ontem', value: 300 }, { name: 'Hoje', value: 500 },
];

export default function ActivityPage() {
    return (
        <>
            <Header pageName="Activity" />
            
            {/*<div className="col-span-12 lg:col-span-8 bg-[#121214] border border-zinc-800/60 rounded-3xl p-4 lg:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-zinc-100 font-semibold flex items-center gap-2 text-sm lg:text-base"><Activity size={18} className="text-amber-500"/> Activity</h3>
                    <span className="text-xs text-zinc-500">Last 7 days</span>
                </div>
                <div className="h-48 lg:h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10}} />
                        <Tooltip contentStyle={{backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px'}} itemStyle={{color: '#fff'}} />
                        <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>*/}
            <TxHistory />
        </>
    )
}