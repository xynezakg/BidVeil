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
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Wallet Identity Section */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              isConnected
                ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                : 'bg-stone-100 text-[#6B7280] border border-[#E5E7EB]'
            }`}
          >
            <Wallet className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                {isConnected ? 'Midnight Wallet Connected' : 'Connect Midnight Wallet'}
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-semibold">
                <ShieldCheck className="w-3 h-3" />
                {network}
              </span>
              {isConnected && connectionType && (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-[#E5E7EB] text-[#6B7280] text-[10px] font-mono">
                  {connectionType === 'lace' ? 'Live Lace' : 'Sandbox Session'}
                </span>
              )}
            </div>

            {isConnected ? (
              <p className="text-xs font-mono text-indigo-700 flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                Ready to execute browser zk-SNARK prover
              </p>
            ) : (
              <p className="text-xs text-[#6B7280] mt-1">
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
              <div className="px-3.5 py-1.5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <div>
                  <span className="text-[9px] uppercase font-semibold text-[#6B7280] block leading-none">Balance</span>
                  <span className="text-xs font-mono font-bold text-[#111827]">{balance}</span>
                </div>
              </div>

              <button
                onClick={onDisconnect}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:text-rose-600 transition-colors flex items-center gap-1.5 shadow-xs"
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
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-[#E5E7EB] text-xs font-semibold text-[#111827] transition-colors flex items-center gap-1.5 shadow-xs"
                  title="Connect instantly using verified Preprod credentials"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sandbox Mode</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Connected Address Bar */}
      {isConnected && walletAddress && (
        <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#FAFAF9] rounded-xl p-3 border border-[#E5E7EB]">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider shrink-0">Account:</span>
            <span className="font-mono text-xs text-indigo-700 font-semibold truncate" title={walletAddress}>
              {truncatedAddress}
            </span>
          </div>

          <button
            onClick={copyAddress}
            className="px-3 py-1 rounded-lg bg-white hover:bg-stone-100 text-[#6B7280] hover:text-[#111827] text-xs font-mono transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto border border-[#E5E7EB] shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied!</span>
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
        <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-amber-800">Connection Notice</span>
              {error}
            </div>
          </div>

          {onConnectSandbox && !isConnected && (
            <button
              onClick={onConnectSandbox}
              className="px-3 py-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow"
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
