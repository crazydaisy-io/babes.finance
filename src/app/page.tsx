"use client"

import React from 'react';
import { Wallet, Send, ExternalLink } from 'lucide-react';
import { multisig } from '@/config/solana';
import { Agbalumo } from "next/font/google";
import Card from '@/ui/card';
import Button from '@/ui/button';
import Label from '@/ui/label';
import Input from '@/ui/input';
import useWallet from '@/hooks/use-wallet';
import useTransfer from '@/hooks/use-transfer';
import { getExplorerLink, truncate } from '@/lib/string-helpers';
import Link from 'next/link';

const geistSans = Agbalumo({
  variable: "--font-agbalumo",
  subsets: ['latin'],
  weight: "400",
  style: "normal"
});

export default function Home() {
  const { connectWallet, disconnectWallet, balance, connecting, walletAddress } = useWallet();
  const { amount, sending, setAmount, handleTransfer } = useTransfer(walletAddress);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="a bsolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/20 to-white"></div>

      {/* Content */}
      <div className="relative flex flex-col gap-8 items-center justify-center min-h-screen p-4">
        <h1 className={`text-5xl ${geistSans.className} text-brand-blue`}>Babes Finance</h1>
        <Card
        >
            <div className="space-y-6">
              {!walletAddress ? (
                <div className="text-center">
                  <p className="text-lg mb-4">
                    Connect your wallet with the Solana or Base networks.
                  </p>
                  <Button 
                    onClick={connectWallet}
                    disabled={connecting}
                    className="text-white"
                  >
                    <Wallet className="mr-1 h-4 w-4" />
                    {connecting ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-neutral-500">
                        Connected Wallet:
                      </p>
                      <p className="font-bold">
                      {truncate(walletAddress)}
                      </p>
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
                            href={getExplorerLink(multisig)} 
                            target="_blank" 
                            className="flex gap-1 items-center transition duration-150 hover:text-brand-blue"
                          >
                            <p>{truncate(multisig)}</p>
                            <ExternalLink size={16} />
                          </Link>
                        </div>
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        <div className="flex justify-between items-center">
                          <p>Amount (SOL)</p>
                          <span className="text-black/40">Balance: {balance}</span>
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
                      disabled={sending || !amount}
                      className="w-full text-white"
                      // className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    >
                      <Send className="mr-1 h-4 w-4" />
                      {sending ? 'Sending...' : 'Send Funds to Treasury'}
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
