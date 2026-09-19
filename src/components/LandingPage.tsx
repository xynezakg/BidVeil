import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Database,
  Building2,
  Users,
  EyeOff,
  Zap,
  Activity,
  Star,
  ExternalLink,
  Sliders,
  Check,
  ChevronRight,
  Shield,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { DocsSection } from './DocsSection';
import { AnimatedCounter, RevealOnScroll } from './AnimatedCounter';
import feedbackData from '../data/communityFeedback.json';
import { formatAddress, BIDVEIL_CONTRACT_CONFIG } from '../utils/contract';

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
  // Interactive Hero Preview State
  const [simulatedBid, setSimulatedBid] = useState(145000);
  const [simulatedReserve] = useState(100000);
  const [isSimulatingProof, setIsSimulatingProof] = useState(false);
  const [proofCompleted, setProofCompleted] = useState(false);

  // Feedback search & filter
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const handleSimulateProof = () => {
    setIsSimulatingProof(true);
    setProofCompleted(false);
    setTimeout(() => {
      setIsSimulatingProof(false);
      setProofCompleted(true);
    }, 1500);
  };

  const filteredFeedbacks = feedbackData.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
      item.feedbackSummary.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
      item.organization.toLowerCase().includes(feedbackSearch.toLowerCase());
    const matchesRating = selectedRating === 'all' || item.rating === selectedRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-24 sm:space-y-32 py-4 overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Inspired by Reference Design)
      ────────────────────────────────────────────────────────────── */}
      <section id="overview" className="relative text-center space-y-8 pt-4 pb-8 max-w-5xl mx-auto scroll-mt-28">
        {/* Social Proof Pill (Avatar Stack + Community Count) */}
        <RevealOnScroll className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md">
            {/* Overlapping Avatar Stack */}
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">XZ</div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">CQ</div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400 to-rose-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">KN</div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-orange-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">BM</div>
            </div>
            <span className="text-xs font-medium text-slate-300">
              Trusted already by <span className="text-white font-semibold">52+ Preprod Builders</span> on Midnight
            </span>
          </div>
        </RevealOnScroll>

        {/* Main Headline */}
        <RevealOnScroll delay={100} className="space-y-5">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Confidential Sealed-Bid <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Procurement on Midnight
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate bid sniping, front-running, and supplier price leakage. Execute browser-local zero-knowledge proofs via Lace without ever exposing confidential valuations to validators or competitors.
          </p>
        </RevealOnScroll>

        {/* Action Buttons (Pill CTAs with Arrow Indicators) */}
        <RevealOnScroll delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onLaunchTerminal}
            className="w-full sm:w-auto btn-pill-primary text-sm px-8 py-3.5"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          
          <a
            href="#architecture"
            className="w-full sm:w-auto btn-pill-secondary text-sm px-7 py-3.5"
          >
            Explore Architecture
          </a>
        </RevealOnScroll>

        {/* ─────────────────────────────────────────────────────────────
            Integrated Hairline Grid Metrics Bar (From Reference UI)
        ────────────────────────────────────────────────────────────── */}
        <RevealOnScroll delay={300} className="pt-8">
          <div className="hairline-grid-container grid-cols-2 md:grid-cols-4 text-left">
            {/* Metric 1 */}
            <div className="hairline-grid-cell">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                <AnimatedCounter end={52} suffix="+" duration={1800} />
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Preprod Testers Onboarded
              </div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                Proof of On-Chain Activity
              </div>
            </div>

            {/* Metric 2 */}
            <div className="hairline-grid-cell">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tracking-tight">
                <AnimatedCounter end={100} suffix="%" duration={1600} />
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Private Witness Isolation
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                Browser-Local Lace Prover
              </div>
            </div>

            {/* Metric 3 */}
            <div className="hairline-grid-cell">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-400 font-mono tracking-tight">
                0
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Mempool Valuation Leakage
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                Zero Front-Running
              </div>
            </div>

            {/* Metric 4 */}
            <div className="hairline-grid-cell border-r-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tracking-tight">
                &lt; 1.6s
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                ZK Proof Generation
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                Compact v0.34 Runtime
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. INTERACTIVE ZERO-KNOWLEDGE PROVER TERMINAL (Hero Preview)
      ────────────────────────────────────────────────────────────── */}
      <RevealOnScroll className="max-w-4xl mx-auto">
        <div className="obsidian-card p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden">
          {/* Subtle Top Border Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Interactive ZK Circuit Simulator
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                    Live Demo
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Simulate client-side zero-knowledge proof generation without broadcasting valuation data.
                </p>
              </div>
            </div>

            <button
              onClick={onLaunchTerminal}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Open Full Terminal <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Confidential Valuation:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {simulatedBid.toLocaleString()} tNIGHT
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="500000"
                  step="5000"
                  value={simulatedBid}
                  onChange={(e) => setSimulatedBid(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>Reserve: {simulatedReserve.toLocaleString()} tNIGHT</span>
                  <span>Max: 500,000 tNIGHT</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#050914] border border-white/[0.06] space-y-1.5 font-mono text-xs">
                <div className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Private Witness Circuit Inputs</div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">secretBidAmount:</span>
                  <span className="text-cyan-300">{simulatedBid}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">reserveRequirement:</span>
                  <span className="text-slate-400">&gt;= {simulatedReserve} (Satisfied)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">cryptographicSalt:</span>
                  <span className="text-slate-500 truncate max-w-[160px]">0x7c9a4b8...fe1</span>
                </div>
              </div>

              <button
                onClick={handleSimulateProof}
                disabled={isSimulatingProof}
                className="w-full btn-pill-primary py-2.5 text-xs"
              >
                {isSimulatingProof ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Kachina ZK Prover...</span>
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
            <div className="p-4 rounded-xl bg-[#040713] border border-white/[0.06] font-mono text-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400 text-[11px]">Ledger Broadcast Telemetry</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Verifier Ready
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500">&gt; On-chain Payload: </span>
                    <span className="text-emerald-400">zk_proof_witness_v1</span>
                  </div>
                  <div>
                    <span className="text-slate-500">&gt; Revealed Value: </span>
                    <span className="text-purple-400">None (Cryptographically Sealed)</span>
                  </div>
                  <div>
                    <span className="text-slate-500">&gt; Constraint Check: </span>
                    <span className="text-cyan-400">bid &gt;= reservePrice &#10003;</span>
                  </div>
                  <div>
                    <span className="text-slate-500">&gt; Verifier Gas: </span>
                    <span className="text-slate-400">0.0024 tNIGHT</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-white/[0.06]">
                {proofCompleted ? (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Proof valid. Sealed commitment ready for Midnight Preprod broadcast.</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 italic">
                    Slide valuation and click "Generate ZK Proof" to test client-side privacy.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* ─────────────────────────────────────────────────────────────
          3. ARCHITECTURE SECTION (Matching Reference Two-Column Grid)
      ────────────────────────────────────────────────────────────── */}
      <section id="architecture" className="space-y-12 max-w-6xl mx-auto scroll-mt-24">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-preprod text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture &amp; Security Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Dual-State Privacy on Midnight
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Midnight decouples private computation from consensus verification. Sensitive commercial terms never leave your local environment.
          </p>
        </div>

        {/* 2-Column Feature Grid Inspired by Reference UI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Browser-Local Execution */}
          <RevealOnScroll className="obsidian-card p-8 border border-white/[0.08] relative group hover:border-cyan-500/30">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Client-Side Witness Execution
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                When a supplier submits a sealed bid, the Compact contract circuit evaluates the private witness locally within the browser. The valuation and secret salt are passed through a zero-knowledge prover inside the Lace wallet extension.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <span>Zero Mempool Visibility</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </RevealOnScroll>

          {/* Card 2: On-Chain Compact Settlement */}
          <RevealOnScroll delay={150} className="obsidian-card p-8 border border-white/[0.08] relative group hover:border-indigo-500/30">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Compact On-Chain Consensus
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Midnight validators receive only the mathematical ZK proof and the public commitment hash. Validators verify mathematical correctness and enforce procurement rules without accessing unencrypted bid figures.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <span>Kachina Ledger Verification</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. HOW IT WORKS (Three Step Flow)
      ────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="space-y-12 max-w-6xl mx-auto scroll-mt-24">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-indigo text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How Sealed-Bidding Works
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            A three-step cryptographic lifecycle guaranteeing fairness from tender publication to winner verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <RevealOnScroll className="obsidian-card p-6 border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Step 01</div>
            <h3 className="text-base font-bold text-white">Tender Creation &amp; Rules</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Procurement officers configure tender terms, reserve criteria, and deadline parameters directly in the Compact smart contract on Midnight Preprod.
            </p>
          </RevealOnScroll>

          {/* Step 2 */}
          <RevealOnScroll delay={100} className="obsidian-card p-6 border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">Step 02</div>
            <h3 className="text-base font-bold text-white">Zero-Knowledge Sealed Bids</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Suppliers enter confidential valuations. Browser-local ZK circuits prove criteria satisfaction while keeping bid amounts completely private.
            </p>
          </RevealOnScroll>

          {/* Step 3 */}
          <RevealOnScroll delay={200} className="obsidian-card p-6 border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Step 03</div>
            <h3 className="text-base font-bold text-white">Verifiable Settlement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Once closed, the winning commitment is settled on-chain with full auditability, preventing retroactive bid tampering or favoritism.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. COMMUNITY FEEDBACK & PREPROD TESTERS (52 Verified Reviews)
      ────────────────────────────────────────────────────────────── */}
      <section id="feedbacks" className="space-y-8 max-w-6xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-preprod text-xs font-semibold mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Community Reviews &amp; Social Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Real Preprod User Feedback
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Feedback collected from 52 verified Midnight Preprod testers with real transaction hashes linked to the Midnight Indexer.
            </p>
          </div>

          {/* External Survey & Sheet Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-pill-secondary text-xs px-4 py-2"
            >
              <span>Public Sheet</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://forms.gle/JS3LoCsJGQGh144n9"
              target="_blank"
              rel="noreferrer"
              className="btn-pill-primary text-xs px-4 py-2"
            >
              <span>Submit Survey</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search & Rating Filter Bar */}
        <div className="obsidian-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search testers, feedback, or universities..."
              value={feedbackSearch}
              onChange={(e) => setFeedbackSearch(e.target.value)}
              className="w-full bg-[#050914] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto justify-end">
            <span>Filter Rating:</span>
            <button
              onClick={() => setSelectedRating('all')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                selectedRating === 'all' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              All (52)
            </button>
            <button
              onClick={() => setSelectedRating(5)}
              className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                selectedRating === 5 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5 Stars
            </button>
            <button
              onClick={() => setSelectedRating(4)}
              className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                selectedRating === 4 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4 Stars
            </button>
          </div>
        </div>

        {/* Feedback Cards Grid (Paginated / Limited for smooth scroll) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredFeedbacks.slice(0, 9).map((item) => (
            <div 
              key={item.userId}
              className="obsidian-card p-5 border border-white/[0.08] flex flex-col justify-between space-y-3 hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.organization}</div>
                    </div>
                  </div>

                  {/* Rating Stars */}
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

              {/* On-Chain Verification Proof Link */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">{item.userId}</span>
                <a
                  href={`https://preprod.midnight.network/tx/${item.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  title={item.txHash}
                >
                  <span>Tx: {item.txHash.slice(0, 6)}...{item.txHash.slice(-4)}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredFeedbacks.length > 9 && (
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Showing 9 of {filteredFeedbacks.length} verified responses. Full dataset available in the{' '}
              <a 
                href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Public Google Sheet
              </a>.
            </p>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DOCUMENTATION & DEVELOPER RESOURCES
      ────────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto">
        <DocsSection />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. BOTTOM CTA CALLOUT (Like Reference "Get In Touch Today")
      ────────────────────────────────────────────────────────────── */}
      <RevealOnScroll className="max-w-4xl mx-auto text-center">
        <div className="obsidian-card p-10 sm:p-14 border border-cyan-500/20 relative overflow-hidden">
          {/* Subtle Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-preprod text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production-Ready on Preprod</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Experience the Future of <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Confidential Procurement
              </span>
            </h2>

            <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Connect your Lace wallet on Midnight Preprod, explore active enterprise tenders, and submit cryptographic sealed bids with zero information leakage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onLaunchTerminal}
                className="btn-pill-primary px-8 py-3.5 text-sm"
              >
                <span>Launch Bidding Terminal</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="https://forms.gle/JS3LoCsJGQGh144n9"
                target="_blank"
                rel="noreferrer"
                className="btn-pill-secondary px-7 py-3.5 text-sm"
              >
                <span>Submit Feedback</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};
