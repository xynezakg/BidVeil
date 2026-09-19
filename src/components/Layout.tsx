import React, { useState } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Zap
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG, formatAddress } from '../utils/contract';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'landing' | 'terminal';
  onTabChange: (tab: 'landing' | 'terminal') => void;
  isConnected: boolean;
  network: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  isConnected,
  network,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (activeTab !== 'landing') {
      onTabChange('landing');
    }
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleCopyContract = () => {
    if (BIDVEIL_CONTRACT_CONFIG.preprodAddress) {
      navigator.clipboard.writeText(BIDVEIL_CONTRACT_CONFIG.preprodAddress);
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[#FAFAF9] text-[#111827] font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          STICKY NAVBAR (Directly from SariPay Reference Architecture)
      ────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 transition-all duration-300 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick()}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-sky-400 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/15 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/logo.jpg" 
                alt="Bidveil" 
                className="w-full h-full object-cover rounded-[10px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/bidveil-mark.svg';
                }}
              />
            </div>
            <span className="font-sans font-extrabold text-[#111827] tracking-tight text-xl">
              Bid<span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">veil</span>
            </span>
          </div>

          {/* Centered Desktop Navigation Links with Animated Underline */}
          <div className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#6B7280]">
            <button
              onClick={() => handleNavClick('overview')}
              className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('live-feed')}
              className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Activity</span>
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Architecture
            </button>
            <button
              onClick={() => handleNavClick('simulator')}
              className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Simulator
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('docs')}
              className="hover:text-[#111827] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Docs
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Network Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200/80 rounded-full text-xs font-semibold text-indigo-700">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <span>{network}</span>
            </div>

            {/* Contract Copy Quick Button */}
            <button
              onClick={handleCopyContract}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-stone-50 text-xs font-mono text-[#6B7280] hover:text-[#111827] transition-all shadow-sm"
              title="Copy Preprod Contract Address"
            >
              {copiedContract ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{formatAddress(BIDVEIL_CONTRACT_CONFIG.preprodAddress || '', 6, 4)}</span>
                </>
              )}
            </button>

            {/* Primary Gradient Launch Button */}
            <button
              onClick={() => onTabChange(activeTab === 'landing' ? 'terminal' : 'landing')}
              className="bv-btn-primary text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>{activeTab === 'landing' ? 'Launch Terminal' : 'Back to Overview'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onTabChange(activeTab === 'landing' ? 'terminal' : 'landing')}
              className="bv-btn-primary text-xs px-3.5 py-2 rounded-xl"
            >
              <span>{activeTab === 'landing' ? 'Terminal' : 'Overview'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#6B7280] hover:text-[#111827] p-2 rounded-xl border border-[#E5E7EB] bg-white hover:bg-stone-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] bg-white px-6 py-4 space-y-2 shadow-lg">
            <button 
              onClick={() => handleNavClick('overview')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-[#111827] hover:bg-stone-100 font-medium"
            >
              Overview
            </button>
            <button 
              onClick={() => handleNavClick('live-feed')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-[#111827] hover:bg-stone-100 font-medium flex items-center justify-between"
            >
              <span>Live Activity Feed</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">LIVE</span>
            </button>
            <button 
              onClick={() => handleNavClick('architecture')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-[#111827] hover:bg-stone-100 font-medium"
            >
              Architecture &amp; Proofs
            </button>
            <button 
              onClick={() => handleNavClick('simulator')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-[#111827] hover:bg-stone-100 font-medium"
            >
              ZK Proof Simulator
            </button>
            <button 
              onClick={() => handleNavClick('reviews')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-[#111827] hover:bg-stone-100 font-medium"
            >
              Verified Reviews (52 Testers)
            </button>
            <button 
              onClick={() => handleNavClick('docs')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-[#111827] hover:bg-stone-100 font-medium"
            >
              Documentation
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Body */}
      <main className="flex-grow flex flex-col items-center">
        {children}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          MULTI-COLUMN ENTERPRISE FOOTER (SariPay Reference Layout)
      ────────────────────────────────────────────────────────────── */}
      <footer className="bg-[#FAFAF9] border-t border-[#E5E7EB] text-[#6B7280] w-full mt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 mb-12">
            {/* Col 1-2: Brand & Mission */}
            <div className="col-span-2 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-sky-400 via-indigo-600 to-purple-600 flex items-center justify-center">
                  <img src="/logo.jpg" alt="Bidveil" className="w-full h-full object-cover rounded-lg" />
                </div>
                <span className="font-sans font-extrabold text-[#111827] tracking-tight text-xl">
                  Bid<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">veil</span>
                </span>
              </div>
              <p className="text-sm text-[#6B7280] max-w-sm leading-relaxed">
                Bidveil is a zero-knowledge confidential procurement network built on the Midnight Network, allowing enterprise suppliers to submit verifiable sealed bids without leaking valuation data.
              </p>
              
              {/* Social Channels */}
              <div className="flex items-center gap-4 text-[#6B7280]">
                <a 
                  href="https://x.com/bidveilmain" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Twitter / X" 
                  className="hover:text-indigo-600 transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/xynezakg/Midnight-Xyn" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="GitHub" 
                  className="hover:text-indigo-600 transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a 
                  href={BIDVEIL_CONTRACT_CONFIG.explorerUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Midnight Indexer" 
                  className="hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Col 3: Product */}
            <div className="flex flex-col gap-4 col-span-1">
              <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">Product</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><button onClick={() => handleNavClick('overview')} className="hover:text-[#111827] transition-colors text-left">Overview</button></li>
                <li><button onClick={() => handleNavClick('live-feed')} className="hover:text-[#111827] transition-colors text-left">On-Chain Feed</button></li>
                <li><button onClick={() => handleNavClick('simulator')} className="hover:text-[#111827] transition-colors text-left">ZK Simulator</button></li>
                <li><button onClick={() => onTabChange('terminal')} className="hover:text-[#111827] transition-colors text-left font-medium text-indigo-600">Bidding Terminal</button></li>
              </ul>
            </div>

            {/* Col 4: Technology */}
            <div className="flex flex-col gap-4 col-span-1">
              <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">Circuits</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><button onClick={() => handleNavClick('docs')} className="hover:text-[#111827] transition-colors text-left">initializeTender</button></li>
                <li><button onClick={() => handleNavClick('docs')} className="hover:text-[#111827] transition-colors text-left">submitSealedBid</button></li>
                <li><button onClick={() => handleNavClick('docs')} className="hover:text-[#111827] transition-colors text-left">submitDisclosedBid</button></li>
                <li><button onClick={() => handleNavClick('docs')} className="hover:text-[#111827] transition-colors text-left">closeTender</button></li>
              </ul>
            </div>

            {/* Col 5: Community & Proof */}
            <div className="flex flex-col gap-4 col-span-1">
              <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">Validation</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><a href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">52 User Evidence</a></li>
                <li><a href="https://forms.gle/JS3LoCsJGQGh144n9" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">Submit Feedback</a></li>
                <li><button onClick={() => handleNavClick('reviews')} className="hover:text-[#111827] transition-colors text-left">Tester Testimonials</button></li>
                <li><a href="https://github.com/xynezakg/Midnight-Xyn/blob/master/USERS.md" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">USERS.md Hashes</a></li>
              </ul>
            </div>

            {/* Col 6: Network */}
            <div className="flex flex-col gap-4 col-span-1">
              <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">Deployment</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><span className="text-[#111827] font-semibold">Midnight Preprod</span></li>
                <li>
                  <button onClick={handleCopyContract} className="hover:text-[#111827] font-mono text-xs transition-colors flex items-center gap-1">
                    <span>{formatAddress(BIDVEIL_CONTRACT_CONFIG.preprodAddress || '', 6, 4)}</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </li>
                <li><a href={BIDVEIL_CONTRACT_CONFIG.explorerUrl} target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">Explorer Indexer</a></li>
                <li><a href="https://midnight.network" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">Midnight Network</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Badges Strip */}
          <div className="border-t border-[#E5E7EB] pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] font-medium text-[#6B7280]">
            <div className="flex flex-wrap justify-center gap-6">
              <span className="flex items-center gap-1.5 font-mono text-[10px]">
                <Lock className="w-4 h-4 text-indigo-600" />
                ZERO-KNOWLEDGE WITNESS PROVEN
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px]">
                <Database className="w-4 h-4 text-indigo-600" />
                MIDNIGHT BLOCKCHAIN NATIVE
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px]">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                COMPACT v0.34 SMART CONTRACT
              </span>
            </div>
            <p className="font-sans">
              &copy; 2026 Bidveil. All rights reserved. Built for confidential procurement on Midnight.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
