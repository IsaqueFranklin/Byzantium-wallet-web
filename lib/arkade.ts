import { SingleKey, Wallet } from '@arkade-os/sdk';
import { generateNostrNsec } from './nostr';

// Variável para segurar a carteira na memória (Singleton)
let walletInstance: Wallet | null = null;

export const arkadeService = {
  
  async createWallet() {
    const nostr = generateNostrNsec();
    const identity = SingleKey.fromHex(nostr.privateKeyHex);
    
    walletInstance = await Wallet.create({
      identity,
      esploraUrl: 'https://mutinynet.com/api',
      arkServerUrl: 'https://mutinynet.arkade.sh',
    })

    console.log("Wallet created.");

    return {
      privateKey: nostr.privateKeyHex,
      publicKey: nostr.publicKey
    };
  },

  getAddress(){
    if(!walletInstance) throw new Error("Wallet not found.")
    return walletInstance.getAddress();
  },

  async getBalance() {
    if(!walletInstance) throw new Error("Wallet not found.")
    //The SDK returns a complex object
    const balance:any = await walletInstance.getBalance();

    // balance.onchain.total = Total balance on blockchain (slow)
    // balance.offchain.total = Ark balance (fast/virtual)
    return {
      confirmed: balance.boarding.confirmed,
      unconfirmed: balance.boarding.unconfirmed,
      
      // Available = Ark (Off-chain)
      // O 'available' já soma settled + preconfirmed
      ark: balance.available
    };
  }

};
