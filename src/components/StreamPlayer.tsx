import React, { useState, useEffect, useRef } from 'react';
import { BROADCAST_FEEDS, BroadcastFeed } from '../data/broadcastData';
import { audioEngine } from '../utils/audioSynth';
import { Play, Pause, Eye, Heart, Wind, Gauge, Sparkles, Volume2, ShieldAlert, Maximize2, RefreshCw } from 'lucide-react';

interface StreamPlayerProps {
  activeFeedId: string;
  setActiveFeedId: (id: string) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  currentTranscriptIndex: number;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({
  activeFeedId,
  setActiveFeedId,
  isAudioPlaying,
  setIsAudioPlaying,
  currentTranscriptIndex,
}) => {
  const [thermalMode, setThermalMode] = useState(false);
  const [hudEnabled, setHudEnabled] = useState(true);
  const [kineticDampeners, setKineticDampeners] = useState(true);
  const [ambientAudioType, setAmbientAudioType] = useState<'surf' | 'alpine' | 'off'>('off');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const feed: BroadcastFeed = BROADCAST_FEEDS[activeFeedId] || BROADCAST_FEEDS.peedub;

  const handleChannelSwitch = (feedId: string) => {
    audioEngine.playFeedSwitchSound();
    setActiveFeedId(feedId);
    
    // Auto-switch ambient soundscape based on location
    const nextFeed = BROADCAST_FEEDS[feedId];
    if (nextFeed?.audioBg) {
      setAmbientAudioType(nextFeed.audioBg);
      audioEngine.playAmbientSoundscape(nextFeed.audioBg);
    }
  };

  const handleToggleAmbientAudio = (type: 'surf' | 'alpine' | 'off') => {
    audioEngine.playFeedSwitchSound();
    setAmbientAudioType(type);
    audioEngine.playAmbientSoundscape(type);
  };

  // Canvas visualizer loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw audio waveform or telemetry frequency
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = thermalMode ? '#00f0ff' : '#f43f5e';

      for (let x = 0; x < width; x += 4) {
        const amplitude = isAudioPlaying ? 18 : 6;
        const y =
          height / 2 +
          Math.sin(x * 0.05 + phase) * amplitude * Math.cos(x * 0.02) +
          (Math.random() * 2 - 1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isAudioPlaying ? 0.15 : 0.05;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAudioPlaying, thermalMode]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
      {/* Stream Player Top Bar */}
      <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${feed.badgeColor} animate-ping`} />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-100 uppercase">
            {feed.status}
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs font-mono text-slate-300">{feed.title}</span>
        </div>

        {/* HUD Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setThermalMode(!thermalMode)}
            className={`px-2.5 py-1 rounded transition-colors ${
              thermalMode ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/50' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {thermalMode ? 'THERMAL ON' : 'THERMAL OFF'}
          </button>
          <button
            onClick={() => setHudEnabled(!hudEnabled)}
            className={`px-2.5 py-1 rounded transition-colors ${
              hudEnabled ? 'bg-amber-950 text-amber-400 border border-amber-500/50' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            HUD OVERLAY
          </button>
          <button
            onClick={() => setKineticDampeners(!kineticDampeners)}
            className={`px-2.5 py-1 rounded transition-colors ${
              kineticDampeners ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            DAMPENERS
          </button>
        </div>
      </div>

      {/* Main Video Viewport Frame */}
      <div className={`relative aspect-video bg-black overflow-hidden group ${thermalMode ? 'contrast-125 hue-rotate-180 invert' : ''}`}>
        <img
          src={feed.image}
          alt={feed.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Scanline FX Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
        
        {/* Animated Moving Telemetry Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/10 to-transparent h-10 animate-scanline pointer-events-none" />

        {/* Top Scrim Gradient */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

        {/* Live HUD Graphics */}
        {hudEnabled && (
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between pointer-events-none select-none">
            {/* Top HUD Metadata */}
            <div className="flex items-start justify-between">
              <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-2.5 rounded-lg max-w-md">
                <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="w-3 h-3 text-rose-500" />
                  {feed.reporter} // {feed.role}
                </div>
                <div className="text-xs font-semibold text-slate-100 mt-0.5">{feed.location}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{feed.description}</div>
              </div>

              {/* Heart Rate / G-Force Telemetry Badge */}
              <div className="space-y-2 text-right">
                {feed.telemetry.heartRate && (
                  <div className="bg-rose-950/90 border border-rose-500/50 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono">
                    <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                    <div>
                      <div className="text-[10px] text-rose-300">HEART RATE</div>
                      <div className="text-sm font-bold text-white tabular-nums">{feed.telemetry.heartRate} BPM</div>
                    </div>
                  </div>
                )}
                {feed.telemetry.gForce && (
                  <div className="bg-slate-950/80 border border-slate-800 backdrop-blur px-3 py-1 rounded-lg text-right font-mono">
                    <div className="text-[10px] text-slate-400">IMPACT G-FORCE</div>
                    <div className="text-xs font-bold text-amber-400 tabular-nums">{feed.telemetry.gForce}</div>
                  </div>
                )}
                {feed.telemetry.freezingLevel && (
                  <div className="bg-cyan-950/90 border border-cyan-500/50 backdrop-blur px-3 py-1 rounded-lg text-right font-mono">
                    <div className="text-[10px] text-cyan-300">FREEZING LEVEL</div>
                    <div className="text-xs font-bold text-white tabular-nums">{feed.telemetry.freezingLevel}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom HUD Bar & Visualizer */}
            <div className="flex items-end justify-between gap-4">
              <div className="bg-slate-950/80 border border-slate-800 backdrop-blur px-3 py-2 rounded-lg font-mono text-xs flex items-center gap-4 text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 block">WIND VECTOR</span>
                  <span className="font-bold text-rose-400">{feed.telemetry.wind}</span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-500 block">SWELL / DUMP</span>
                  <span className="font-bold text-amber-400">{feed.telemetry.waveOrSnow}</span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-500 block">PRESSURE</span>
                  <span className="font-bold text-cyan-400">{feed.telemetry.pressure}</span>
                </div>
              </div>

              {/* Waveform Canvas */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-lg p-1.5 w-36 h-12 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-slate-400 tracking-wider">432Hz HARMONIC WAVE</span>
                <canvas ref={canvasRef} width={130} height={24} className="w-full h-6" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stream Controls & Channel Switcher Bar */}
      <div className="p-4 bg-slate-950 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-t border-slate-800">
        {/* Channel Selection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          {Object.values(BROADCAST_FEEDS).map((f) => (
            <button
              key={f.id}
              onClick={() => handleChannelSwitch(f.id)}
              className={`p-2.5 rounded-lg border text-left transition-all relative overflow-hidden ${
                activeFeedId === f.id
                  ? 'bg-rose-950/50 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono font-semibold text-rose-400 uppercase tracking-wider flex items-center justify-between">
                <span>{f.id}</span>
                {activeFeedId === f.id && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
              </div>
              <div className="text-xs font-bold text-slate-200 truncate mt-0.5">{f.title.split('//')[0]}</div>
              <div className="text-[10px] text-slate-500 truncate">{f.reporter.split('&')[0]}</div>
            </button>
          ))}
        </div>

        {/* Ambient Soundscape Synthesizer Toggles */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 px-2 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-rose-500" /> SYNTH AUDIO:
          </span>
          <button
            onClick={() => handleToggleAmbientAudio('surf')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              ambientAudioType === 'surf' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OCEAN TUBE
          </button>
          <button
            onClick={() => handleToggleAmbientAudio('alpine')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              ambientAudioType === 'alpine' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BLIZZARD
          </button>
          <button
            onClick={() => handleToggleAmbientAudio('off')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              ambientAudioType === 'off' ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-400'
            }`}
          >
            MUTE
          </button>
        </div>
      </div>
    </div>
  );
};
