import { SingleKey, Wallet } from '@arkade-os/sdk';
import { generateNostrNsec } from './nostr';

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

  async loadWallet(privateKeyHex: string) {
    if (walletInstance) return;

    console.log("Initializing wallet instance from key...");
    
    try {
      const identity = SingleKey.fromHex(privateKeyHex);
      
      walletInstance = await Wallet.create({
        identity,
        esploraUrl: 'https://mutinynet.com/api',
        arkServerUrl: 'https://mutinynet.arkade.sh',
      });
      
      console.log("Wallet instance restored in memory!");
    } catch (e) {
      console.error("Failed to load wallet instance", e);
      throw e;
    }
  },

  getAddress(){
    if(!walletInstance) throw new Error("Wallet not found.")
    return walletInstance.getAddress();
  },

  async getBalance() {
    if(!walletInstance) throw new Error("Wallet not found.")
    //The SDK returns a complex object
    const balance:any = await walletInstance.getBalance();

    return {
      confirmed: balance.boarding.confirmed,
      unconfirmed: balance.boarding.unconfirmed,
      
      // Available = Ark (Off-chain)
      // Available already does settled + preconfirmed
      ark: balance.available
    };
  }

};
