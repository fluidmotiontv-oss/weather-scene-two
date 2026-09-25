import React, { useState } from 'react';
import { Sparkles, Send, Mic, Radio, Volume2, User, RefreshCw, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export const AiStudioBooth: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('Dave McKenzie (Host)');
  const [selectedLocation, setSelectedLocation] = useState<string>('Dragon 9 Control Booth');
  const [promptInput, setPromptInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [commentaryResult, setCommentaryResult] = useState<string>(
    'Dave McKenzie: "Telemetry is redlining across the board, people! The Dragon 9 cycle is pushing us straight into the deep end of the atmospheric pool today. Respect the ocean, respect the mountain, and stay locked to the 432Hz frequency."'
  );

  const presets = [
    { label: 'Pee Dub Tube Forecast', prompt: 'Jay, give me an updated reading on the 20-knot SE offshore wind grooming the 4-meter sets at Pee Dub!' },
    { label: 'Whistler Avalanche Warning', prompt: 'Pretty, what is the latest on the 45cm coastal cement snow dump and avalanche bomb detonations at Whistler?' },
    { label: 'Tokyo Pacific Slingshot', prompt: 'Misaki, break down the holographic Pacific low-pressure slingshot tracking towards Niseko!' },
    { label: 'Custom Global Spot Commentary', prompt: 'Dave, give us an extreme Dragon 9 broadcast commentary for a massive 20ft swell hitting Pipeline, North Shore Oahu!' },
  ];

  const handleGenerate = async (queryText?: string) => {
    const activeQuery = queryText || promptInput;
    if (!activeQuery.trim() || isGenerating) return;

    audioEngine.playFeedSwitchSound();
    setIsGenerating(true);

    try {
      const response = await fetch('/api/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activeQuery,
          speaker: selectedSpeaker,
          location: selectedLocation,
          telemetry: {
            pressure: '982 hPa',
            wind: '20-kt SE Offshore',
            waveHeight: '3.8m @ 16s',
            frequency: '432Hz Harmonic',
          },
        }),
      });

      const data = await response.json();
      if (data.text) {
        setCommentaryResult(`${selectedSpeaker}: "${data.text}"`);
      } else {
        setCommentaryResult('Error receiving broadcast stream. Try again.');
      }
    } catch (err) {
      console.error('Error fetching AI commentary:', err);
      setCommentaryResult('Broadcast transmission error. Please retry telemetry link.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            DRAGON 9 AI BROADCAST COMMENTARY STUDIO
          </div>
          <h2 className="text-2xl font-extrabold font-display text-white mt-1">
            Real-Time AI Telemetry Anchor & Commentary Engine
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Powered by Gemini 3.8 Flash. Direct the Dragon 9 broadcast team to analyze any extreme wave or winter storm scenario globally.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-950 p-1.5 rounded-lg border border-slate-800">
          <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="text-slate-300">SERVER-SIDE GEMINI 3.8 FLASH</span>
        </div>
      </div>

      {/* Speaker Selector & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => { setSelectedSpeaker('Dave McKenzie (Lead Host)'); setSelectedLocation('Dragon 9 Control Booth'); }}
          className={`p-3 rounded-lg border text-left font-mono transition-all ${
            selectedSpeaker.includes('Dave')
              ? 'bg-rose-950/70 border-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.2)]'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-rose-400 font-bold">BOOTH HOST</div>
          <div className="text-xs font-bold text-slate-200">Dave McKenzie</div>
        </button>

        <button
          onClick={() => { setSelectedSpeaker('Jay (Live reporter)'); setSelectedLocation('Pee Dub, NZ'); }}
          className={`p-3 rounded-lg border text-left font-mono transition-all ${
            selectedSpeaker.includes('Jay')
              ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-emerald-400 font-bold">PEE DUB SURF</div>
          <div className="text-xs font-bold text-slate-200">Jay</div>
        </button>

        <button
          onClick={() => { setSelectedSpeaker('Pretty Worrell (Alpine reporter)'); setSelectedLocation('Whistler, BC'); }}
          className={`p-3 rounded-lg border text-left font-mono transition-all ${
            selectedSpeaker.includes('Pretty')
              ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-cyan-400 font-bold">HIGH ALPINE</div>
          <div className="text-xs font-bold text-slate-200">Pretty Worrell</div>
        </button>

        <button
          onClick={() => { setSelectedSpeaker('Misaki (Tokyo Analyst)'); setSelectedLocation('Tokyo Weather Control'); }}
          className={`p-3 rounded-lg border text-left font-mono transition-all ${
            selectedSpeaker.includes('Misaki')
              ? 'bg-amber-950/70 border-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[10px] text-amber-400 font-bold">STUDIO INTERCEPT</div>
          <div className="text-xs font-bold text-slate-200">Misaki</div>
        </button>
      </div>

      {/* Quick Presets */}
      <div>
        <label className="text-xs font-mono text-slate-400 mb-2 block">QUICK TELEMETRY PRESETS:</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(preset.prompt);
                handleGenerate(preset.prompt);
              }}
              className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-rose-400 hover:border-rose-900 transition-colors font-mono"
            >
              ⚡ {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder={`Ask ${selectedSpeaker} to break down swell/snow conditions or report live...`}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder:text-slate-600 font-sans"
        />
        <button
          onClick={() => handleGenerate()}
          disabled={isGenerating || !promptInput.trim()}
          className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shrink-0"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>SYNCING...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>BROADCAST</span>
            </>
          )}
        </button>
      </div>

      {/* Commentary Output Box */}
      <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold border-b border-slate-900 pb-2">
          <span className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-rose-500 animate-pulse" />
            LIVE TRANSMISSION OUTPUT
          </span>
          <span className="text-[10px] text-slate-500">432Hz SYNC ACTIVE</span>
        </div>

        <p className="text-base text-slate-100 font-medium leading-relaxed font-sans italic pt-1">
          {commentaryResult}
        </p>
      </div>
    </div>
  );
};
