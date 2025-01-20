'use client';

import { connection, multisig } from '@/config/solana';
import {
  LAMPORTS_PER_SOL,
  Signer,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useTransfer(walletAddress?: string) {
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);

  const handleTransfer = async () => {
    if (!(amount && walletAddress)) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSending(true);
      const { solana, solflare } = window;

      if (!(solana && solflare)) {
        throw new Error('Solana object not found! Get Phantom wallet');
      }

      // Create transfer instruction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(multisig),
          lamports: LAMPORTS_PER_SOL * parseFloat(amount),
        }),
      );
      // const signature = await sendAndConfirmTransaction(
      //   connection,
      //   transaction,
      //   [new Signer(walletAddress)]
      //  );

      // Get latest blockhash
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(walletAddress);

      // Send transaction
      console.log('TRANSACTION:', transaction);
      const signed = await solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);

      alert('Transfer successful!');
      setAmount('');
    } catch (error) {
      console.error(error);
      toast(String(error), {
        type: 'error',
      });
    } finally {
      setSending(false);
    }
  };

  return {
    amount,
    sending,
    handleTransfer,
    setAmount,
  };
}
