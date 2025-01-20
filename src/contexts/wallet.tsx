'use client';

import { getBalance } from '@/lib/web3-requests';
import React, {
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useState,
} from 'react';
/**
 * Interfaces
 */
interface WalletContextValue {
  address: string | undefined;
  connectWallet: MouseEventHandler<HTMLButtonElement>;
  disconnectWallet: MouseEventHandler<HTMLButtonElement>;
  balance: number;
  getWalletBalance: (address: string) => Promise<void>;
  updateWalletBalance: () => Promise<void>;
  isConnecting?: boolean;
  isLoadingBalance?: Boolean;
  isDisconnecting?: boolean;
}

/**
 * Contexts
 */
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

/**
 * Contexts
 */
const WalletContext = createContext<WalletContextValue | undefined>(undefined);

/**
 * Providers
 */
const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    undefined,
  );
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [fetchingBalance, setFetchingBalance] = useState(true);

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

      setFetchingBalance(true);
      setBalance(await getBalance(address));
      setFetchingBalance(false);

      setWalletAddress(address);
    } catch (error) {
      console.error(error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      setDisconnecting(true);
      const { solana } = window;
      if (solana) {
        await solana.disconnect();
        setWalletAddress('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisconnecting(false);
      setFetchingBalance(false);
    }
  };

  const getWalletBalance = async (address: string) => {
    try {
      setFetchingBalance(true);
      setBalance(await getBalance(address));
    } catch (error) {
      console.error('Error getting balance:', error);
    } finally {
      setFetchingBalance(false);
    }
  };

  const updateWalletBalance = async () => {
    if (!walletAddress) return;
    await getWalletBalance(walletAddress);
  };

  return (
    <WalletContext.Provider
      value={{
        address: walletAddress,
        balance: balance,
        connectWallet: connectWallet,
        disconnectWallet: disconnectWallet,
        getWalletBalance: getWalletBalance,
        isConnecting: connecting,
        isLoadingBalance: fetchingBalance,
        isDisconnecting: disconnecting,
        updateWalletBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const useWalletContext = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

export { WalletProvider, useWalletContext };

export default WalletProvider;
