'use client';

import { connection, multisig } from '@/config/solana';
import { useWalletContext } from '@/contexts/wallet';
import { getExplorerTxLink } from '@/lib/string-helpers';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useTransfer(walletAddress?: string) {
  const { updateWalletBalance } = useWalletContext();

  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);

  const handleTransfer = async () => {
    if (!(amount && walletAddress)) {
      toast('Please fill in all fields', { type: 'error' });
      return;
    }

    try {
      setSending(true);
      const { solana } = window;

      if (!solana) {
        toast('Phantom wallet connection not detected.', { type: 'error' });
        return;
      }

      // Create transfer instruction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(multisig),
          lamports: LAMPORTS_PER_SOL * parseFloat(amount),
        }),
      );

      // Get latest blockhash
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(walletAddress);

      // Send transaction
      console.log('TRANSACTION:', transaction);
      const signed = await solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);

      // Success State
      toast(
        <div className="flex items-center">
          <p>
            Transaction Success:{' '}
            <Link href={`${getExplorerTxLink(signature)}`} target={'_blank'}>
              View TX
            </Link>
          </p>
        </div>,
        { type: 'success' },
      );
      await updateWalletBalance();
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
