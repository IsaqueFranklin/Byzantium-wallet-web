'use client'; // Necessary because using hooks
import Image from 'next/image';
import { useArkade } from '../hooks/useArkade';
import { useEffect } from 'react';

export default function Home() {
  const { address, balance, privateKey, isLoading, create, refreshBalance } = useArkade();

  useEffect(() => {
    if (!refreshBalance) return;
    refreshBalance();

    const intervalId = setInterval(refreshBalance, 15000);

    return () => clearInterval(intervalId);
  }, [refreshBalance])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black opacity-95 text-white p-8">
      
      <Image
        src="/constantinople.jpg"
        alt="Background Image"
        fill
        priority
        quality={100}
        className="object-cover -z-10 opacity-20" 
      />


      {!address ? (
        <div className="text-center max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-8">Byzantium Wallet</h1>
          <p className="text-white mb-4">Generate your ark wallet (Nostr-based)</p>
          <div className='space-y-4'>
            <button 
              onClick={create}
              disabled={isLoading}
              className="bg-black text-yellow-500 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition w-full cursor-pointer"
            >
              {isLoading ? 'Generating...' : 'New Wallet'}
            </button>
            <button 
              onClick={create}
              disabled={isLoading}
              className="bg-black text-yellow-500 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition w-full cursor-pointer"
            >
              {isLoading ? 'Generating...' : 'Restore Wallet'}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg space-y-6">
          
          <div className="bg-black p-6 rounded-2xl shadow-xl">
            <h2 className="text-yellow-500 text-sm">Balance</h2>
            <div className="text-4xl font-mono mt-2 flex items-baseline gap-2">
               {/* Somando Onchain + Ark */}
               {balance.confirmed + balance.ark} <span className="text-lg text-yellow-500">sats</span>
            </div>
            
            <div className="flex justify-between mt-4 text-xs text-gray-500">
               <span>On-chain: {balance.confirmed}</span>
               <span>Ark (Off-chain): {balance.ark}</span>
            </div>

            <button 
              onClick={refreshBalance}
              className="mt-4 w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-gray-100 text-sm cursor-pointer"
            >
              {isLoading ? 'Searching Blockchain...' : 'Refresh Balance'}
            </button>
          </div>

          <div className="bg-black p-6 rounded-2xl break-all shadow-xl">
            <h3 className="text-white text-sm mb-2">Your deposit address (Mutinynet)</h3>
            <code className="text-green-400 text-sm font-mono select-all">
              {address}
            </code>
            <p className="text-xs text-gray-400 mt-2">
              Copy this address to send sats to this wallet.
            </p>
          </div>

          <div className="bg-red-900/50 p-4 rounded-xl border border-red-900/50">
            <p className="text-red-300 text-xs font-bold mb-1">Hover to get your private key (hex)</p>
            <p className="text-red-300/70 text-xs font-mono break-all select-all blur-sm hover:blur-none transition cursor-pointer">
              {privateKey}
            </p>
          </div>

        </div>
      )}
    </main>
  );
}