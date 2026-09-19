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
  ChevronRight,
  Zap,
  Layers,
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
  const [simulatedBid, setSimulatedBid] = useState(150000);
  const [isProving, setIsProving] = useState(false);
  const [proofDone, setProofDone] = useState(false);

  // Feedback search & filter
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

  const filteredFeedbacks = feedbackData.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedbackSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || item.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-20 sm:space-y-28 py-6">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Clean, Centered Motta Aesthetic)
      ────────────────────────────────────────────────────────────── */}
      <section id="overview" className="text-center space-y-5 max-w-3xl mx-auto pt-6 scroll-mt-28">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          The Zero-Knowledge Standard <br className="hidden sm:inline" />
          for Enterprise Procurement
        </h1>

        <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Our confidential smart contracts make it easy to submit sealed tender valuations without disclosing private commercial terms to validators or competitors.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onLaunchTerminal}
            className="motta-pill-btn-primary"
          >
            <span>Launch Bidding Terminal</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="#architecture"
            className="motta-pill-btn-secondary"
          >
            <span>Explore Architecture</span>
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THREE-CARD BENTO GRID (Directly Mirroring Motta Reference)
      ────────────────────────────────────────────────────────────── */}
      <section id="architecture" className="scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Shielded Witness (Like "Free" Card) */}
          <div className="motta-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Private Layer
              </span>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">100%</span>
                <span className="text-xs text-slate-400 font-medium">/ shielded</span>
              </div>

              <p className="text-xs text-slate-400">
                Browser-local zk-SNARK witness execution
              </p>

              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">Includes:</span>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Zero mempool valuation exposure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Private witness in Lace wallet RAM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Cryptographic salt isolation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Client-side constraint satisfaction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Preprod Activity (Featured Center Card like "Grow") */}
          <div className="motta-card-featured p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Midnight Preprod
              </span>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">52+</span>
                <span className="text-xs text-slate-400 font-medium">/ verified testers</span>
              </div>

              <p className="text-xs text-slate-400">
                Live on-chain contract activity and indexer proof
              </p>

              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">Everything in Private Layer, Plus:</span>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-400 text-[#052e16] flex items-center justify-center shrink-0 font-bold">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Compact v0.34 smart contract</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-400 text-[#052e16] flex items-center justify-center shrink-0 font-bold">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Dual-state consensus settlement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-400 text-[#052e16] flex items-center justify-center shrink-0 font-bold">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>52 verified indexer transaction hashes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-400 text-[#052e16] flex items-center justify-center shrink-0 font-bold">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Auditable public spreadsheet responses</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Motta Center Pill Badge */}
            <div className="pt-2">
              <div className="w-full py-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold text-center">
                Recommended Protocol
              </div>
            </div>
          </div>

          {/* Card 3: Performance (Like "Scale" Card) */}
          <div className="motta-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Consensus Engine
              </span>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">&lt; 1.6s</span>
                <span className="text-xs text-slate-400 font-medium">/ prover</span>
              </div>

              <p className="text-xs text-slate-400">
                Sub-second arithmetic verification cycle
              </p>

              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">Protocol Guarantees:</span>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Zero front-running &amp; bid sniping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Verifier execution gas &lt; 0.003 tNIGHT</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Automated fair clearing upon closing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Deterministic cryptographic settlement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MOTTA BOTTOM CURVED BANNER ("Grab It Fast to Get Special Price")
      ────────────────────────────────────────────────────────────── */}
      <section className="motta-bottom-banner p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Ready to test Zero-Knowledge Sealed Bids?
          </h3>
          <p className="text-xs text-emerald-200/80">
            Connect your Lace wallet on Midnight Preprod and submit a sealed proposal with zero valuation leakage.
          </p>
        </div>

        <button
          onClick={onLaunchTerminal}
          className="motta-pill-btn-primary shrink-0 text-xs px-6 py-3 font-bold"
        >
          <span>Launch Bidding Terminal</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE PROVER SIMULATOR (Matte Dark Style)
      ────────────────────────────────────────────────────────────── */}
      <section className="motta-card p-7 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Client-Side ZK Prover Simulator</h3>
              <p className="text-xs text-slate-400">Preview local zero-knowledge proof generation</p>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Contract: <span className="text-emerald-400 font-mono">Midnight {network}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Confidential Valuation:</span>
                <span className="font-bold text-white text-sm">
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
                className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Reserve: $100,000 USD</span>
                <span>Max: $500,000 USD</span>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isProving}
              className="w-full motta-pill-btn-primary py-2.5 text-xs font-bold"
            >
              {isProving ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Arithmetic Constraints...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Generate ZK Proof &amp; Commitment</span>
                </>
              )}
            </button>
          </div>

          {/* Result Output */}
          <div className="p-4 rounded-2xl bg-[#0a0e17] border border-white/[0.06] text-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-slate-400 text-[11px]">Ledger Broadcast Telemetry</span>
              <span className="text-[10px] text-emerald-400 font-semibold">● Ready</span>
            </div>
            <div className="space-y-1 text-slate-300 font-mono text-[11px]">
              <div>&gt; Public Witness: <span className="text-emerald-400">zk_proof_payload</span></div>
              <div>&gt; Exposed Bid: <span className="text-slate-500">None (Cryptographically Sealed)</span></div>
              <div>&gt; Constraint Check: <span className="text-emerald-400">Satisfied (bid &gt;= reserve)</span></div>
            </div>
            {proofDone && (
              <div className="pt-2 text-[11px] text-emerald-300 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>ZK proof generated in browser memory. Ready for Midnight submission.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. COMMUNITY FEEDBACK & PREPROD TESTERS (52 Verified Reviews)
      ────────────────────────────────────────────────────────────── */}
      <section id="feedbacks" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Community Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Feedback from 52 Preprod Testers
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="motta-pill-btn-secondary text-xs"
            >
              <span>Public Sheet</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://forms.gle/JS3LoCsJGQGh144n9"
              target="_blank"
              rel="noreferrer"
              className="motta-pill-btn-primary text-xs"
            >
              <span>Submit Feedback</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="motta-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search feedback, testers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0e17] border border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                filterRating === 'all' 
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All (52)
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 ${
                filterRating === 5 
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5 Stars
            </button>
            <button
              onClick={() => setFilterRating(4)}
              className={`px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 ${
                filterRating === 4 
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4 Stars
            </button>
          </div>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredFeedbacks.slice(0, 6).map((item) => (
            <div 
              key={item.userId}
              className="motta-card p-5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.organization}</div>
                  </div>

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
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{item.feedbackSummary}"
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{item.userId}</span>
                <a
                  href={`https://preprod.midnight.network/tx/${item.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Tx: {item.txHash.slice(0, 6)}...</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DOCUMENTATION
      ────────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <DocsSection />
      </section>
    </div>
  );
};
