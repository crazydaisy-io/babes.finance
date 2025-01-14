import { Connection } from '@solana/web3.js';

// Initialize connection to Solana network (you can change the network)
export const connection = process.env.NODE_ENV === "production" ? 
    new Connection('https://api.mainnet-beta.solana.com') :
    new Connection('https://api.devnet.solana.com', 'confirmed')

// team multi-sig
export const multisig = "2p37aZDwU7tqKnYw62PXdmbNF65uMp12opCdj9Z5H9og"