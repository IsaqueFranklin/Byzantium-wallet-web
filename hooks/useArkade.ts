import { useState } from "react";
import { arkadeService } from "@/lib/arkade";

export function useArkade() {
    //This is the state the user will see
    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState({ confirmed: 0, ark: 0 });
    const [privateKey, setPrivateKey] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //First action, create wallet and generate address
    async function create() {
        setIsLoading(true);
        
        try {
            //Creating wallet and setting privkey
            const keys = await arkadeService.createWallet();
            setPrivateKey(keys.privateKey)

            //Getting the address
            const addr = await arkadeService.getAddress();
            setAddress(addr);

            //Reseting the visual balance
            setBalance({ confirmed: 0, ark: 0 });
        } catch(error){
            console.log("Error to create: ", error);
            alert("Error creating wallet!");
        } finally {
            setIsLoading(false);
        }
    }

    //Second action, refresh balance
    async function refreshBalance() {
        if(!address) return;
        setIsLoading(true);

        try {
            const bal = await arkadeService.getBalance();
            setBalance({
                confirmed: bal.confirmed,
                ark: bal.ark
            });
        } catch(error){
            console.error("Error refreshin something!");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        address,
        balance,
        privateKey,
        isLoading,
        create,
        refreshBalance
    }
}