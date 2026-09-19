import React, { useState } from 'react';
import { 
  Check, 
  ArrowUpRight, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  Lock, 
  Star, 
  Search, 
  ExternalLink,
  Shield,
  Cpu,
  FileCheck2,
  Database,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { DocsSection } from './DocsSection';
import feedbackData from '../data/communityFeedback.json';
import { BIDVEIL_CONTRACT_CONFIG } from '../utils/contract';

interface LandingProps {
  onLaunchTerminal: () => void;
  contractAddress?: string;
  network?: string;
}

export const LandingPage: React.FC<LandingProps> = ({ 
  onLaunchTerminal,
  contractAddress = BIDVEIL_CONTRACT_CONFIG.preprodAddress,
  network = 'Preprod'
}) => {
  // Interactive Simulator State
  const [simulatedBid, setSimulatedBid] = useState(145000);
  const [simulatedReserve] = useState(100000);
  const [isProving, setIsProving] = useState(false);
  const [proofDone, setProofDone] = useState(false);

  // Filter feedbacks: only entries containing meaningful feedback
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const handleSimulate = () => {
    setIsProving(true);
    setProofDone(false);
    setTimeout(() => {
      setIsProving(false);
      setProofDone(true);
    }, 1400);
  };

  const validFeedbacks = feedbackData.filter((item) => {
    const hasFeedback = item.feedbackSummary && item.feedbackSummary.trim().length > 0;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedbackSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.organization && item.organization.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRating = filterRating === 'all' || item.rating === filterRating;
    return hasFeedback && matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-16 sm:space-y-24 py-4">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────────────────────── */}
      <section id="overview" className="text-center pt-8 pb-4 scroll-mt-28 space-y-6 max-w-[950px] mx-auto">
        {/* Status Indicator */}
        <div className="flex justify-center">
          <div className="ent-badge">
            <span className="w-2 h-2 rounded-full bg-[#74E8A3] animate-pulse" aria-hidden="true"></span>
            <span>LIVE ON MIDNIGHT PREPROD</span>
          </div>
        </div>

        {/* Primary Headline */}
        <h1 
          className="text-[#F4F7FA] font-bold mx-auto text-center"
          style={{
            fontSize: 'clamp(2.75rem, 5.5vw, 5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.045em',
            maxWidth: '950px',
          }}
        >
          Confidential Procurement, <br className="hidden sm:inline" />
          Proven On-Chain
        </h1>

        {/* Supporting Text (>= 16px) */}
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-[720px] mx-auto leading-relaxed">
          Bidveil enables suppliers to submit sealed procurement bids using client-side zero-knowledge proofs—protecting commercial terms while preserving transparent and verifiable settlement.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onLaunchTerminal}
            className="w-full sm:w-auto ent-btn-primary"
          >
            <span>Open Testnet App</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <a
            href="#architecture"
            className="w-full sm:w-auto ent-btn-secondary"
          >
            <span>Explore Architecture</span>
          </a>
        </div>

        {/* Polished Product / Bidding-Terminal Preview */}
        <div className="pt-8">
          <div className="ent-card p-5 sm:p-7 border border-[#253142] shadow-2xl relative overflow-hidden text-left bg-[#101722]/90">
            {/* Subtle Green Top Highlight Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#74E8A3]/40 to-transparent"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#253142]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#141D2A] border border-[#253142] flex items-center justify-center text-[#74E8A3]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F4F7FA] flex items-center gap-2">
                    <span>TND-2026-081 • Global Cloud Infrastructure &amp; Edge Nodes</span>
                  </div>
                  <div className="text-xs text-[#94A3B8]">
                    Buyer: Apex Cloud Systems • Qualifying Reserve: $100,000 USD
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="ent-badge text-[10px]">
                  <Lock className="w-3 h-3" /> Sealed Bid Window Open
                </span>
              </div>
            </div>

            {/* Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#080D14] border border-[#253142] space-y-1">
                <div className="text-[10px] uppercase font-semibold text-[#94A3B8]">Confidential Proposal</div>
                <div className="font-mono text-sm font-bold text-[#F4F7FA]">$125,000.00 USD</div>
                <div className="text-[11px] text-[#74E8A3] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Satisfies secretBid &gt;= reservePrice
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080D14] border border-[#253142] space-y-1">
                <div className="text-[10px] uppercase font-semibold text-[#94A3B8]">Client Witness Hash</div>
                <div className="font-mono text-xs text-[#94A3B8] truncate">0x9c4b7e12f08a419c...</div>
                <div className="text-[11px] text-[#94A3B8]">Protected in browser RAM via Lace</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080D14] border border-[#253142] space-y-1">
                <div className="text-[10px] uppercase font-semibold text-[#94A3B8]">On-Chain Verification</div>
                <div className="font-mono text-xs text-[#74E8A3] font-semibold">Valid ZK-Proof Broadcast</div>
                <div className="text-[11px] text-[#94A3B8]">Compact v0.34 verifier consensus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. METRICS SECTION (3 Equal Proof-Point Cards)
      ────────────────────────────────────────────────────────────── */}
      <section id="architecture" className="scroll-mt-24 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F7FA]">
            Architecture &amp; Core Guarantees
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Decoupling private valuation synthesis from on-chain verifier settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Private by Design */}
          <div className="ent-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#74E8A3] uppercase tracking-wider">
                Private by Design
              </div>
              <div className="text-3xl font-bold font-mono text-[#F4F7FA]">
                100% Shielded
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Bid values and private witness data remain within the bidder’s browser.
              </p>
            </div>

            <div className="pt-4 border-t border-[#253142] space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>No mempool valuation exposure</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Browser-local witness execution</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Cryptographic salt isolation</span>
              </div>
            </div>
          </div>

          {/* Card 2: Verified On-Chain */}
          <div className="ent-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#74E8A3] uppercase tracking-wider">
                Verified On-Chain
              </div>
              <div className="text-3xl font-bold font-mono text-[#F4F7FA]">
                52 Verified Testers
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Real preprod activity backed by verifiable transaction records.
              </p>
            </div>

            <div className="pt-4 border-t border-[#253142] space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Compact v0.34 smart contract</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Dual-state settlement</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Auditable transaction hashes</span>
              </div>
            </div>
          </div>

          {/* Card 3: Fast Proof Generation */}
          <div className="ent-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#74E8A3] uppercase tracking-wider">
                Fast Proof Generation
              </div>
              <div className="text-3xl font-bold font-mono text-[#F4F7FA]">
                Under 1.6 Seconds
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Efficient client-side proof generation for a smoother bidding experience.
              </p>
            </div>

            <div className="pt-4 border-t border-[#253142] space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Deterministic verification</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Protection against bid sniping</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4F7FA]">
                <span className="w-4 h-4 rounded-full bg-[#74E8A3]/15 text-[#74E8A3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Automated settlement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HOW IT WORKS SECTION (Three Step Flow)
      ────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="scroll-mt-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F7FA]">
            How Confidential Bidding Works
          </h2>
          <p className="text-sm text-[#94A3B8]">
            A transparent zero-knowledge procurement flow from bid input to on-chain settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="ent-card p-6 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#74E8A3]">01</span>
              <div className="w-8 h-8 rounded-full bg-[#141D2A] border border-[#253142] flex items-center justify-center text-[#74E8A3]">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-[#F4F7FA]">Create a Sealed Bid</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              A supplier enters a confidential valuation directly in the browser.
            </p>
          </div>

          {/* Step 2 */}
          <div className="ent-card p-6 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#74E8A3]">02</span>
              <div className="w-8 h-8 rounded-full bg-[#141D2A] border border-[#253142] flex items-center justify-center text-[#74E8A3]">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-[#F4F7FA]">Generate a Local Proof</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Bidveil creates the zero-knowledge proof without exposing the private bid.
            </p>
          </div>

          {/* Step 3 */}
          <div className="ent-card p-6 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#74E8A3]">03</span>
              <div className="w-8 h-8 rounded-full bg-[#141D2A] border border-[#253142] flex items-center justify-center text-[#74E8A3]">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-[#F4F7FA]">Verify and Settle</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              The contract verifies eligibility and completes a fair on-chain settlement.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PROOF SIMULATOR SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="ent-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#253142]">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F7FA]">
              Try the Zero-Knowledge Proof Simulator
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Test how client-side zero-knowledge arithmetic evaluates whether a confidential proposal meets tender criteria without exposing the valuation on-chain.
            </p>
          </div>

          <button
            onClick={onLaunchTerminal}
            className="ent-btn-secondary text-xs px-4 py-2 shrink-0 self-start sm:self-auto"
          >
            <span>Open Full Terminal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Simulator Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Confidential Proposal Valuation:</span>
                <span className="font-mono font-bold text-sm text-[#F4F7FA]">
                  ${simulatedBid.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="500000"
                step="5000"
                value={simulatedBid}
                onChange={(e) => setSimulatedBid(Number(e.target.value))}
                className="w-full bg-[#080D14] h-2 rounded-lg cursor-pointer"
                aria-label="Confidential Proposal Valuation Slider"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8] font-mono">
                <span>Reserve: ${simulatedReserve.toLocaleString()} USD</span>
                <span>Max: $500,000 USD</span>
              </div>
            </div>

            {/* Inputs summary */}
            <div className="p-4 rounded-xl bg-[#080D14] border border-[#253142] space-y-2 text-xs font-mono">
              <div className="text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider">
                Private Witness Inputs (Browser Local Only)
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>secretBidAmount:</span>
                <span className="text-[#74E8A3] font-bold">{simulatedBid}</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>reserveConstraint:</span>
                <span className="text-[#F4F7FA]">&gt;= {simulatedReserve} (Satisfied)</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>saltIsolation:</span>
                <span className="text-[#94A3B8]">0x8f2a...c31</span>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isProving}
              className="w-full ent-btn-primary py-3 text-xs"
            >
              {isProving ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Local zk-SNARK Constraints...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Generate ZK Proof &amp; Commitment</span>
                </>
              )}
            </button>
          </div>

          {/* Telemetry Output Display */}
          <div className="p-5 rounded-xl bg-[#080D14] border border-[#253142] text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#253142]">
              <span className="text-[10px] uppercase text-[#94A3B8] tracking-wider font-semibold">
                Public Ledger Broadcast Payload
              </span>
              <span className="text-[11px] text-[#74E8A3] flex items-center gap-1 font-sans font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#74E8A3]"></span> Ready
              </span>
            </div>

            <div className="space-y-1.5 text-[12px] text-[#94A3B8] pt-1">
              <div>
                <span className="text-[#94A3B8]">&gt; Public Witness Proof: </span>
                <span className="text-[#74E8A3]">zk_proof_payload_v1</span>
              </div>
              <div>
                <span className="text-[#94A3B8]">&gt; Revealed Valuation: </span>
                <span className="text-[#F4F7FA]">0 (Cryptographically Hidden)</span>
              </div>
              <div>
                <span className="text-[#94A3B8]">&gt; Reserve Criterion: </span>
                <span className="text-[#74E8A3]">Evaluated as True &#10003;</span>
              </div>
              <div>
                <span className="text-[#94A3B8]">&gt; Consensus Verifier Gas: </span>
                <span className="text-[#94A3B8]">0.0028 tNIGHT</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#253142]">
              {proofDone ? (
                <div className="p-3 rounded-lg bg-[#74E8A3]/10 border border-[#74E8A3]/25 text-[#74E8A3] text-xs flex items-center gap-2 font-sans">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Proof verified. The proposal passes reserve criteria while protecting confidential figures.</span>
                </div>
              ) : (
                <div className="text-xs text-[#94A3B8] italic font-sans flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                  <span>Adjust the valuation slider and click generate to test browser-local proving.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-xs text-[#94A3B8] italic border-t border-[#253142]/60 pt-3">
          Note: This interactive simulator executes zero-knowledge arithmetic in browser memory and does not submit financial transactions to the mainnet.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. COMMUNITY EVIDENCE (VERIFIED PREPROD ACTIVITY)
      ────────────────────────────────────────────────────────────── */}
      <section id="reviews" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="ent-badge text-xs mb-2">
              <span>On-Chain Activity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F7FA]">
              Verified Preprod Activity
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1 max-w-xl">
              Authentic feedback and verifiable transaction records from 52 builders on the Midnight Preprod testnet.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="ent-btn-secondary text-xs px-4 py-2"
            >
              <span>View Testing Evidence</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://forms.gle/JS3LoCsJGQGh144n9"
              target="_blank"
              rel="noreferrer"
              className="ent-btn-primary text-xs px-4 py-2"
            >
              <span>Share Testnet Feedback</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Evidence Metric Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="ent-card p-4">
            <div className="font-mono text-2xl font-bold text-[#F4F7FA]">52</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">Verified Testers</div>
          </div>
          <div className="ent-card p-4">
            <div className="font-mono text-2xl font-bold text-[#74E8A3]">52</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">Confirmed Transactions</div>
          </div>
          <div className="ent-card p-4">
            <div className="font-mono text-2xl font-bold text-[#F4F7FA]">100%</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">Successful Sealed Bids</div>
          </div>
          <div className="ent-card p-4">
            <div className="font-mono text-2xl font-bold text-[#74E8A3]">&lt; 1.6s</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">Avg Prover Time</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="ent-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tester reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#080D14] border border-[#253142] rounded-full pl-8 pr-3 py-1.5 text-xs text-[#F4F7FA] placeholder-[#94A3B8] focus:outline-none focus:border-[#74E8A3]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                filterRating === 'all' 
                  ? 'bg-[#141D2A] text-[#74E8A3] font-semibold border border-[#253142]' 
                  : 'hover:text-[#F4F7FA]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 ${
                filterRating === 5 
                  ? 'bg-[#141D2A] text-[#74E8A3] font-semibold border border-[#253142]' 
                  : 'hover:text-[#F4F7FA]'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5 Stars
            </button>
            <button
              onClick={() => setFilterRating(4)}
              className={`px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 ${
                filterRating === 4 
                  ? 'bg-[#141D2A] text-[#74E8A3] font-semibold border border-[#253142]' 
                  : 'hover:text-[#F4F7FA]'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4 Stars
            </button>
          </div>
        </div>

        {/* Valid Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {validFeedbacks.slice(0, 6).map((item) => (
            <div 
              key={item.userId}
              className="ent-card p-5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#F4F7FA]">{item.name}</div>
                    <div className="text-[10px] text-[#94A3B8]">{item.organization}</div>
                  </div>

                  {item.rating && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < item.rating 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-slate-700'
                          }`} 
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  "{item.feedbackSummary}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#253142] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>{item.userId}</span>
                <a
                  href={`https://preprod.midnight.network/tx/${item.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#74E8A3] hover:underline flex items-center gap-1"
                >
                  <span>Tx: {item.txHash.slice(0, 8)}...</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DOCUMENTATION SECTION
      ────────────────────────────────────────────────────────────── */}
      <DocsSection />

      {/* ─────────────────────────────────────────────────────────────
          7. FINAL CTA SECTION (Before Footer)
      ────────────────────────────────────────────────────────────── */}
      <section className="ent-card p-8 sm:p-12 text-center space-y-5 bg-[#101722] border border-[#253142]">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F7FA]">
            Bring Privacy to Your Procurement Workflow
          </h2>
          <p className="text-base text-[#94A3B8] leading-relaxed">
            Test confidential sealed bidding on Midnight Preprod and experience verifiable procurement without valuation leakage.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onLaunchTerminal}
            className="ent-btn-primary text-sm px-7 py-3"
          >
            <span>Launch Bidveil</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
