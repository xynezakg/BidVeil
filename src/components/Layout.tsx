import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Copy, 
  Check, 
  ExternalLink 
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
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedContract, setCopiedContract] = useState(false);

  // Monitor active scroll section for navigation highlighting
  useEffect(() => {
    if (activeTab !== 'landing') return;

    const handleScroll = () => {
      const sections = ['overview', 'architecture', 'how-it-works', 'reviews', 'docs'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (activeTab !== 'landing') {
      onTabChange('landing');
    }
    if (sectionId) {
      setActiveSection(sectionId);
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
    <div className="min-h-screen bg-[#080D14] text-[#F4F7FA] font-sans flex flex-col justify-between selection:bg-[#74E8A3] selection:text-[#080D14] relative">
      {/* Skip to Content for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#74E8A3] focus:text-[#080D14] focus:font-bold focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* ─────────────────────────────────────────────────────────────
          LIGHTWEIGHT FLOATING PILL NAVIGATION
      ────────────────────────────────────────────────────────────── */}
      <header className="sticky top-4 z-40 px-4 sm:px-6">
        <nav 
          aria-label="Main Navigation"
          className="max-w-[860px] mx-auto rounded-full bg-[#101722]/85 backdrop-blur-md border border-[#253142] px-4 py-2 shadow-lg shadow-black/40 flex items-center justify-between transition-all"
        >
          {/* Brand Identity */}
          <button 
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2.5 cursor-pointer text-left focus-visible:rounded-full min-h-[44px] px-1"
            aria-label="Bidveil Home"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#141D2A] border border-[#253142] flex items-center justify-center shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Bidveil Protocol Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/bidveil-mark.svg';
                }}
              />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#F4F7FA]">
              Bidveil
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-[#94A3B8]">
            <button 
              onClick={() => handleNavClick('overview')}
              className={`px-3.5 py-1.5 rounded-full transition-colors min-h-[36px] ${
                activeSection === 'overview' && activeTab === 'landing'
                  ? 'text-[#F4F7FA] bg-[#141D2A] font-semibold text-white' 
                  : 'hover:text-[#F4F7FA]'
              }`}
            >
              Overview
            </button>

            <button 
              onClick={() => handleNavClick('architecture')}
              className={`px-3.5 py-1.5 rounded-full transition-colors min-h-[36px] ${
                activeSection === 'architecture' && activeTab === 'landing'
                  ? 'text-[#F4F7FA] bg-[#141D2A] font-semibold text-white' 
                  : 'hover:text-[#F4F7FA]'
              }`}
            >
              Architecture
            </button>

            <button 
              onClick={() => handleNavClick('reviews')}
              className={`px-3.5 py-1.5 rounded-full transition-colors min-h-[36px] ${
                activeSection === 'reviews' && activeTab === 'landing'
                  ? 'text-[#F4F7FA] bg-[#141D2A] font-semibold text-white' 
                  : 'hover:text-[#F4F7FA]'
              }`}
            >
              Reviews
            </button>

            <button 
              onClick={() => handleNavClick('docs')}
              className={`px-3.5 py-1.5 rounded-full transition-colors min-h-[36px] ${
                activeSection === 'docs' && activeTab === 'landing'
                  ? 'text-[#F4F7FA] bg-[#141D2A] font-semibold text-white' 
                  : 'hover:text-[#F4F7FA]'
              }`}
            >
              Docs
            </button>
          </div>

          {/* Right Action: Single Primary Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onTabChange(activeTab === 'landing' ? 'terminal' : 'landing')}
              className="ent-btn-primary text-xs px-4 py-2 min-h-[40px]"
            >
              <span>{activeTab === 'landing' ? 'Launch Terminal' : 'Overview'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Accessible Mobile Menu Toggle Button (>= 44px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#141D2A] border border-[#253142] text-[#94A3B8] hover:text-white"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Accessible Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden max-w-sm mx-auto mt-2 rounded-2xl bg-[#101722]/95 backdrop-blur-xl border border-[#253142] p-3 space-y-1 shadow-xl"
            role="menu"
          >
            <button 
              onClick={() => handleNavClick('overview')}
              className="block w-full text-left py-2.5 px-3.5 rounded-xl text-sm text-[#94A3B8] hover:bg-[#141D2A] hover:text-white min-h-[44px]"
              role="menuitem"
            >
              Overview
            </button>
            <button 
              onClick={() => handleNavClick('architecture')}
              className="block w-full text-left py-2.5 px-3.5 rounded-xl text-sm text-[#94A3B8] hover:bg-[#141D2A] hover:text-white min-h-[44px]"
              role="menuitem"
            >
              Architecture
            </button>
            <button 
              onClick={() => handleNavClick('reviews')}
              className="block w-full text-left py-2.5 px-3.5 rounded-xl text-sm text-[#94A3B8] hover:bg-[#141D2A] hover:text-white min-h-[44px]"
              role="menuitem"
            >
              Reviews (52 Verified Testers)
            </button>
            <button 
              onClick={() => handleNavClick('docs')}
              className="block w-full text-left py-2.5 px-3.5 rounded-xl text-sm text-[#94A3B8] hover:bg-[#141D2A] hover:text-white min-h-[44px]"
              role="menuitem"
            >
              Documentation
            </button>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA (Semantic Landmark)
      ────────────────────────────────────────────────────────────── */}
      <main id="main-content" className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        {children}
      </main>

      {/* ─────────────────────────────────────────────────────────────
          SIMPLIFIED ENTERPRISE FOOTER
      ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#253142] bg-[#06090F] mt-16 pt-12 pb-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#253142]/60">
            {/* Brand Bio */}
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[#253142]">
                  <img src="/logo.jpg" alt="Bidveil Mark" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold text-[#F4F7FA]">Bidveil</span>
                <span className="ent-badge text-[10px] py-0.5 px-2">
                  Preprod Live
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Confidential zero-knowledge procurement infrastructure on Midnight Network. Protecting commercial valuations while ensuring verifiable settlement.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#94A3B8]">
              <a 
                href="https://x.com/bidveilmain" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#74E8A3] transition-colors min-h-[44px] flex items-center"
              >
                Twitter / X
              </a>
              <a 
                href="https://github.com/xynezakg/Midnight-Xyn" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#74E8A3] transition-colors min-h-[44px] flex items-center"
              >
                GitHub
              </a>
              <a 
                href="https://forms.gle/JS3LoCsJGQGh144n9" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#74E8A3] transition-colors min-h-[44px] flex items-center"
              >
                Feedback Form
              </a>
              <a 
                href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#74E8A3] transition-colors min-h-[44px] flex items-center"
              >
                Testing Evidence
              </a>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Contract Address Copy */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#94A3B8]">
            <p>&copy; 2026 Bidveil Protocol. Compact v0.34 Toolchain. All rights reserved.</p>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#94A3B8]">
                Contract: {formatAddress(BIDVEIL_CONTRACT_CONFIG.preprodAddress || '', 8, 6)}
              </span>
              <button
                onClick={handleCopyContract}
                className="p-1 rounded-md hover:bg-[#141D2A] text-[#94A3B8] hover:text-[#74E8A3] transition-colors"
                title="Copy full contract address"
                aria-label="Copy contract address"
              >
                {copiedContract ? <Check className="w-3.5 h-3.5 text-[#74E8A3]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
