'use client';

import React from 'react';
import { Wallet, Send, ExternalLink } from 'lucide-react';
import { multisig } from '@/config/solana';
import { Agbalumo } from 'next/font/google';
import Card from '@/ui/card';
import Button from '@/ui/button';
import Label from '@/ui/label';
import Input from '@/ui/input';
import useTransfer from '@/hooks/use-transfer';
import { getExplorerAddressLink, truncate } from '@/lib/string-helpers';
import Link from 'next/link';
import { useWalletContext } from '@/contexts/wallet';

const geistSans = Agbalumo({
  variable: '--font-agbalumo',
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});

export default function Home() {
  const { connectWallet, disconnectWallet, balance, isConnecting, address } =
    useWalletContext();
  const { amount, sending, setAmount, handleTransfer } = useTransfer(address);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="a bsolute animate-blob -left-4 top-0 h-72 w-72 rounded-full bg-purple-500 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob absolute -bottom-8 right-20 h-72 w-72 rounded-full bg-blue-500 opacity-70 mix-blend-multiply blur-xl filter"></div>
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/20 to-white"></div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-4">
        <h1 className={`text-5xl ${geistSans.className} text-brand-blue`}>
          Babes Finance
        </h1>
        <Card>
          <div className="space-y-6">
            {!address ? (
              <div className="text-center">
                <p className="mb-4 text-lg">
                  Connect your wallet with the Solana network.
                </p>
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="text-white"
                >
                  <Wallet className="mr-1 h-4 w-4" />
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-xs font-medium text-neutral-500">
                      Connected Wallet:
                    </p>
                    <p className="font-bold">{truncate(address)}</p>
                  </div>
                  <Button
                    onClick={disconnectWallet}
                    size="btn-sm"
                    variant="btn-outline"
                  >
                    Disconnect
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>
                      <div className="flex items-center justify-between">
                        <p>Treasury (Multisig)</p>
                        <Link
                          href={getExplorerAddressLink(multisig)}
                          target="_blank"
                          className="flex items-center gap-1 transition duration-150 hover:text-brand-blue"
                        >
                          <p>{truncate(multisig)}</p>
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      <div className="flex items-center justify-between">
                        <p>Amount (SOL)</p>
                        <span className="text-black/40">
                          Balance: {balance.toFixed(4)}
                        </span>
                      </div>
                    </Label>
                    <Input
                      type="number"
                      step="0.001"
                      min="0"
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleTransfer}
                    disabled={sending || !amount || Number(amount) > balance}
                    className="w-full text-white"
                    // className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  >
                    <Send className="mr-1 h-4 w-4" />
                    {Number(amount) > balance
                      ? 'Insufficient SOL'
                      : sending
                        ? 'Sending...'
                        : !amount
                          ? 'Input SOL amount'
                          : 'Send Funds to Treasury'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
