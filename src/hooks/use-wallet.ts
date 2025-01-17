'use client';

import { getBalance } from '@/lib/web3-requests';
import { useState } from 'react';
import { toast } from 'react-toastify';

// const WALLET_PROVIDERS = {
//   Phantom: {
//     name: 'Phantom',
//     checkAvailable: () => window.solana?.isPhantom,
//     connect: async () => window?.solana?.connect(),
//     disconnect: async () => window?.solana?.disconnect(),
//   },
//   Solflare: {
//     name: 'Solflare',
//     checkAvailable: () => window.solflare?.isSolflare,
//     connect: async () => window.solflare?.connect(),
//     disconnect: async () => window.solflare?.disconnect(),
//   },
// };

export default function useWallet() {
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setConnecting(true);
      const { solana, solflare } = window;

      // determine selected wallet
      let wallet;
      if (solana?.isPhantom) {
        wallet = solana;
      } else if (solflare?.isSolflare) {
        wallet = solflare;
      }

      if (!wallet) {
        alert('Please install a Solana wallet');
        return;
      }

      const response = await wallet.connect();
      const address = response.publicKey.toString();
      setBalance(await getBalance(address));
      setWalletAddress(address);
    } catch (error) {
      console.error(error);
      toast('User rejected wallet connection request', { type: 'error' });
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
      setBalance(await getBalance(address));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  console.log('BALANCE:', balance);

  return {
    connectWallet,
    disconnectWallet,
    balance,
    connecting,
    walletAddress,
    getBalance: getWalletBalance,
  };
}
