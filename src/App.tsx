import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { WalletConnect } from './components/WalletConnect';
import { SealedBidding } from './components/SealedBidding';
import { LandingPage } from './components/LandingPage';
import { useMidnight } from './hooks/useMidnight';

export const App: React.FC = () => {
  // Default to the complete SaaS Landing experience with Hero, About, How It Works, Feedbacks, and Docs
  const [activeTab, setActiveTab] = useState<'landing' | 'terminal'>('landing');

  const {
    isConnected,
    walletAddress,
    balance,
    network,
    isConnecting,
    isExtensionDetected,
    error,
    contractAddress,
    bidCount,
    reservePrice,
    isOpen,
    isProving,
    txHash,
    connectionType,
    isBroadcastingGas,
    gasTxHash,
    connectWallet,
    connectSandbox,
    disconnectWallet,
    executeCircuitCall,
    broadcastGasPing,
  } = useMidnight();

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isConnected={isConnected}
      network={network}
    >
      {activeTab === 'landing' ? (
        <LandingPage
          onLaunchTerminal={() => setActiveTab('terminal')}
          contractAddress={contractAddress}
          network={network}
        />
      ) : (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Header Banner to return to SaaS Homepage */}
          <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0D1222] border border-white/10 shadow-xl">
            <div>
              <h2 className="text-base font-bold text-white">Bidveil Bidding Terminal</h2>
              <p className="text-xs text-slate-400">Zero-Knowledge Sealed-Bid Execution Environment</p>
            </div>
            <button
              onClick={() => setActiveTab('landing')}
              className="px-4 py-2 rounded-xl bg-[#131B31] hover:bg-[#1A2542] border border-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              &larr; Back to Overview
            </button>
          </div>

          {/* Wallet Connection Card */}
          <WalletConnect
            isConnected={isConnected}
            walletAddress={walletAddress}
            balance={balance}
            network={network}
            isConnecting={isConnecting}
            isExtensionDetected={isExtensionDetected}
            error={error}
            connectionType={connectionType}
            isBroadcastingGas={isBroadcastingGas}
            gasTxHash={gasTxHash}
            onConnect={connectWallet}
            onConnectSandbox={connectSandbox}
            onDisconnect={disconnectWallet}
            onBroadcastGasPing={broadcastGasPing}
          />

          {/* Main Privacy Feature: Sealed Bidding */}
          <SealedBidding
            contractAddress={contractAddress}
            bidCount={bidCount}
            reservePrice={reservePrice}
            isOpen={isOpen}
            isConnected={isConnected}
            isProving={isProving}
            txHash={txHash}
            error={error}
            connectionType={connectionType}
            onExecuteCircuit={executeCircuitCall}
          />
        </div>
      )}
    </Layout>
  );
};

export default App;
