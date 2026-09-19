import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Lock, 
  Key, 
  Cpu, 
  HelpCircle,
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG } from '../utils/contract';

export const DocsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'circuits' | 'privacy' | 'faq'>('quickstart');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BIDVEIL_CONTRACT_CONFIG.preprodAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const faqs = [
    {
      q: 'How does Bidveil hide my bid amount from competitors?',
      a: 'Bidveil uses Midnight\'s Compact smart contract language. Your bid amount is treated as a private witness (secretBidAmount) processed only inside your local browser via the Lace wallet zk-SNARK prover. Only a cryptographic validity proof verifying "bid >= reservePrice" is broadcast on-chain.'
    },
    {
      q: 'Why does public blockchain bidding suffer without zero-knowledge?',
      a: 'On transparent blockchains like Ethereum or standard Cardano, transactions in the public mempool are visible before inclusion in a block. Rival suppliers can analyze competitors\' bids in real time, front-run proposals, and undercut pricing by trivial fractions.'
    },
    {
      q: 'What network is Bidveil running on?',
      a: 'Bidveil is deployed and verifiable on the Midnight Network Preprod testnet (Contract Address: 7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2). It is also compatible with the Preview testnet.'
    },
    {
      q: 'What wallet do I need to interact with Bidveil?',
      a: 'You need the Lace Midnight Wallet extension configured for the Preprod testnet, funded with tNIGHT testnet gas tokens from the official Midnight faucet.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Specifications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
          Documentation &amp; Contract Verification
        </h2>
        <p className="text-sm sm:text-base text-[#6B7280]">
          Detailed specifications on Bidveil's zero-knowledge circuit pipeline, Compact contract rules, and testnet integration.
        </p>
      </div>

      {/* Docs Container Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        {/* Horizontally Scrollable Sub-navigation Tabs */}
        <div className="flex border-b border-[#E5E7EB] bg-[#FAFAF9] overflow-x-auto scrollbar-none px-4 pt-2">
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`px-5 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap min-h-[44px] ${
              activeTab === 'quickstart'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:bg-stone-100'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Quick Start &amp; Wallet</span>
          </button>

          <button
            onClick={() => setActiveTab('circuits')}
            className={`px-5 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap min-h-[44px] ${
              activeTab === 'circuits'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:bg-stone-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Compact Circuits</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap min-h-[44px] ${
              activeTab === 'privacy'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:bg-stone-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Model</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap min-h-[44px] ${
              activeTab === 'faq'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:bg-stone-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-10">
          {activeTab === 'quickstart' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-[#111827] flex items-center gap-2">
                  <Key className="w-4 h-4 text-indigo-600" />
                  Preprod Contract Deployment
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Bidveil is deployed on the Midnight Network Preprod testnet. Built with Compact and compiled with toolchain v0.34.
                </p>

                {/* Contract Address Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block">
                      Canonical Contract Address (Preprod)
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-indigo-700 font-semibold break-all select-all block">
                      {BIDVEIL_CONTRACT_CONFIG.preprodAddress}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyAddress}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 border border-[#E5E7EB] text-[#111827] font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      title="Copy full address to clipboard"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <a
                      href={BIDVEIL_CONTRACT_CONFIG.explorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 border border-[#E5E7EB] text-[#111827] font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Explorer</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6B7280]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2">
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">1. Configure Lace Wallet</div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Install the Lace Midnight extension and set your network to Preprod. Request testnet tNIGHT tokens via the official Midnight faucet.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2">
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">2. Connect &amp; Submit Bids</div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Click "Launch Terminal" in the top bar. Choose a tender, input your confidential bid, and generate client-side zk-SNARK proofs locally in your browser.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'circuits' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#111827]">
                Compact Smart Contract Circuits
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                The Bidveil protocol exports five circuits defining the complete lifecycle of sealed tenders:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-1">
                  <div className="font-mono text-xs text-indigo-700 font-semibold">initializeTender(reservePrice)</div>
                  <p className="text-xs text-[#6B7280]">Configures the minimum reserve price and marks the tender open for sealed bid submissions.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-1">
                  <div className="font-mono text-xs text-indigo-700 font-semibold">submitSealedBid(secretBid)</div>
                  <p className="text-xs text-[#6B7280]">Evaluates private witness constraints locally. Proves bid &gt;= reserve without revealing the value on-chain.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-1">
                  <div className="font-mono text-xs text-indigo-700 font-semibold">submitDisclosedBid(publicBid)</div>
                  <p className="text-xs text-[#6B7280]">Alternative transparent bidding pathway for public reverse auctions.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-1">
                  <div className="font-mono text-xs text-indigo-700 font-semibold">closeTender()</div>
                  <p className="text-xs text-[#6B7280]">Closes the active bidding window to finalize all submitted zero-knowledge commitments.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#111827]">
                Client-Side Privacy &amp; Kachina Prover Architecture
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Traditional public blockchains broadcast all mempool transactions in plain text. Competitors can observe vendor pricing proposals and front-run offers before blocks are minted.
              </p>
              <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2">
                <div className="text-xs font-semibold text-indigo-700">How Bidveil Prevents Valuation Leakage:</div>
                <ul className="space-y-1.5 text-xs text-[#6B7280]">
                  <li>• <strong>Private State Isolation:</strong> The actual bid valuation exists only as a local witness in the Lace browser extension memory.</li>
                  <li>• <strong>Zero-Knowledge Arithmetic:</strong> The local prover generates a cryptographic proof verifying <code className="text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded">bid &gt;= reservePrice</code> without emitting the input value.</li>
                  <li>• <strong>Immutable Ledger Consensus:</strong> Midnight validator nodes verify the validity proof and register commitment hashes with zero data disclosure.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-1.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#111827]">{faq.q}</h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
