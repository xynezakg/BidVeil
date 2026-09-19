import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Copy, 
  Check, 
  ShieldCheck,
  Send
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
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] font-sans flex flex-col justify-between selection:bg-[#00A3FF] selection:text-white relative">
      {/* ─────────────────────────────────────────────────────────────
          NAVBAR CONTAINER (Directly Matching Reference Image)
      ────────────────────────────────────────────────────────────── */}
      <header className="sticky top-4 z-50 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#131A2B]/90 backdrop-blur-xl border border-white/10 px-5 sm:px-6 py-3 shadow-2xl shadow-black/60 flex items-center justify-between">
          {/* Brand Logo & Name (Example Style) */}
          <div 
            onClick={() => handleNavClick()}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00A3FF] to-[#0077FF] flex items-center justify-center shadow-md">
              <img 
                src="/logo.jpg" 
                alt="Bidveil" 
                className="w-full h-full object-cover rounded-[10px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/bidveil-mark.svg';
                }}
              />
            </div>
            <span className="text-base font-extrabold tracking-wider text-white uppercase">
              BIDVEIL
            </span>
          </div>

          {/* Centered Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#94A3B8]">
            <button 
              onClick={() => handleNavClick('overview')}
              className="hover:text-white transition-colors"
            >
              Overview
            </button>

            <button 
              onClick={() => handleNavClick('architecture')}
              className="hover:text-white transition-colors"
            >
              Architecture
            </button>

            <button 
              onClick={() => handleNavClick('simulator')}
              className="hover:text-white transition-colors"
            >
              Simulator
            </button>

            <button 
              onClick={() => handleNavClick('reviews')}
              className="hover:text-white transition-colors"
            >
              Reviews
            </button>

            <button 
              onClick={() => handleNavClick('docs')}
              className="hover:text-white transition-colors"
            >
              Docs
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Network Pill Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#162035] border border-[#1E293B] text-[#94A3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></span>
              <span>{network}</span>
            </div>

            {/* Cyan Gradient Button (Matching Reference "Pricing" Button) */}
            <button
              onClick={() => onTabChange(activeTab === 'landing' ? 'terminal' : 'landing')}
              className="cyan-btn-gradient text-xs px-4 py-2"
            >
              <span>{activeTab === 'landing' ? 'Launch Terminal' : 'Overview'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#162035] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-sm mx-auto mt-2 rounded-2xl bg-[#131A2B]/95 backdrop-blur-2xl border border-white/10 p-4 space-y-2 shadow-2xl">
            <button 
              onClick={() => handleNavClick('overview')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-[#162035] hover:text-white"
            >
              Overview
            </button>
            <button 
              onClick={() => handleNavClick('architecture')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-[#162035] hover:text-white"
            >
              Architecture
            </button>
            <button 
              onClick={() => handleNavClick('simulator')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-[#162035] hover:text-white"
            >
              Proof Simulator
            </button>
            <button 
              onClick={() => handleNavClick('reviews')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-[#162035] hover:text-white"
            >
              Reviews (52 Verified)
            </button>
            <button 
              onClick={() => handleNavClick('docs')}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-[#162035] hover:text-white"
            >
              Documentation
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER (Directly Matching Reference Image Layout)
      ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1E293B] bg-[#080C16] mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#94A3B8]">
          {/* Left Copyright */}
          <div>
            All rights reserved &copy; Bidveil 2026
          </div>

          {/* Center Brand Identity */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg overflow-hidden bg-gradient-to-tr from-[#00A3FF] to-[#0077FF] p-0.5">
              <img src="/logo.jpg" alt="Bidveil" className="w-full h-full object-cover rounded-md" />
            </div>
            <span className="font-extrabold tracking-wider text-white uppercase text-sm">
              BIDVEIL
            </span>
          </div>

          {/* Right Social Circles */}
          <div className="flex items-center gap-3">
            <a 
              href="https://x.com/bidveilmain" 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#131A2B] border border-[#1E293B] flex items-center justify-center text-slate-300 hover:text-[#00A3FF] hover:border-[#00A3FF]/40 transition-colors"
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
              className="w-8 h-8 rounded-full bg-[#131A2B] border border-[#1E293B] flex items-center justify-center text-slate-300 hover:text-[#00A3FF] hover:border-[#00A3FF]/40 transition-colors"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a 
              href="https://forms.gle/JS3LoCsJGQGh144n9" 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#131A2B] border border-[#1E293B] flex items-center justify-center text-slate-300 hover:text-[#00A3FF] hover:border-[#00A3FF]/40 transition-colors"
              title="Feedback Survey"
            >
              <Send className="w-3.5 h-3.5" />
            </a>

            {/* Contract Copy */}
            <button
              onClick={handleCopyContract}
              className="px-2.5 py-1 rounded-full bg-[#131A2B] border border-[#1E293B] text-[11px] font-mono hover:text-white flex items-center gap-1"
              title="Copy Preprod contract address"
            >
              {copiedContract ? <Check className="w-3 h-3 text-[#00A3FF]" /> : <Copy className="w-3 h-3" />}
              <span>{formatAddress(BIDVEIL_CONTRACT_CONFIG.preprodAddress || '', 6, 4)}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
