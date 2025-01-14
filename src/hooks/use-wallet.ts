"use client"

import { getBalance } from "@/lib/web3-requests";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useWallet() {
    const [balance, setBalance] = useState(0);
      const [walletAddress, setWalletAddress] = useState('');
      const [connecting, setConnecting] = useState(false);

      const connectWallet = async () => {
        try {
          setConnecting(true);
          const { solana } = window;
          
          if (!solana?.isPhantom) {
            alert('Please install Phantom wallet!');
            return;
          }
    
          const response = await solana.connect();
          setWalletAddress(response.publicKey.toString());
        } catch (error) {
          console.error(error);
          toast('User rejected wallet connection request', { type: 'error' })
        } finally {
          setConnecting(false);
        }
      };
    
      const disconnectWallet = async () => {
        try {
          const { solana } = window;
          if (solana) {
            await solana.disconnect();
            setWalletAddress('');
          }
        } catch (error) {
          console.error(error);
        }
      };

      const getWalletBalance = async (address: string) => {
        try {
            setBalance(await getBalance(address))
        } catch (error) {
          console.error('Error getting balance:', error);
        }
      };

      useEffect(() => {
        if (walletAddress) {
            getWalletBalance(walletAddress);
        }
      }, [walletAddress]);

    return {
        connectWallet,
        disconnectWallet,
        balance,
        connecting,
        walletAddress,
        getBalance: getWalletBalance,

    }
}