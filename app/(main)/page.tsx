'use client';
import { useArkade } from '../../hooks/useArkade';
import { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, Activity, Copy, Eye, EyeOff, RefreshCw, Zap, HardDrive } from 'lucide-react';
import Header from '@/components/Header';

// Componente StatCard (pode ficar no mesmo arquivo ou separado)
function StatCard({ title, value, icon }: any) {
  return (
    <div className="w-full bg-[#121214] border border-zinc-800/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-zinc-700 transition">
      <div className="flex justify-between items-start mb-4">
        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">{icon}</div>
      </div>
      <div className="text-xl font-bold text-zinc-100 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">{value}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { address, balance, refreshBalance } = useArkade();

  useEffect(() => {
    if (refreshBalance) refreshBalance();
    const intervalId = setInterval(() => refreshBalance && refreshBalance(), 15000);
    return () => clearInterval(intervalId);
  }, [address]); // Removi refreshBalance do array para evitar loops se a função não for estável

  return (
    <>
      <Header pageName="Overview" />

      <div className="grid grid-cols-2 gap-4 lg:gap-6 pb-20 lg:pb-0">
        
        {/* HERO CARD */}
        <div className="col-span-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D69225]/80 to-amber-500 p-6 lg:p-8 shadow-2xl shadow-amber-900/20">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Zap size={200} /></div>
          <div className="relative z-10">
            <span className="text-amber-100/80 text-xs lg:text-sm font-medium tracking-wider uppercase">Total Balance</span>
            <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-2 mt-1">
              <span className="text-5xl lg:text-6xl font-bold text-white tracking-tighter">
                {(balance.confirmed + balance.ark).toLocaleString()}
              </span>
              <span className="text-lg lg:text-xl text-amber-200 font-medium">sats</span>
            </div>
            <div className="flex gap-3 mt-6 lg:mt-8">
              <button className="flex-1 lg:flex-none justify-center bg-white text-black hover:bg-zinc-100 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition shadow-lg text-sm lg:text-base cursor-pointer">
                <ArrowDownLeft size={18} /> Receive
              </button>
              <button className="flex-1 lg:flex-none justify-center bg-black/20 hover:bg-black/30 text-white border border-white/20 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition backdrop-blur-sm text-sm lg:text-base cursor-pointer">
                <ArrowUpRight size={18} /> Send
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <StatCard title="Ark Balance" value={`${balance.ark} sats`} icon={<Zap className="text-amber-500" size={18} />} />
        <StatCard title="On-Chain" value={`${balance.confirmed} sats`} icon={<HardDrive className="text-zinc-400" size={18} />} />
        
      </div>
    </>
  );
}