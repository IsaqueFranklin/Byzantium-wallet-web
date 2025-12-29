import { generateSecretKey, getPublicKey } from 'nostr-tools';
import { bytesToHex } from '@noble/hashes/utils';

export function generateNostrNsec() {
  console.log("Gerando nova identidade Nostr...");
    
  // A. Gera 32 bytes aleatórios (Sua Private Key crua)
  const secretKeyBytes = generateSecretKey();
    
  // B. Converte para Hexadecimal (String) para o SDK entender
  const privateKeyHex = bytesToHex(secretKeyBytes);
  const publicKey = getPublicKey(secretKeyBytes);

  return {
    privateKeyHex,
    publicKey
  }
}
