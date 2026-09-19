import React, { useState } from 'react';
import { 
  Wallet, 
  LogOut, 
  Check, 
  Copy, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Coins, 
  Zap 
} from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  balance?: string;
  isConnecting: boolean;
  error: string | null;
  connectionType?: 'lace' | 'sandbox' | null;
  onConnect: () => void;
  onConnectSandbox?: () => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  network,
  balance = '5,000.00 tNIGHT',
  isConnecting,
  error,
  connectionType = 'sandbox',
  onConnect,
  onConnectSandbox,
  onDisconnect,
}) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 14)}...${walletAddress.slice(-8)}`
    : '';

  return (
    <div className="ent-card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Wallet Identity Section */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              isConnected
                ? 'bg-[#74E8A3]/15 text-[#74E8A3] border border-[#74E8A3]/30'
                : 'bg-[#141D2A] text-[#94A3B8] border border-[#253142]'
            }`}
          >
            <Wallet className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-[#F4F7FA]">
                {isConnected ? 'Midnight Wallet Connected' : 'Connect Midnight Wallet'}
              </h3>
              <span className="ent-badge text-[10px]">
                <ShieldCheck className="w-3 h-3" />
                {network}
              </span>
              {isConnected && connectionType && (
                <span className="ent-badge-subtle text-[10px] font-mono">
                  {connectionType === 'lace' ? 'Live Lace' : 'Sandbox Session'}
                </span>
              )}
            </div>

            {isConnected ? (
              <p className="text-xs font-mono text-[#74E8A3] flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#74E8A3] animate-pulse"></span>
                Ready to execute browser zk-SNARK prover
              </p>
            ) : (
              <p className="text-xs text-[#94A3B8] mt-1">
                Authorize via Lace Midnight Extension or start an instant Preprod sandbox session
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {isConnected ? (
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between">
              {/* Balance Badge */}
              <div className="px-3.5 py-1.5 rounded-full bg-[#080D14] border border-[#253142] flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <div>
                  <span className="text-[9px] uppercase font-semibold text-[#94A3B8] block leading-none">Balance</span>
                  <span className="text-xs font-mono font-bold text-[#F4F7FA]">{balance}</span>
                </div>
              </div>

              <button
                onClick={onDisconnect}
                className="ent-btn-secondary text-xs px-4 py-2 text-[#94A3B8] hover:text-rose-400"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="ent-btn-primary text-xs px-5 py-2.5 disabled:opacity-50 flex-1 sm:flex-initial"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Awaiting Approval...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Connect Live Lace</span>
                  </>
                )}
              </button>

              {onConnectSandbox && (
                <button
                  onClick={onConnectSandbox}
                  className="ent-btn-secondary text-xs px-4 py-2.5 text-[#F4F7FA]"
                  title="Connect instantly using verified Preprod credentials"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sandbox Mode</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Connected Address Bar */}
      {isConnected && walletAddress && (
        <div className="mt-4 pt-3.5 border-t border-[#253142] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#080D14] rounded-xl p-3 border border-[#253142]">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider shrink-0">Account:</span>
            <span className="font-mono text-xs text-[#74E8A3] font-semibold truncate" title={walletAddress}>
              {truncatedAddress}
            </span>
          </div>

          <button
            onClick={copyAddress}
            className="px-2.5 py-1 rounded-full bg-[#101722] hover:bg-[#141D2A] text-[#94A3B8] text-xs font-mono transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto border border-[#253142]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#74E8A3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-amber-300">Connection Notice</span>
              {error}
            </div>
          </div>

          {onConnectSandbox && !isConnected && (
            <button
              onClick={onConnectSandbox}
              className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#080D14] font-bold text-xs shrink-0 flex items-center gap-1 shadow"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Use Preprod Sandbox</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
