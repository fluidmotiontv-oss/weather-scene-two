import React from 'react';
import { Activity, Radio, Volume2, ShieldAlert, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface HeaderProps {
  activeTab: 'stream' | 'telemetry' | 'matrix' | 'aibooth';
  setActiveTab: (tab: 'stream' | 'telemetry' | 'matrix' | 'aibooth') => void;
  is432HzActive: boolean;
  setIs432HzActive: (active: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  is432HzActive,
  setIs432HzActive,
}) => {
  const handleToggle432Hz = () => {
    const newState = audioEngine.toggle432HzHarmonic();
    setIs432HzActive(newState);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Zone 1: Single text wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); setActiveTab('stream'); }}
          className="text-xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400 flex items-center gap-2"
        >
          <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
          DRAGON 9 NETWORK
        </a>
        <span className="hidden sm:inline-block text-[11px] font-mono bg-slate-900 border border-slate-800 text-rose-400 px-2 py-0.5 rounded">
          432Hz HARMONIC SYNC
        </span>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('stream')}
          className={`transition-colors flex items-center gap-1.5 ${
            activeTab === 'stream' ? 'text-rose-400 font-semibold border-b-2 border-rose-500 pb-0.5' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          Broadcast Feed
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`transition-colors flex items-center gap-1.5 ${
            activeTab === 'telemetry' ? 'text-rose-400 font-semibold border-b-2 border-rose-500 pb-0.5' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Telemetry Matrix
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`transition-colors flex items-center gap-1.5 ${
            activeTab === 'matrix' ? 'text-rose-400 font-semibold border-b-2 border-rose-500 pb-0.5' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Pacific Slingshot Radar
        </button>
        <button
          onClick={() => setActiveTab('aibooth')}
          className={`transition-colors flex items-center gap-1.5 ${
            activeTab === 'aibooth' ? 'text-rose-400 font-semibold border-b-2 border-rose-500 pb-0.5' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          AI Studio Booth
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle432Hz}
          className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all flex items-center gap-2 border ${
            is432HzActive
              ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
          title="Toggle 432Hz Neural Harmonic Audio Generator"
        >
          <Volume2 className={`w-3.5 h-3.5 ${is432HzActive ? 'text-rose-400' : 'text-slate-400'}`} />
          <span>{is432HzActive ? '432Hz ON' : '432Hz SYNC'}</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono bg-rose-950/40 text-rose-400 border border-rose-900/60 px-2.5 py-1 rounded-md">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
          <span>BARO 982 hPa</span>
        </div>
      </div>
    </header>
  );
};
