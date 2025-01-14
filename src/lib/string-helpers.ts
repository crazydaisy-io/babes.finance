export const truncate = (address: string) => address.slice(0, 4) + "..." + address.slice(-4);

export const getExplorerLink = (address: string) => `https://explorer.solana.com/address/${address}`