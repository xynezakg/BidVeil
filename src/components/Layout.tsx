import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink,
  Shield,
  Send,
  Menu,
  X
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
      }, 80);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 font-sans flex flex-col justify-between selection:bg-emerald-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          MOTTA AMBIENT GLOW ORBS & BACKGROUND ACCENTS
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Lime Glow Top Left (Motta Inspo) */}
        <div className="motta-ambient-glow-top-left"></div>

        {/* Soft Luminous Glow Bottom Right */}
        <div className="motta-ambient-glow-bottom-right"></div>

        {/* Ambient Center Diffuse Light */}
        <div className="motta-ambient-glow-center"></div>

        {/* Subtle Ambient Cross / Plus Motifs in Background */}
        <div className="floating-cross top-40 left-12 transform -rotate-12 hidden lg:block">+</div>
        <div className="floating-cross top-1/3 right-16 transform rotate-45 hidden lg:block">+</div>
        <div className="floating-cross bottom-48 left-24 transform rotate-12 hidden lg:block">+</div>
      </div>

      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            FLOATING CENTER PILL NAVBAR (Directly from Motta Inspo)
        ────────────────────────────────────────────────────────────── */}
        <header className="sticky top-5 z-50 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto rounded-full bg-[#111622]/90 backdrop-blur-2xl border border-white/[0.09] px-4 sm:px-5 py-2.5 shadow-2xl shadow-black/60 flex items-center justify-between">
            {/* Brand Logo & Name */}
            <div 
              onClick={() => handleNavClick()}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center shadow-md">
                <img 
                  src="/logo.jpg" 
                  alt="Bidveil" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/bidveil-mark.svg';
                  }}
                />
              </div>
              <span className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Bidveil
              </span>
            </div>

            {/* Centered Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300">
              <button 
                onClick={() => handleNavClick('overview')}
                className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors"
              >
                Overview
              </button>

              <button 
                onClick={() => handleNavClick('architecture')}
                className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors"
              >
                Architecture
              </button>

              <button 
                onClick={() => handleNavClick('feedbacks')}
                className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors flex items-center gap-1.5"
              >
                Feedbacks
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                  52
                </span>
              </button>

              <button 
                onClick={() => handleNavClick('docs')}
                className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors"
              >
                Docs
              </button>
            </nav>

            {/* Right Action Button (Motta High-Contrast Pill CTA) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onTabChange(activeTab === 'landing' ? 'terminal' : 'landing')}
                className="motta-pill-btn-primary text-xs"
              >
                <span>{activeTab === 'landing' ? 'Launch Terminal' : 'Back to Home'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden max-w-sm mx-auto mt-2 rounded-2xl bg-[#111622]/95 backdrop-blur-2xl border border-white/10 p-4 space-y-2 shadow-2xl">
              <button 
                onClick={() => handleNavClick('overview')}
                className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Overview
              </button>
              <button 
                onClick={() => handleNavClick('architecture')}
                className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Architecture
              </button>
              <button 
                onClick={() => handleNavClick('feedbacks')}
                className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Feedbacks (52 Verified)
              </button>
              <button 
                onClick={() => handleNavClick('docs')}
                className="block w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Documentation
              </button>
            </div>
          )}
        </header>

        {/* Main Content Viewport */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
          {children}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MINIMALIST CLEAN FOOTER
      ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#070b12] relative z-10 pt-12 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <img src="/logo.jpg" alt="Bidveil Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-white">Bidveil Protocol</span>
              <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Midnight Preprod
              </span>
            </div>

            <div className="flex items-center gap-5 text-xs text-slate-400">
              <a href="https://x.com/bidveilmain" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Twitter / X
              </a>
              <a href="https://github.com/xynezakg/Midnight-Xyn" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                GitHub
              </a>
              <a href="https://forms.gle/JS3LoCsJGQGh144n9" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Feedback Form
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Public Sheet
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>&copy; 2026 Bidveil. All rights reserved.</p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Preprod Contract: {formatAddress(BIDVEIL_CONTRACT_CONFIG.preprodAddress || '', 8, 6)}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
