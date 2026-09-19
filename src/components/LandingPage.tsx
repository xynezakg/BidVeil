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
  Cpu,
  FileCheck2,
  Database,
  Sparkles
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

  // Review search & rating filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const handleSimulate = () => {
    setIsProving(true);
    setProofDone(false);
    setTimeout(() => {
      setIsProving(false);
      setProofDone(true);
    }, 1300);
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
    <div className="space-y-20 sm:space-y-28 py-4">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────────────────────── */}
      <section id="overview" className="text-center space-y-6 max-w-4xl mx-auto pt-6 scroll-mt-28">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131A2B] border border-[#1E293B] text-xs font-semibold text-[#00A3FF]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Midnight Network {network} • Compact v0.34</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Confidential Sealed-Bid <br className="hidden sm:inline" />
          Procurement on Midnight
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Eliminate bid sniping, front-running, and supplier price leakage. Execute browser-local zero-knowledge proofs via Lace without ever exposing confidential valuations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onLaunchTerminal}
            className="w-full sm:w-auto cyan-btn-gradient px-7 py-3.5 text-sm"
          >
            <span>Launch Bidding Terminal</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="#architecture"
            className="w-full sm:w-auto cyan-btn-secondary px-7 py-3.5 text-sm"
          >
            <span>Explore Architecture</span>
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CARDS GRID (Directly Matching the 4-Card Reference Image!)
      ────────────────────────────────────────────────────────────── */}
      <section id="architecture" className="scroll-mt-24 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Card 1: Private Witness */}
          <div className="cyan-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Private by Design</h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Client-side zk-SNARK witness execution
                </p>
              </div>

              {/* Dashed Metric Frame */}
              <div className="metric-dashed-box">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  100%
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">/ Shielded</div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>No mempool valuation exposure</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Browser RAM proving via Lace</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Cryptographic salt isolation</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLaunchTerminal}
              className="w-full cyan-btn-secondary text-xs py-2.5"
            >
              Explore Privacy
            </button>
          </div>

          {/* Card 2: FEATURED "Best Deal" Style Card with Glowing Cyan Border! */}
          <div className="cyan-card-featured p-6 flex flex-col justify-between space-y-6">
            {/* Top Cyan Tab Header */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00A3FF] to-[#0077FF] text-white text-[11px] font-extrabold tracking-wide uppercase shadow-lg shadow-cyan-500/30">
              Midnight Preprod
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-lg font-bold text-white">Preprod Protocol</h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Verified on-chain contract activity
                </p>
              </div>

              {/* Dashed Metric Frame */}
              <div className="metric-dashed-box border-[#00A3FF]/40 bg-[#00A3FF]/5">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  52+
                </div>
                <div className="text-xs text-[#00A3FF] mt-0.5 font-semibold">/ Verified Testers</div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 text-xs text-slate-200 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box bg-[#00A3FF] text-white border-transparent">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Compact v0.34 smart contract</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box bg-[#00A3FF] text-white border-transparent">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Dual-state consensus settlement</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box bg-[#00A3FF] text-white border-transparent">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>52 verified indexer transaction proofs</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLaunchTerminal}
              className="w-full cyan-btn-gradient text-xs py-2.5 font-bold"
            >
              Open Testnet App
            </button>
          </div>

          {/* Card 3: High Throughput */}
          <div className="cyan-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">High Throughput</h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Sub-second verification cycle
                </p>
              </div>

              {/* Dashed Metric Frame */}
              <div className="metric-dashed-box">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  &lt; 1.6s
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">/ Prover Time</div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Zero front-running or bid sniping</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Verifier gas &lt; 0.003 tNIGHT</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automated fair clearing upon close</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLaunchTerminal}
              className="w-full cyan-btn-secondary text-xs py-2.5"
            >
              View Performance
            </button>
          </div>

          {/* Card 4: Enterprise Audit */}
          <div className="cyan-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Enterprise Audit</h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Audit-ready procurement records
                </p>
              </div>

              {/* Dashed Metric Frame */}
              <div className="metric-dashed-box">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  0
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">/ Valuation Leakage</div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Mathematical eligibility proofs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Verifiable winner selection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="cyan-check-box">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Auditable public spreadsheet responses</span>
                </div>
              </div>
            </div>

            <a
              href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="w-full cyan-btn-secondary text-xs py-2.5 text-center"
            >
              Inspect Evidence
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HOW IT WORKS SECTION
      ────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="scroll-mt-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How Confidential Bidding Works
          </h2>
          <p className="text-sm text-[#94A3B8]">
            A transparent zero-knowledge procurement flow from bid creation to settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyan-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00A3FF]">01</span>
              <div className="w-8 h-8 rounded-xl bg-[#162035] border border-[#1E293B] flex items-center justify-center text-[#00A3FF]">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-bold text-white">Create a Sealed Bid</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              A supplier enters a confidential valuation directly in the browser.
            </p>
          </div>

          <div className="cyan-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00A3FF]">02</span>
              <div className="w-8 h-8 rounded-xl bg-[#162035] border border-[#1E293B] flex items-center justify-center text-[#00A3FF]">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-bold text-white">Generate a Local Proof</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Bidveil creates the zero-knowledge proof without exposing the private bid.
            </p>
          </div>

          <div className="cyan-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00A3FF]">03</span>
              <div className="w-8 h-8 rounded-xl bg-[#162035] border border-[#1E293B] flex items-center justify-center text-[#00A3FF]">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-base font-bold text-white">Verify and Settle</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              The contract verifies eligibility and completes a fair on-chain settlement.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PROOF SIMULATOR SECTION
      ────────────────────────────────────────────────────────────── */}
      <section id="simulator" className="cyan-card p-6 sm:p-8 space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Zero-Knowledge Proof Simulator
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Simulate browser-local arithmetic constraint evaluation in real-time.
            </p>
          </div>

          <button
            onClick={onLaunchTerminal}
            className="cyan-btn-secondary text-xs px-4 py-2 self-start sm:self-auto"
          >
            <span>Open Full Terminal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#94A3B8]">Confidential Proposal Valuation:</span>
                <span className="font-mono font-bold text-sm text-white">
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
                className="w-full bg-[#0B0F19] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8] font-mono mt-1">
                <span>Reserve: ${simulatedReserve.toLocaleString()} USD</span>
                <span>Max: $500,000 USD</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-1.5 font-mono text-xs">
              <div className="text-[10px] uppercase font-bold text-[#94A3B8]">Private Witness (Local RAM)</div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>secretBidAmount:</span>
                <span className="text-[#00A3FF] font-bold">{simulatedBid}</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>reserveConstraint:</span>
                <span className="text-slate-200">&gt;= {simulatedReserve} (Satisfied)</span>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isProving}
              className="w-full cyan-btn-gradient py-3 text-xs"
            >
              {isProving ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Local ZK Constraints...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Generate ZK Proof &amp; Commitment</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 rounded-xl bg-[#0B0F19] border border-[#1E293B] text-xs font-mono space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
              <span className="text-[#94A3B8] text-[11px]">Ledger Broadcast Telemetry</span>
              <span className="text-[10px] text-[#00A3FF] font-semibold">● Ready</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div>&gt; Public Witness: <span className="text-[#00A3FF]">zk_proof_payload_v1</span></div>
              <div>&gt; Exposed Bid: <span className="text-[#94A3B8]">None (Cryptographically Sealed)</span></div>
              <div>&gt; Constraint Status: <span className="text-[#00A3FF]">Verified Satisfied</span></div>
              <div>&gt; Verifier Gas: <span className="text-[#94A3B8]">0.0028 tNIGHT</span></div>
            </div>
            {proofDone && (
              <div className="pt-2 border-t border-[#1E293B] text-[#00A3FF] text-[11px] flex items-center gap-1.5 font-sans">
                <Check className="w-3.5 h-3.5" />
                <span>Proof generated in browser memory. Ready for Midnight Preprod submission.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. COMMUNITY EVIDENCE (VERIFIED PREPROD ACTIVITY)
      ────────────────────────────────────────────────────────────── */}
      <section id="reviews" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131A2B] border border-[#1E293B] text-xs font-semibold text-[#00A3FF] mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Community Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Verified Preprod Activity
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-xl">
              Authentic feedback and on-chain interaction proofs from 52 preprod builders.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="cyan-btn-secondary text-xs px-4 py-2"
            >
              <span>View Testing Evidence</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://forms.gle/JS3LoCsJGQGh144n9"
              target="_blank"
              rel="noreferrer"
              className="cyan-btn-gradient text-xs px-4 py-2"
            >
              <span>Share Testnet Feedback</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="cyan-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tester reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                filterRating === 'all' 
                  ? 'bg-[#162035] text-[#00A3FF] font-semibold border border-[#1E293B]' 
                  : 'hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 ${
                filterRating === 5 
                  ? 'bg-[#162035] text-[#00A3FF] font-semibold border border-[#1E293B]' 
                  : 'hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5 Stars
            </button>
            <button
              onClick={() => setFilterRating(4)}
              className={`px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 ${
                filterRating === 4 
                  ? 'bg-[#162035] text-[#00A3FF] font-semibold border border-[#1E293B]' 
                  : 'hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4 Stars
            </button>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {validFeedbacks.slice(0, 6).map((item) => (
            <div 
              key={item.userId}
              className="cyan-card p-5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
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

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{item.feedbackSummary}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>{item.userId}</span>
                <a
                  href={`https://preprod.midnight.network/tx/${item.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00A3FF] hover:underline flex items-center gap-1"
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
          7. FINAL CTA
      ────────────────────────────────────────────────────────────── */}
      <section className="cyan-card p-8 sm:p-12 text-center space-y-5">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Bring Privacy to Your Procurement Workflow
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Test confidential sealed bidding on Midnight Preprod and experience verifiable procurement without valuation leakage.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onLaunchTerminal}
            className="cyan-btn-gradient text-sm px-8 py-3.5"
          >
            <span>Launch Bidveil</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
