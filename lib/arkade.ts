import { SingleKey, Wallet } from '@arkade-os/sdk';
import { generateNostrNsec } from './nostr';

export type Tx = {
  amount: number
  boardingTxid: string
  createdAt: number
  explorable: string | undefined
  preconfirmed: boolean
  redeemTxid: string
  roundTxid: string
  settled: boolean
  type: string
}

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
  },

  async getTxHistory() {
    if(!walletInstance) throw new Error("Wallet not found.")
    const txs: Tx[] = []
    try {
      const res = await walletInstance.getTransactionHistory()
      if (!res) return []
      for (const tx of res) {
        const date = new Date(tx.createdAt)
        const unix = Math.floor(date.getTime() / 1000)
        const { key, settled, type, amount } = tx
        const explorable = key.boardingTxid ? key.boardingTxid : key.commitmentTxid ? key.commitmentTxid : undefined
        txs.push({
          amount: Math.abs(amount),
          boardingTxid: key.boardingTxid,
          redeemTxid: key.arkTxid,
          roundTxid: key.commitmentTxid,
          createdAt: unix,
          explorable,
          preconfirmed: !settled,
          settled: type === 'SENT' ? true : settled, // show all sent tx as settled
          type: type.toLowerCase(),
        })
      }
    } catch (err) {
      console.error(err, 'error getting tx history')
      return []
    }
    // sort by date, if have same date, put 'received' txs first
    txs.sort((a, b) => {
      if (a.createdAt === b.createdAt) return a.type === 'sent' ? -1 : 1
      if (b.createdAt === 0) return 1 // tx with no date go to the top
      if (a.createdAt === 0) return -1 // tx with no date go to the top
      return a.createdAt > b.createdAt ? -1 : 1
    })
    return txs
  }

};
