import { connection } from "@/config/solana";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getBalance = async (address: string) => {
  try {
    const balance = await connection.getBalance(new PublicKey(address));
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error("Error getting balance:", error);
    return 0;
  }
};
