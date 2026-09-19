import React, { useState } from 'react';
import { 
  Activity, 
  Menu, 
  X, 
  ExternalLink,
  ArrowUpRight,
  Shield,
  FileCode,
  Send,
  MessageSquare
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG } from '../utils/contract';

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
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#030611] text-slate-100 font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          ARCHITECTURAL ATMOSPHERE & BACKGROUND LOGO
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Celestial Light Beam (Top-Right Flare from Reference) */}
        <div className="celestial-beam"></div>

        {/* Ambient Left Indigo Glow */}
        <div className="ambient-glow-left"></div>

        {/* Architectural Subtle Grid Overlay */}
        <div className="absolute inset-0 architectural-grid opacity-75"></div>

        {/* The Bidveil Logo Watermark Embedded in Background */}
        <div className="bg-logo-watermark">
          <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
            <polygon 
              points="60,14 98,34 98,78 60,104 22,78 22,34" 
              stroke="#38bdf8" 
              strokeWidth="1.5" 
              strokeOpacity="0.4"
              strokeDasharray="4 4"
            />
            <polygon 
              points="60,26 34,44 48,74 60,60" 
              stroke="#818cf8" 
              strokeWidth="1" 
              strokeOpacity="0.35"
              fill="#38bdf8"
              fillOpacity="0.05"
            />
            <polygon 
              points="60,26 86,44 72,74 60,60" 
              stroke="#38bdf8" 
              strokeWidth="1" 
              strokeOpacity="0.35"
              fill="#818cf8"
              fillOpacity="0.05"
            />
            <polygon 
              points="60,60 48,74 60,94 72,74" 
              stroke="#6366f1" 
              strokeWidth="1" 
              strokeOpacity="0.4"
            />
            <circle cx="60" cy="60" r="38" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.2" strokeDasharray="3 6" />
            <circle cx="60" cy="60" r="54" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.15" />
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            HEADER / NAVIGATION BAR
        ────────────────────────────────────────────────────────────── */}
        <header className="border-b border-white/[0.07] bg-[#030611]/80 backdrop-blur-xl sticky top-0 z-50 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            {/* Brand Logo & Name */}
            <div 
              onClick={() => handleNavClick()}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-cyan-500/30 via-indigo-500/20 to-purple-500/10 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-500/10">
                <img 
                  src="/logo.jpg" 
                  alt="Bidveil Mark" 
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/bidveil-mark.svg';
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Bidveil
                </span>
                <span className="text-[10px] uppercase font-mono font-semibold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  ZK v1.0
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
              <button 
                onClick={() => handleNavClick('overview')}
                className="hover:text-cyan-400 transition-colors"
              >
                Overview
              </button>

              <button 
                onClick={() => handleNavClick('architecture')}
                className="hover:text-cyan-400 transition-colors"
              >
                Architecture
              </button>

              <button 
                onClick={() => handleNavClick('how-it-works')}
                className="hover:text-cyan-400 transition-colors"
              >
                How it works
              </button>

              <button 
                onClick={() => handleNavClick('feedbacks')}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                Feedbacks
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/15 text-cyan-300 text-[10px] font-mono border border-cyan-500/20">
                  52
                </span>
              </button>

              <button 
                onClick={() => handleNavClick('docs')}
                className="hover:text-cyan-400 transition-colors"
              >
                Docs
              </button>
            </nav>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-3">
              {/* Network Status Pill */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium badge-preprod">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Midnight {network}</span>
              </div>

              {/* Terminal Launch Pill CTA (Pill with Arrow Circle like Reference) */}
              <button
                onClick={() => onTabChange(activeTab === 'landing' ? 'terminal' : 'landing')}
                className="btn-pill-primary text-xs"
              >
                <span>{activeTab === 'landing' ? 'Launch Terminal' : 'Overview'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Slide-Down Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-[#030611]/95 px-4 py-4 space-y-3">
              <button 
                onClick={() => handleNavClick('overview')}
                className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
              >
                Overview
              </button>
              <button 
                onClick={() => handleNavClick('architecture')}
                className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
              >
                Architecture
              </button>
              <button 
                onClick={() => handleNavClick('how-it-works')}
                className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
              >
                How it works
              </button>
              <button 
                onClick={() => handleNavClick('feedbacks')}
                className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
              >
                Feedbacks (52 Verified Testers)
              </button>
              <button 
                onClick={() => handleNavClick('docs')}
                className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
              >
                Docs
              </button>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Network: Midnight {network}</span>
                <span className="text-cyan-400 font-mono">Compact v0.34</span>
              </div>
            </div>
          )}
        </header>

        {/* Main Content Viewport */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          {children}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER (Web3 Architectural Multi-Column Layout)
      ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.07] bg-[#02040a] relative z-10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/[0.07]">
            {/* Brand Column */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/30">
                  <img src="/logo.jpg" alt="Bidveil Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-lg font-bold text-white">Bidveil</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Confidential Zero-Knowledge Sealed-Bid Procurement on Midnight Network. Built with Compact smart contracts to eradicate bid sniping and front-running across enterprise tenders.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://x.com/bidveilmain" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                  title="Twitter / X (@bidveilmain)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/xynezakg/Midnight-Xyn" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                  title="GitHub Repository"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a 
                  href="https://t.me/MidnightNetwork" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                  title="Telegram Community"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 1: Product */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Product</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#overview" onClick={() => handleNavClick('overview')} className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#architecture" onClick={() => handleNavClick('architecture')} className="hover:text-white transition-colors">Architecture</a></li>
                <li><a href="#how-it-works" onClick={() => handleNavClick('how-it-works')} className="hover:text-white transition-colors">ZK Circuit Flow</a></li>
                <li>
                  <button onClick={() => onTabChange('terminal')} className="hover:text-white transition-colors text-left">
                    Bidding Terminal
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Protocol */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Protocol</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><span className="text-slate-300 font-mono">Midnight {network}</span></li>
                <li><span className="text-slate-300 font-mono">Compact 0.34</span></li>
                <li><span className="text-slate-300 font-mono">Kachina ZK-SNARKs</span></li>
                <li>
                  <a 
                    href="https://preprod.midnight.network" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-cyan-400 flex items-center gap-1"
                  >
                    Explorer <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Community & Feedback */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Community</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a 
                    href="https://forms.gle/JS3LoCsJGQGh144n9" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-cyan-400 flex items-center gap-1"
                  >
                    Tester Survey <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-cyan-400 flex items-center gap-1"
                  >
                    Public Sheet <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#feedbacks" onClick={() => handleNavClick('feedbacks')} className="hover:text-white transition-colors">
                    52 Verified Reviews
                  </a>
                </li>
                <li>
                  <a 
                    href="https://discord.gg/midnight-ntwrk" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-cyan-400 flex items-center gap-1"
                  >
                    Midnight Discord <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Status */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; 2026 Bidveil Protocol. Deployed on Midnight Preprod Network. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Contracts Live
              </span>
              <span className="font-mono text-[11px] text-slate-600">
                {BIDVEIL_CONTRACT_CONFIG.address.slice(0, 10)}...{BIDVEIL_CONTRACT_CONFIG.address.slice(-6)}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
