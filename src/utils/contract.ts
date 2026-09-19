/**
 * Bidveil Contract Utilities & Interaction Helpers
 */

export const BIDVEIL_CONTRACT_CONFIG = {
  contractName: 'bidveil',
  network: 'Preprod',
  address: '7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2',
  preprodAddress: '7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2',
  previewAddress: '7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2',
  explorerUrl: 'https://www.midnightexplorer.com',
  circuits: {
    initializeTender: 'initializeTender',
    submitSealedBid: 'submitSealedBid',
    submitDisclosedBid: 'submitDisclosedBid',
    closeTender: 'closeTender',
    resetTender: 'resetTender',
  },
};

export interface TenderInfo {
  id: string;
  title: string;
  buyer: string;
  reservePrice: bigint;
  reservePriceFormatted: string;
  deadline: string;
  category: string;
  verifiedBidsCount: number;
  isOpen: boolean;
}

export function formatAddress(address: string, lead = 12, trail = 8): string {
  if (!address) return '';
  if (address.length <= lead + trail) return address;
  return `${address.slice(0, lead)}...${address.slice(-trail)}`;
}

export function formatTokenAmount(amount: number | bigint): string {
  return Number(amount).toLocaleString();
}
