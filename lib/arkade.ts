import { SingleKey, Wallet } from '@arkade-os/sdk';

const identity = SingleKey.fromHex('');

const wallet = await Wallet.create({
  identity,
  esploraUrl: 'https://mutinynet.com/api',
  arkServerUrl: 'https://mutinynet.arkade.sh',
})
