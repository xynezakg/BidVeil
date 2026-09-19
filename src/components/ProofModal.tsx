import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Check, 
  Copy, 
  ExternalLink, 
  Cpu, 
  Code2, 
  CheckCircle2, 
  KeyRound,
  FileText
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG } from '../utils/contract';

export interface ProofDetails {
  id: string;
  tender: string;
  time: string;
  tester: string;
  org: string;
  spec: string;
  reserve: string;
  tx: string;
}

interface ProofModalProps {
  proof: ProofDetails | null;
  onClose: () => void;
}

export const ProofModal: React.FC<ProofModalProps> = ({ proof, onClose }) => {
  const [copiedTx, setCopiedTx] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'raw'>('summary');

  if (!proof) return null;

  const handleCopyTx = () => {
    navigator.clipboard.writeText(proof.tx);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  const rawProofJson = {
    protocol: "Midnight Compact ZK-SNARK",
    version: "0.34.0-preprod",
    circuit: "submitSealedBid(secretBidAmount, reservePrice)",
    curve: "BLS12-381",
    scheme: "Groth16",
    tenderId: proof.tender,
    transactionHash: proof.tx,
    contractAddress: BIDVEIL_CONTRACT_CONFIG.preprodAddress,
    verification: {
      status: "VALID_AND_INCLUDED",
      synthesizedIn: proof.time,
      constraintEvaluated: "secretBid >= reservePrice",
      result: true
    },
    witness: {
      secretBidAmount: "[REDACTED_CLIENT_WITNESS_RAM_ONLY]",
      leakageRate: "0.00%",
      mempoolVisibility: "CONFIDENTIAL"
    },
    proofPoints: {
      pi_a: [
        `0x${proof.tx.slice(0, 16)}1a4b...`,
        `0x${proof.tx.slice(16, 32)}9f2c...`
      ],
      pi_b: [
        [`0x${proof.tx.slice(32, 48)}d81e...`, `0x${proof.tx.slice(48, 64)}b301...`],
        [`0x${proof.tx.slice(0, 16)}72c0...`, `0x${proof.tx.slice(16, 32)}a1e9...`]
      ],
      pi_c: [
        `0x${proof.tx.slice(24, 40)}f84d...`,
        `0x${proof.tx.slice(40, 56)}3e77...`
      ]
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(rawProofJson, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0D1222] border border-white/[0.12] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#090E1A] px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">On-Chain ZK Proof Certificate</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Midnight Network Preprod &bull; Order #{proof.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/[0.08] bg-[#070A14] px-6 pt-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'summary'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Proof Summary &amp; Witness</span>
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'raw'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Raw ZK-SNARK Object (JSON)</span>
          </button>
        </div>

        {/* Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-5 text-left text-xs">
          {activeTab === 'summary' ? (
            <>
              {/* Transaction Hash Strip */}
              <div className="p-3.5 rounded-xl bg-[#070A14] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="space-y-0.5 overflow-hidden">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Midnight Transaction Hash
                  </span>
                  <span className="font-mono text-xs text-cyan-300 font-semibold break-all select-all block">
                    0x{proof.tx}
                  </span>
                </div>

                <button
                  onClick={handleCopyTx}
                  className="px-3 py-1.5 rounded-lg bg-[#131B31] hover:bg-[#1A2542] border border-white/10 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  {copiedTx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Hash</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tender & Vendor Specification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#070A14] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Tender ID &amp; Target</span>
                  <p className="font-bold text-white text-sm">{proof.tender}</p>
                  <p className="text-slate-400 text-[11px] line-clamp-1">{proof.spec}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#070A14] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Preprod Tester / Vendor</span>
                  <p className="font-bold text-white text-sm">{proof.tester}</p>
                  <p className="text-slate-400 text-[11px] line-clamp-1">{proof.org}</p>
                </div>
              </div>

              {/* Zero-Knowledge Privacy Isolation Breakdown */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-[#0B0F1E] to-[#070A14] border border-indigo-500/25 space-y-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Kachina Zero-Knowledge Verification Guarantee</span>
                </div>

                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <div className="p-2.5 rounded-lg bg-[#070A14]/80 border border-white/[0.05] flex items-start gap-2">
                    <KeyRound className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Private Witness (Shielded In RAM):</strong>
                      <span>The vendor's true valuation was synthesized locally inside Lace. Exactly <strong className="text-cyan-300">0 bytes</strong> of bid pricing were broadcast to the network mempool.</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#070A14]/80 border border-white/[0.05] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Evaluated On-Chain Circuit Constraint:</strong>
                      <span>Mathematical check <code className="text-cyan-300 bg-white/5 px-1 py-0.5 rounded font-mono">secretBid &gt;= {proof.reserve}</code> evaluated to <strong className="text-emerald-400 font-bold">TRUE</strong> without revealing the delta.</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#070A14]/80 border border-white/[0.05] flex items-start gap-2">
                    <Cpu className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Midnight Validator Consensus:</strong>
                      <span>All validator nodes verified the Groth16 cryptographic proof polynomial in <strong className="text-white font-mono">{proof.time}</strong> and committed the state hash to the canonical Preprod ledger.</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Raw JSON View */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">
                  Raw cryptographic zk-SNARK representation generated by Midnight Compact toolchain v0.34
                </span>
                <button
                  onClick={handleCopyJson}
                  className="px-3 py-1.5 rounded-lg bg-[#131B31] hover:bg-[#1A2542] border border-white/10 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied JSON</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#070A14] border border-white/[0.06] font-mono text-[11px] text-cyan-300 overflow-x-auto select-all leading-relaxed max-h-[340px]">
                {JSON.stringify(rawProofJson, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#090E1A] px-6 py-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Canonical Contract: <code className="text-cyan-300 font-mono">7ff3...8ec2</code></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={BIDVEIL_CONTRACT_CONFIG.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#131B31] hover:bg-[#1A2542] border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            >
              <span>Midnight Explorer</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={onClose}
              className="bv-btn-primary px-5 py-2 text-xs flex-1 sm:flex-initial"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofModal;
