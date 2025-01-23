import { Connection } from '@solana/web3.js';

// Initialize connection to Solana network (you can change the network)
export const connection =
  process.env.NODE_ENV === 'production'
    ? new Connection('https://api.mainnet-beta.solana.com', 'confirmed')
    : new Connection('https://api.devnet.solana.com', 'confirmed');

// team multi-sig
export const multisig = '7UfPQt7Vr9yFx9EV6kGJaiFh5xyuFTMx3X3FDCqFLSVk';
