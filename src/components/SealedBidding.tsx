import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  FileText, 
  Clock, 
  DollarSign, 
  PlusCircle, 
  Activity, 
  Layers, 
  Check, 
  Building2, 
  ExternalLink 
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG, formatAddress } from '../utils/contract';

interface SealedBiddingProps {
  contractAddress: string;
  bidCount: bigint;
  reservePrice: bigint;
  isOpen: boolean;
  isConnected: boolean;
  isProving: boolean;
  txHash: string | null;
  error: string | null;
  onExecuteCircuit: (
    circuitName: 'initializeTender' | 'submitSealedBid' | 'submitDisclosedBid' | 'closeTender' | 'resetTender',
    inputValue: number
  ) => void;
}

export const SealedBidding: React.FC<SealedBiddingProps> = ({
  contractAddress,
  bidCount,
  reservePrice,
  isOpen,
  isConnected,
  isProving,
  txHash,
  error,
  onExecuteCircuit,
}) => {
  const [inputValue, setInputValue] = useState<number>(125000);
  const [selectedTender, setSelectedTender] = useState<string>('TND-2026-081');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const tenders = [
    {
      id: 'TND-2026-081',
      title: 'Global Cloud Infrastructure & Edge Servers',
      buyer: 'Apex Cloud Systems',
      reservePrice: '$100,000 USD',
      reserveVal: 100000,
      deadline: '23h 45m',
      category: 'Enterprise IT',
      verifiedBids: Number(bidCount),
      description: 'Distributed Kubernetes bare-metal nodes across APAC and EU data centers.',
    },
    {
      id: 'TND-2026-094',
      title: 'Municipal Clean Energy Microgrid Inverters',
      buyer: 'Metropolitan Energy Board',
      reservePrice: '$420,000 USD',
      reserveVal: 420000,
      deadline: '48h 10m',
      category: 'CleanTech',
      verifiedBids: 12,
      description: 'Grid-tied bidirectional battery inverters with telemetry integration.',
    },
    {
      id: 'TND-2026-102',
      title: 'Zero-Trust Cybersecurity SOC Audit 2026',
      buyer: 'FinGuard International',
      reservePrice: '$85,000 USD',
      reserveVal: 85000,
      deadline: '3d 12h',
      category: 'Security',
      verifiedBids: 7,
      description: 'Continuous adversarial penetration testing and smart contract verification.',
    },
  ];

  const filteredTenders = selectedCategory === 'All'
    ? tenders
    : tenders.filter(t => t.category === selectedCategory);

  const activeTenderData = tenders.find(t => t.id === selectedTender) || tenders[0];

  const handleWitnessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue > 0) {
      onExecuteCircuit('submitSealedBid', inputValue);
    }
  };

  const isBidValid = inputValue >= activeTenderData.reserveVal;

  return (
    <div className="space-y-6">
      {/* 1. Dashboard KPI Overview Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="obsidian-card p-4 border border-white/[0.08]">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Verified Public Bids
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">
              {bidCount.toString()}
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> On-Chain
            </span>
          </div>
        </div>

        <div className="obsidian-card p-4 border border-white/[0.08]">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Active Tender Reserve
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-cyan-200">
              {activeTenderData.reservePrice}
            </span>
          </div>
        </div>

        <div className="obsidian-card p-4 border border-white/[0.08]">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Confidential Witness
          </span>
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold mt-1">
            <Lock className="w-3.5 h-3.5" /> 100% Shielded
          </div>
        </div>

        <div className="obsidian-card p-4 border border-white/[0.08]">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Contract Status
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold mt-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-slate-200">{isOpen ? 'Tenders Open' : 'Settled'}</span>
          </div>
        </div>
      </div>

      {/* 2. Active Procurement Tenders Selector */}
      <div className="obsidian-card p-5 sm:p-6 border border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Active Procurement Tenders
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an enterprise procurement tender to construct your zero-knowledge sealed bid proposal.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {['All', 'Enterprise IT', 'CleanTech', 'Security'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredTenders.map((tender) => (
            <div
              key={tender.id}
              onClick={() => {
                setSelectedTender(tender.id);
                setInputValue(tender.reserveVal + 25000);
              }}
              className={`p-4 rounded-xl cursor-pointer transition-all border text-left flex flex-col justify-between ${
                selectedTender === tender.id
                  ? 'border-cyan-500 bg-cyan-950/20 ring-1 ring-cyan-500/30'
                  : 'bg-[#050914] border-white/[0.06] hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 text-slate-400">
                  <span className="font-bold text-cyan-300">{tender.id}</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Clock className="w-3 h-3" /> {tender.deadline}
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1 mb-1">{tender.title}</h4>
                <p className="text-[11px] text-slate-400 mb-2">{tender.buyer}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {tender.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Reserve: <strong className="text-slate-200">{tender.reservePrice}</strong>
                </span>
                <span className="text-cyan-400 font-mono font-semibold text-[11px]">
                  {tender.verifiedBids} Bids
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Sealed-Bidding Terminal */}
      <div className="obsidian-card p-5 sm:p-7 border border-white/[0.08] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Client-Side ZK Execution Terminal</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold badge-preprod">
                Compact v0.34
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Target: <strong className="text-slate-200">{activeTenderData.title}</strong> ({activeTenderData.id})
            </p>
          </div>

          <div className="bg-[#050914] px-3.5 py-1.5 rounded-lg border border-white/[0.08] text-left sm:text-right">
            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider block">
              Preprod Contract
            </span>
            <span className="font-mono text-xs text-cyan-300 font-semibold" title={contractAddress}>
              {formatAddress(contractAddress, 8, 6)}
            </span>
          </div>
        </div>

        {/* Mandatory Requirement: Privacy Label */}
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
              Proved without revealing your input
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              Your secret valuation delta and bid figure remain strictly confidential in your browser RAM. Only a zero-knowledge validity proof is submitted to Midnight.
            </p>
          </div>
        </div>

        {/* Bidding Form */}
        <form onSubmit={handleWitnessSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                Confidential Vendor Bid Amount (USD)
              </label>
              <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Private Witness Input
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min={activeTenderData.reserveVal}
                max="10000000"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
                disabled={!isConnected || isProving}
                className="w-full rounded-xl px-4 py-3 bg-[#050914] border border-white/[0.08] text-white font-mono text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                placeholder="Enter confidential bid value..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                ZK Shielded
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] mt-1.5">
              <span className="text-slate-400">
                Qualifying Reserve: <strong className="text-slate-300">{activeTenderData.reservePrice}</strong>
              </span>
              {isBidValid ? (
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" /> Satisfies secretBid &gt;= reservePrice
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> Under Reserve: Constraint will fail
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <button
              type="submit"
              disabled={!isConnected || isProving || !isBidValid}
              className="w-full sm:flex-1 btn-pill-primary py-3 px-6 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProving ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-cyan-200" />
                  <span>Generating Browser ZK Proof...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Submit Zero-Knowledge Sealed Bid</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onExecuteCircuit('initializeTender', activeTenderData.reserveVal)}
              disabled={!isConnected || isProving}
              className="w-full sm:w-auto btn-pill-secondary py-3 px-4 text-xs disabled:opacity-50"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Initialize Tender</span>
            </button>

            <button
              type="button"
              onClick={() => onExecuteCircuit('resetTender', 0)}
              disabled={!isConnected || isProving}
              className="w-full sm:w-auto btn-pill-secondary py-3 px-4 text-xs text-slate-400 hover:text-white disabled:opacity-50"
              title="Reset tender states for live testing"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>
          </div>
        </form>

        {/* Proving Status Overlay */}
        {isProving && (
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3 animate-pulse">
            <Cpu className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-cyan-200 block">
                Executing Local Client zk-SNARK Prover...
              </span>
              <span className="text-slate-400">
                Synthesizing arithmetic constraints (secretBid &gt;= reservePrice) inside browser memory.
              </span>
            </div>
          </div>
        )}

        {/* Transaction Submission Result & Receipt */}
        {txHash && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              Proof Verified &amp; Transaction Included on Midnight Preprod!
            </div>

            <div className="bg-[#050914] p-3 rounded-lg border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-mono text-slate-300 truncate" title={txHash}>
                Tx Hash: {txHash}
              </span>
              <a
                href={BIDVEIL_CONTRACT_CONFIG.explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 font-mono"
              >
                <span>View on Indexer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-[11px] text-emerald-300/90 italic">
              &#10003; Proved without revealing your input &mdash; Validator nodes verified proof validity while your bid valuation remained confidential.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};
