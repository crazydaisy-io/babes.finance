export const truncate = (address: string) =>
  address.slice(0, 4) + '...' + address.slice(-4);

export const getExplorerAddressLink = (address: string) =>
  `https://explorer.solana.com/address/${address}`;

export const getExplorerTxLink = (tx: string) =>
  `https://explorer.solana.com/tx/${tx}`;
