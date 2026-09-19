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
    <div className="bg-[#0D1222] rounded-2xl border border-white/10 shadow-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Wallet Identity Section */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              isConnected
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                : 'bg-white/5 text-slate-400 border border-white/10'
            }`}
          >
            <Wallet className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-white">
                {isConnected ? 'Midnight Wallet Connected' : 'Connect Midnight Wallet'}
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-semibold">
                <ShieldCheck className="w-3 h-3" />
                {network}
              </span>
              {isConnected && connectionType && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-mono">
                  {connectionType === 'lace' ? 'Live Lace' : 'Sandbox Session'}
                </span>
              )}
            </div>

            {isConnected ? (
              <p className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Ready to execute browser zk-SNARK prover
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1">
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
              <div className="px-3.5 py-1.5 rounded-xl bg-[#070A14] border border-white/10 flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-400 block leading-none">Balance</span>
                  <span className="text-xs font-mono font-bold text-white">{balance}</span>
                </div>
              </div>

              <button
                onClick={onDisconnect}
                className="px-3.5 py-2 rounded-xl bg-[#131B31] hover:bg-rose-950/40 hover:border-rose-500/30 hover:text-rose-400 border border-white/10 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5"
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
                className="bv-btn-primary text-xs px-5 py-2.5 disabled:opacity-50 flex-1 sm:flex-initial"
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
                  className="px-4 py-2.5 rounded-xl bg-[#131B31] hover:bg-[#1A2542] border border-white/10 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
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
        <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#070A14] rounded-xl p-3 border border-white/10">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Account:</span>
            <span className="font-mono text-xs text-cyan-300 font-semibold truncate" title={walletAddress}>
              {truncatedAddress}
            </span>
          </div>

          <button
            onClick={copyAddress}
            className="px-3 py-1 rounded-lg bg-[#131B31] hover:bg-[#1A2542] text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto border border-white/10"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
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
        <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
              className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 shadow"
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
