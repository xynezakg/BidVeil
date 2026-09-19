import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
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
  Sparkles,
  Zap,
  Users,
  CheckCircle2,
  TrendingUp,
  FileText,
  Clock,
  DollarSign,
  Shield,
  Smartphone,
  EyeOff
} from 'lucide-react';
import { DocsSection } from './DocsSection';
import feedbackData from '../data/communityFeedback.json';
import { BIDVEIL_CONTRACT_CONFIG, formatAddress } from '../utils/contract';

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

  // Dual Interface Showcase Tab
  const [activeShowcase, setActiveShowcase] = useState<'buyer' | 'supplier'>('buyer');

  // Review search & rating filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const handleSimulate = () => {
    setIsProving(true);
    setProofDone(false);
    setTimeout(() => {
      setIsProving(false);
      setProofDone(true);
    }, 1200);
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
    <div className="w-full flex flex-col items-center">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Directly Matching SariPay Reference Layout)
      ────────────────────────────────────────────────────────────── */}
      <section id="overview" className="w-full max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Left Column: Heading & Value Prop */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          {/* Status Badge with Live Pulse Dot */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200/80 text-xs font-semibold text-indigo-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Bidveil ZK Procurement Network • {network}</span>
          </div>

          {/* Large Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.15] mb-6">
            Confidential Bids.<br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">
              Proven On-Chain.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed mb-8 max-w-xl">
            Bidveil protects enterprise procurement from bid sniping, front-running, and supplier price leakage. Execute browser-local zero-knowledge proofs via Lace without ever exposing confidential valuations to competitors.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onLaunchTerminal}
              className="bv-btn-primary px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2.5 rounded-xl hover:-translate-y-0.5 transition-all"
            >
              <span>Launch Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#architecture"
              className="bv-btn-secondary px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2.5 rounded-xl hover:-translate-y-0.5 transition-all"
            >
              <span>Explore Architecture</span>
            </a>
          </div>

          {/* Bottom Divider & Two Stats (Exact SariPay Hero Bottom) */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-[#E5E7EB] w-full">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#111827]">100%</p>
              <p className="text-xs text-[#6B7280] font-normal mt-1">Zero Sniping &bull; Shielded Witness</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#111827]">52+</p>
              <p className="text-xs text-[#6B7280] font-normal mt-1">Verified Preprod Testers</p>
            </div>
          </div>
        </div>

        {/* Right Column: SariPay-Style Interactive Application Mockup Window */}
        <div className="lg:col-span-6 relative flex justify-center items-center w-full z-10">
          {/* Main Browser Mockup Window */}
          <div className="w-full max-w-[540px] bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden relative transition-all duration-500 hover:shadow-indigo-500/10">
            {/* Window Title Bar */}
            <div className="bg-[#FAFAF9] border-b border-[#E5E7EB] px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block"></span>
              </div>
              <div className="text-[10px] text-[#6B7280] font-mono bg-white px-5 py-0.5 rounded-md border border-[#E5E7EB] select-none">
                terminal.bidveil.network/preprod
              </div>
              <div className="w-10"></div>
            </div>

            {/* Window Content */}
            <div className="p-6 bg-[#FAFAF9]/40 flex flex-col gap-4 text-left">
              {/* Internal Mini Stat Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Active Tender Reserve</span>
                  <span className="text-lg font-bold text-[#111827] mt-1 block font-mono">$100,000.00</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs relative overflow-hidden">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Confidential Witness</span>
                  <span className="text-lg font-bold text-indigo-600 mt-1 block font-mono">ZK Shielded</span>
                  <span className="absolute top-3 right-3 text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-semibold border border-indigo-200">
                    RAM-Only
                  </span>
                </div>
              </div>

              {/* Active Procurement Tender Card */}
              <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#111827]">Live Procurement Tender</span>
                  <span className="text-[10px] text-indigo-600 font-mono bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">TND-2026-081</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-[#FAFAF9] border border-[#E5E7EB] text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#111827]">Global Cloud Edge Servers</p>
                      <p className="text-[10px] text-[#6B7280]">Apex Cloud Systems &bull; Enterprise IT</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-indigo-600">Proof Synthesized</p>
                    <span className="inline-flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full font-semibold">
                      Constraint Valid
                    </span>
                  </div>
                </div>
              </div>

              {/* Network Status Strip */}
              <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600 animate-pulse" />
                  <span className="text-[#6B7280] font-normal">Midnight Preprod Consensus:</span>
                </div>
                <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 font-bold">
                  LEDGER SYNCED
                </span>
              </div>
            </div>
          </div>

          {/* Floating Badge 1: Testers (Top-Left) */}
          <div className="absolute top-[18%] left-[-20px] bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#E5E7EB] flex items-center gap-2.5 hidden xl:flex z-20">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">52+ Testers</p>
              <p className="text-[9px] text-[#6B7280] font-normal">Verified Preprod activity</p>
            </div>
          </div>

          {/* Floating Badge 2: Anti-Sniping (Bottom-Left) */}
          <div className="absolute bottom-[18%] left-[-40px] bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#E5E7EB] flex items-center gap-2.5 hidden xl:flex z-20">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">Zero Sniping</p>
              <p className="text-[9px] text-[#6B7280] font-normal">No mempool valuation leak</p>
            </div>
          </div>

          {/* Floating Badge 3: Fast Prover (Top-Right) */}
          <div className="absolute top-[-25px] right-[-10px] bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#E5E7EB] flex items-center gap-2.5 hidden xl:flex z-20">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111827]">&lt; 1.6s Prover</p>
              <p className="text-[9px] text-[#6B7280] font-normal">Browser zk-SNARK synthesis</p>
            </div>
          </div>

          {/* Mini Floating Authenticator Mockup (Directly from SariPay Reference!) */}
          <div className="absolute bottom-[-20px] right-[-15px] w-[190px] bg-white rounded-3xl border-4 border-[#111827] shadow-2xl overflow-hidden hidden sm:block animate-float">
            <div className="bg-[#111827] h-4 w-24 mx-auto rounded-b-xl flex justify-center items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
            </div>
            <div className="p-3 bg-white text-left flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-1.5">
                <span className="text-[8px] font-bold text-[#6B7280] font-mono">Bidveil ZK Client</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className="flex flex-col items-center bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E5E7EB] text-center">
                <p className="text-[9px] font-bold text-[#111827]">Proof Signature</p>
                <div className="w-16 h-16 my-1.5 bg-white border border-[#E5E7EB] p-1 rounded-lg flex items-center justify-center">
                  <Lock className="w-8 h-8 text-indigo-600" />
                </div>
                <span className="text-[8px] text-[#6B7280] font-mono font-bold">SHA-256 WITNESS</span>
              </div>
              <div className="bg-indigo-50 rounded-lg p-1.5 border border-indigo-100 text-center">
                <p className="text-[9px] font-bold text-indigo-700">Contract #7ff3...8ec2</p>
                <p className="text-[7px] text-[#6B7280]">Midnight Preprod Live</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. LIVE ON-CHAIN ACTIVITY FEED (Signature SariPay Feed)
      ────────────────────────────────────────────────────────────── */}
      <section id="live-feed" className="w-full bg-white border-y border-[#E5E7EB] py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200 text-xs font-bold text-emerald-700 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                LIVE ON-CHAIN ACTIVITY FEED
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Real-Time Sealed-Bid Activity on Midnight
              </h2>
              <p className="text-sm text-[#6B7280] mt-1 max-w-xl">
                Verifiable record of client zk-SNARK bid proofs, qualifying reserve evaluations, and settlement hashes executed across 52 preprod users.
              </p>
            </div>

            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#E5E7EB] shadow-xs text-xs font-semibold text-[#6B7280] self-start md:self-auto">
              <div className="flex items-center gap-1.5 text-indigo-600">
                <Zap className="w-4 h-4 fill-indigo-600" />
                <span>Avg Prover: <strong className="text-[#111827] font-extrabold">1.58s</strong></span>
              </div>
              <span className="text-slate-200">|</span>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Leakage: <strong className="text-[#111827] font-extrabold">0%</strong></span>
              </div>
            </div>
          </div>

          {/* 6 Real-Time Verified Proof Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'ORD-8942',
                tender: 'TND-2026-081',
                time: '1.4s',
                tester: 'Maria Santos',
                org: 'Apex Cloud Systems Wholesale',
                spec: '📦 12x Distributed Bare-Metal Kubernetes Nodes',
                reserve: '$100,000 USD',
                tx: 'ea77f760743eae6a4034e51c20b27a115559fa49274ec159a54bc890fc287839'
              },
              {
                id: 'ORD-8941',
                tender: 'TND-2026-081',
                time: '1.6s',
                tester: 'Elena Reyes',
                org: 'FinGuard Cybersecurity Group',
                spec: '📦 SOC-2 Continuous Penetration Audit 2026',
                reserve: '$85,000 USD',
                tx: '35033c38487d0adace36ebcecddfc424873212e6df6e128f27aa740f383cf308'
              },
              {
                id: 'ORD-8940',
                tender: 'TND-2026-094',
                time: '1.5s',
                tester: 'Brad Manalese',
                org: 'Metropolitan CleanTech Board',
                spec: '📦 8x Grid-Tied Bidirectional Battery Inverters',
                reserve: '$420,000 USD',
                tx: '4a4e1e0c99670c5a8066cab3ac4b9be166a1e63eedd446cd5a63b5c30d610dca'
              },
              {
                id: 'ORD-8939',
                tender: 'TND-2026-081',
                time: '1.7s',
                tester: 'Nikko Velasco',
                org: 'San Miguel Wholesalers B2B',
                spec: '📦 Bare-Metal Compute Nodes EU Data Center',
                reserve: '$100,000 USD',
                tx: '6a6a3af1b560dcb01001eb59aa6d58e04d5b100bbc0cbadc41b78d464e1dd6c2'
              },
              {
                id: 'ORD-8938',
                tender: 'TND-2026-102',
                time: '1.5s',
                tester: 'josh_dev22',
                org: 'FEU Enterprise Tech Lab',
                spec: '📦 Smart Contract Static & Fuzzing Pipeline',
                reserve: '$85,000 USD',
                tx: '22ec0dab1f74d2c61b19e4e65f43c17f497c83f647a022397fc389918d270a58'
              },
              {
                id: 'ORD-8937',
                tender: 'TND-2026-094',
                time: '1.4s',
                tester: 'claire.tan',
                org: 'DLSU CleanTech Alliance',
                spec: '📦 SCADA Microgrid Telemetry Inverters',
                reserve: '$420,000 USD',
                tx: '7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2'
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#6B7280] bg-stone-100 px-2 py-0.5 rounded-md">
                      {item.id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Settled ({item.time})
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="text-sm font-extrabold text-[#111827] line-clamp-1">{item.tester}</div>
                    <div className="text-xs text-[#6B7280] line-clamp-1">Organization: <span className="font-medium text-slate-700">{item.org}</span></div>
                  </div>

                  <div className="text-xs text-[#6B7280] bg-[#FAFAF9] p-2.5 rounded-xl border border-slate-100 mb-4 line-clamp-1">
                    {item.spec}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-[#111827] text-base font-mono">{item.reserve}</span>
                    <span className="text-[11px] font-semibold text-indigo-600 ml-1.5">(Shielded)</span>
                  </div>
                  <a
                    href={BIDVEIL_CONTRACT_CONFIG.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#6B7280] hover:text-indigo-600 font-semibold transition-colors group-hover:text-indigo-600"
                    title="View on Midnight Indexer Explorer"
                  >
                    <span>Proof</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. 5-COLUMN IMPACT METRICS STRIP (SariPay Structure)
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAFAF9] border-b border-[#E5E7EB] py-16 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827]">52+</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Processed Tenders</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827]">100%</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Private Witness</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827]">&lt; 1.6s</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Proof Generation</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111827]">5</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Compact Circuits</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600">Near-Zero</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">Front-Running</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CORE CAPABILITIES (SariPay Feature Grid)
      ────────────────────────────────────────────────────────────── */}
      <section id="architecture" className="w-full bg-white py-20 border-b border-[#E5E7EB] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block mb-3">
              Core Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
              Features Built for Procurement Trust
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] font-medium mt-3 max-w-2xl mx-auto">
              Bidveil removes unfair information advantages on both sides of enterprise purchasing with specialized zero-knowledge circuits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#FAFAF9]/60 border border-[#E5E7EB] p-8 rounded-2xl shadow-xs hover:bg-white hover:shadow-md transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Smart Sealed Escrow</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
                Vendor valuations remain strictly confidential in local browser RAM. No competitor or mempool observer can access pricing proposals prior to settlement.
              </p>
            </div>

            <div className="bg-[#FAFAF9]/60 border border-[#E5E7EB] p-8 rounded-2xl shadow-xs hover:bg-white hover:shadow-md transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Client-Side ZK Verification</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
                Local zk-SNARK prover verifies mathematical constraints (secretBid &gt;= reservePrice) inside your browser memory without disclosing input values.
              </p>
            </div>

            <div className="bg-[#FAFAF9]/60 border border-[#E5E7EB] p-8 rounded-2xl shadow-xs hover:bg-white hover:shadow-md transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Anti-Front-Running Protection</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
                Zero-knowledge arithmetic guarantees rivals cannot undercut bids by fractional margins, ensuring completely fair competitive proposals.
              </p>
            </div>

            <div className="bg-[#FAFAF9]/60 border border-[#E5E7EB] p-8 rounded-2xl shadow-xs hover:bg-white hover:shadow-md transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Dual-State Settlement</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
                Compact smart contracts combine confidential private state transitions with transparent on-chain settlement records for audit-ready compliance.
              </p>
            </div>

            <div className="bg-[#FAFAF9]/60 border border-[#E5E7EB] p-8 rounded-2xl shadow-xs hover:bg-white hover:shadow-md transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Lace Midnight Integration</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
                Direct integration with the Lace Midnight browser extension, supporting live Preprod signing and instant fallback testing sandbox sessions.
              </p>
            </div>

            <div className="bg-[#FAFAF9]/60 border border-[#E5E7EB] p-8 rounded-2xl shadow-xs hover:bg-white hover:shadow-md transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-2">Enterprise Auditability</h4>
              <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
                Immutable cryptographic proof hashes written to the Midnight blockchain provide total tamper-proof verification for auditors and enterprise CFOs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. HOW IT WORKS: 4-STEP PROCESS (SariPay Numbers 01-04)
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 text-center relative">
        <div className="mb-16">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block mb-3">
            Frictionless Procurement Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
            How Bidveil Works
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-medium mt-3 max-w-2xl mx-auto">
            A privacy-preserving cycle designed to protect both enterprise buyers and competing vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs flex flex-col items-center text-center relative group hover:border-indigo-300 transition-all duration-300">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB] group-hover:text-indigo-200 transition-colors">
              01
            </span>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Buyer Initializes Tender</h3>
            <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
              Procurement department sets reserve price and defines requirements on the Compact contract.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs flex flex-col items-center text-center relative group hover:border-indigo-300 transition-all duration-300">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB] group-hover:text-indigo-200 transition-colors">
              02
            </span>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Vendor Inputs Secret Witness</h3>
            <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
              Supplier inputs confidential valuation directly in browser. Data never leaves local device RAM.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs flex flex-col items-center text-center relative group hover:border-indigo-300 transition-all duration-300">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB] group-hover:text-indigo-200 transition-colors">
              03
            </span>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Synthesizes zk-SNARK</h3>
            <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
              Lace prover creates a zero-knowledge validity proof verifying the bid qualifies under reserve.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs flex flex-col items-center text-center relative group hover:border-indigo-300 transition-all duration-300">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#E5E7EB] group-hover:text-indigo-200 transition-colors">
              04
            </span>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Autonomous Settlement</h3>
            <p className="text-xs text-[#6B7280] font-normal leading-relaxed">
              Midnight validators verify proof without disclosure and award procurement according to contract rules.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DUAL INTERFACE DASHBOARD SHOWCASE (SariPay Dual Tabs)
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 text-center relative">
        <div className="mb-12">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block mb-3">
            Live Application Dashboard Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
            A Dual Interface for Seamless Operations
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-medium mt-3 max-w-2xl mx-auto">
            Experience how Bidveil caters to both enterprise buyers and vendor suppliers.
          </p>

          <div className="flex bg-[#E5E7EB]/50 p-1.5 rounded-xl max-w-sm mx-auto mt-8 border border-[#E5E7EB]">
            <button
              onClick={() => setActiveShowcase('buyer')}
              className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-all ${
                activeShowcase === 'buyer' 
                  ? 'bg-white text-[#111827] shadow-sm' 
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Enterprise Buyer View
            </button>
            <button
              onClick={() => setActiveShowcase('supplier')}
              className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-all ${
                activeShowcase === 'supplier' 
                  ? 'bg-white text-[#111827] shadow-sm' 
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Vendor Supplier View
            </button>
          </div>
        </div>

        {/* Dashboard Showcase Window */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-lg overflow-hidden text-left max-w-5xl mx-auto">
          <div className="bg-[#FAFAF9] border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block"></span>
              </div>
              <span className="text-xs text-[#6B7280] font-semibold font-mono border-l border-[#E5E7EB] pl-4">
                Bidveil Platform v1.4 &bull; {activeShowcase === 'buyer' ? 'Buyer Procurement Console' : 'Supplier ZK Terminal'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                Preprod Session Active
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#FAFAF9]/30 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-1">
                  {activeShowcase === 'buyer' ? 'Apex Cloud Systems' : 'FinGuard Security Ltd.'}
                </h3>
                <p className="text-xs text-[#6B7280]">
                  {activeShowcase === 'buyer' ? 'Account: Enterprise Buyer Hub' : 'Account: Verified Vendor Supplier'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  {activeShowcase === 'buyer' ? 'Total Procurement Budget' : 'Eligible Contract Pipeline'}
                </span>
                <span className="text-2xl font-extrabold text-[#111827]">
                  {activeShowcase === 'buyer' ? '$605,000.00 USD' : '$142,500.00 USD'}
                </span>
                <p className="text-[10px] text-[#6B7280] mt-2 font-normal">
                  Connected Wallet: Lace Midnight Preprod
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  {activeShowcase === 'buyer' ? 'Active Sealed Tenders' : 'Submitted Confidential Proofs'}
                </span>
                <span className="text-2xl font-extrabold text-indigo-600">
                  {activeShowcase === 'buyer' ? '3 Tenders Open' : '100% Shielded'}
                </span>
                <span className="text-[9px] text-[#6B7280] mt-2 font-normal">
                  Zero public valuation leakage on-chain
                </span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 sm:col-span-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full uppercase border border-indigo-200">
                      ZK Verified Proof
                    </span>
                    <span className="text-xs text-[#6B7280] font-normal">TND-2026-081</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111827]">
                    Global Cloud Infrastructure &bull; Bare-Metal Nodes
                  </h4>
                  <p className="text-xs text-[#6B7280] font-normal mt-1 leading-relaxed">
                    Proof synthesized via local Lace prover. Reserve constraint evaluated with zero exposure of actual bid values in the mempool.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="text-[#6B7280] font-normal">Contract Reserve:</span>
                    <span className="font-bold text-[#111827] font-mono">$100,000.00 USD</span>
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 flex flex-col items-center bg-[#FAFAF9] p-4 rounded-xl border border-[#E5E7EB]">
                  <div className="w-20 h-20 bg-white border border-[#E5E7EB] p-2 rounded-lg flex items-center justify-center">
                    <Lock className="w-10 h-10 text-indigo-600" />
                  </div>
                  <span className="text-[9px] text-indigo-700 font-bold mt-2 font-mono">
                    VALIDITY PROOF
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
                <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4">
                  Active Procurement Queue
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] text-xs">
                    <div>
                      <p className="font-bold text-[#111827]">TND-2026-094 &bull; Clean Energy Microgrid Inverters</p>
                      <p className="text-[9px] text-[#6B7280]">Midnight ledger tx: ea77f7...287839</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full font-bold font-mono">
                      $420,000 Reserve
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] text-xs">
                    <div>
                      <p className="font-bold text-[#111827]">TND-2026-102 &bull; Cybersecurity SOC Audit 2026</p>
                      <p className="text-[9px] text-[#6B7280]">Midnight ledger tx: 35033c...3cf308</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold font-mono">
                      Open For Bids
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. INTERACTIVE ZERO-KNOWLEDGE PROOF SIMULATOR
      ────────────────────────────────────────────────────────────── */}
      <section id="simulator" className="w-full bg-white border-y border-[#E5E7EB] py-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block mb-3">
            Interactive Testbed
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-4">
            Try the Zero-Knowledge Proof Simulator
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-medium mb-12 max-w-xl mx-auto">
            Test how client-side zk-SNARKs prove bid eligibility locally without transmitting valuations across the network.
          </p>

          <div className="bg-[#FAFAF9] rounded-2xl border border-[#E5E7EB] shadow-xs p-8 text-left flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-indigo-600 to-purple-600"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-semibold text-[#111827]">Vendor Confidential Bid Simulator</h4>
                <p className="text-xs text-[#6B7280] mt-0.5 font-normal">
                  Simulates local browser constraint execution before on-chain submission
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase font-semibold text-[#6B7280] block">Tender Reserve</span>
                <span className="text-2xl font-black text-[#111827] font-mono">
                  ${simulatedReserve.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Slider Control */}
            <div className="space-y-3 bg-white p-5 rounded-xl border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#111827] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                  Adjust Vendor Confidential Bid (USD):
                </span>
                <span className="font-mono text-sm font-bold text-indigo-600">
                  ${simulatedBid.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="50000"
                max="250000"
                step="5000"
                value={simulatedBid}
                onChange={(e) => setSimulatedBid(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-[#6B7280] font-mono">
                <span>$50,000 (Fails Reserve)</span>
                <span>$100,000 (Reserve Benchmark)</span>
                <span>$250,000 (Qualifying)</span>
              </div>
            </div>

            {/* Simulation Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Private Witness Frame */}
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#111827] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" />
                    Private State (Browser RAM)
                  </span>
                  <span className="text-[10px] text-indigo-600 font-mono">Never Emitted</span>
                </div>
                <div className="font-mono text-xs text-[#111827] bg-[#FAFAF9] p-3 rounded-lg border border-slate-100">
                  <div>witness.bid = ${simulatedBid.toLocaleString()}</div>
                  <div className="text-[10px] text-[#6B7280] mt-1">hash: 0x9f4a...e12b</div>
                </div>
              </div>

              {/* Public Broadcast Frame */}
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#111827] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Public Broadcast (Mempool)
                  </span>
                  <span className="text-[10px] text-emerald-600 font-mono">Verifiable Proof</span>
                </div>
                <div className="font-mono text-xs text-[#111827] bg-[#FAFAF9] p-3 rounded-lg border border-slate-100">
                  <div>constraint: {simulatedBid >= simulatedReserve ? 'SATISFIED (true)' : 'VIOLATION (false)'}</div>
                  <div className="text-[10px] text-[#6B7280] mt-1">valuation leakage: 0.00%</div>
                </div>
              </div>
            </div>

            {/* Simulation Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                {simulatedBid >= simulatedReserve ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Valid Bid: Generates valid Compact zk-SNARK proof
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
                    Constraint Failed: Bid is below $100,000 reserve
                  </span>
                )}
              </div>

              <button
                onClick={handleSimulate}
                disabled={isProving}
                className="bv-btn-primary px-6 py-2.5 text-xs font-semibold w-full sm:w-auto"
              >
                {isProving ? (
                  <>
                    <Cpu className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Proof (1.4s)...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Execute Simulated Prover</span>
                  </>
                )}
              </button>
            </div>

            {proofDone && (
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between">
                <span>Proof generated in 1.34s! Validity hash verified against Preprod contract rules.</span>
                <span className="font-mono text-[10px] bg-white text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">PROOF_OK</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. TESTER & DEVELOPER REVIEWS (SariPay Testimonial Grid)
      ────────────────────────────────────────────────────────────── */}
      <section id="reviews" className="w-full bg-[#FAFAF9] border-b border-[#E5E7EB] py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block mb-3">
              Merchant &amp; Supplier Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
              Loved by Testers and Developers Aligned
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] font-medium mt-3 max-w-2xl mx-auto">
              Inspect authentic written feedback collected from 52 verified Midnight Preprod procurement testers.
            </p>

            {/* Public Evidence Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-stone-50 transition-all shadow-xs"
              >
                <span>View 52 User Evidence Sheet</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6B7280]" />
              </a>

              <a
                href="https://forms.gle/JS3LoCsJGQGh144n9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-all"
              >
                <span>Submit Questionnaire</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {validFeedbacks.slice(0, 6).map((item, index) => (
              <div 
                key={index}
                className="bg-white border border-[#E5E7EB] p-8 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Amber Stars */}
                  <div className="flex gap-1 text-amber-400 mb-5">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#111827] italic leading-relaxed mb-6 font-normal">
                    &ldquo;{item.feedbackSummary}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-[#E5E7EB]">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-xs text-indigo-700">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#111827]">{item.name}</h4>
                    <p className="text-[10px] text-[#6B7280] font-normal">
                      {item.organization || 'Preprod Verified Tester'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. DOCUMENTATION & CONTRACT VERIFICATION
      ────────────────────────────────────────────────────────────── */}
      <section id="docs" className="w-full max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <DocsSection />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. CALL-TO-ACTION BANNER (SariPay Dark CTA Banner)
      ────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-[#111827] text-white rounded-3xl p-10 md:p-16 relative overflow-hidden flex flex-col items-center text-center shadow-xl">
          <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[120px] pointer-events-none"></div>

          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest block mb-4 relative z-10 font-mono">
            Get Onboarded on Preprod
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mb-6 relative z-10 leading-[1.2]">
            Confidential Procurement. Proven On-Chain.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mb-10 relative z-10 leading-relaxed">
            Eliminate vendor valuation leakage and front-running across your supply chain with verifiable zero-knowledge sealed bids on Midnight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <button
              onClick={onLaunchTerminal}
              className="bv-btn-primary px-8 py-3.5 text-sm font-semibold rounded-xl"
            >
              <span>Launch Terminal</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>

            <a
              href="#docs"
              className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-white border border-gray-700 text-sm font-semibold rounded-xl transition-all"
            >
              <span>Read Documentation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
