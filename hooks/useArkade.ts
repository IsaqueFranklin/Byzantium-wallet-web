import { useState, useEffect, useRef } from "react";
import { arkadeService } from "@/lib/arkade";

const STORAGE_KEYS = {
    ADDRESS: "@arkade:address",
    PRIVATE_KEY: "@arkade:privateKey",
    BALANCE: "@arkade:balance"
};

export function useArkade() {    
    const [address, setAddress] = useState<string>(() => {
        if (typeof window !== 'undefined') return localStorage.getItem(STORAGE_KEYS.ADDRESS) || '';
        return '';
    });

    const [privateKey, setPrivateKey] = useState<string>(() => {
        if (typeof window !== 'undefined') return localStorage.getItem(STORAGE_KEYS.PRIVATE_KEY) || '';
        return '';
    });

    const [balance, setBalance] = useState<{ confirmed: number, ark: number }>(() => {
        if (typeof window !== 'undefined') {
            const savedBalance = localStorage.getItem(STORAGE_KEYS.BALANCE);
            return savedBalance ? JSON.parse(savedBalance) : { confirmed: 0, ark: 0 };
        }
        return { confirmed: 0, ark: 0 };
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [history, setHistory] = useState<any>('');

    // When the ref changes, react doesn't refresh dom. It survives rerenders.
    const isRestored = useRef(false);

    // Hydrates arkadeService when page reloads
    useEffect(() => {
        const restoreWalletToService = async () => {
            if (privateKey && !isRestored.current) {
                console.log("♻️ Restoring wallet session...");
                try {
                    // Calls load wallet to load a new walletInstance with the privateKey
                    await arkadeService.loadWallet(privateKey);
                    // Also generates and sets tha address again in case we are restoring a wallet from homepage
                    const addr = await arkadeService.getAddress();
                    setAddress(addr);

                    isRestored.current = true;
                    
                    // Auto refresh balance when restoring
                    refreshBalance();
                } catch (error) {
                    console.error("Failed to restore wallet:", error);
                }
            }
        };

        restoreWalletToService();
    }, [privateKey]);

    // Autosaves to localStorage when the state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (address) localStorage.setItem(STORAGE_KEYS.ADDRESS, address);
            if (privateKey) localStorage.setItem(STORAGE_KEYS.PRIVATE_KEY, privateKey);
            localStorage.setItem(STORAGE_KEYS.BALANCE, JSON.stringify(balance));
        }
    }, [address, privateKey, balance]);

    async function create() {
        setIsLoading(true);
        
        try {
            const keys = await arkadeService.createWallet();
            
            setPrivateKey(keys.privateKey);
            
            isRestored.current = true; 

            const addr = await arkadeService.getAddress();
            setAddress(addr);

            setBalance({ confirmed: 0, ark: 0 });
        } catch(error){
            console.error("Error to create: ", error);
            alert("Error creating wallet!");
        } finally {
            setIsLoading(false);
        }
    }

    async function refreshBalance() {
        if(!privateKey) return;
        
        if (!isRestored.current) {
            console.log("Service not ready yet. Waiting for restore...");
            return;
        }

        setIsLoading(true);

        try {
            const bal = await arkadeService.getBalance();
            setBalance({
                confirmed: bal.confirmed,
                ark: bal.ark
            });
            const txs = await arkadeService.getTxHistory();
            setHistory(txs);
        } catch(error){
            console.error("Error refreshing balance!", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function payArkAddress(sats: number, address: string) {
        await arkadeService.sendOffChain(sats, address);
    }

    function disconnect() {
        setAddress('');
        setPrivateKey('');
        setBalance({ confirmed: 0, ark: 0 });
        isRestored.current = false;
        
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEYS.ADDRESS);
            localStorage.removeItem(STORAGE_KEYS.PRIVATE_KEY);
            localStorage.removeItem(STORAGE_KEYS.BALANCE);
        }
    }

    return {
        address,
        balance,
        privateKey,
        isLoading,
        history,
        create,
        refreshBalance,
        disconnect,
        payArkAddress
    }
}