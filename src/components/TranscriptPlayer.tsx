import React, { useState, useEffect, useRef } from 'react';
import { BROADCAST_TRANSCRIPT, TranscriptLine } from '../data/broadcastData';
import { audioEngine } from '../utils/audioSynth';
import { Play, Pause, SkipForward, RotateCcw, Volume2, Radio, CheckCircle, Flame } from 'lucide-react';

interface TranscriptPlayerProps {
  activeFeedId: string;
  setActiveFeedId: (id: string) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  currentTranscriptIndex: number;
  setCurrentTranscriptIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const TranscriptPlayer: React.FC<TranscriptPlayerProps> = ({
  activeFeedId,
  setActiveFeedId,
  isAudioPlaying,
  setIsAudioPlaying,
  currentTranscriptIndex,
  setCurrentTranscriptIndex,
}) => {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to active transcript line
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentTranscriptIndex]);

  // Telemetry broadcast auto-play loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAudioPlaying) {
      const currentLine = BROADCAST_TRANSCRIPT[currentTranscriptIndex];
      // Duration based on text length
      const delay = Math.max(3000, (currentLine.text.length * 50) / playbackSpeed);

      timer = setTimeout(() => {
        if (currentTranscriptIndex < BROADCAST_TRANSCRIPT.length - 1) {
          const nextIndex = currentTranscriptIndex + 1;
          const nextLine = BROADCAST_TRANSCRIPT[nextIndex];
          setCurrentTranscriptIndex(nextIndex);

          // Auto-switch camera feed if speaker feed changes!
          if (nextLine.feedId && nextLine.feedId !== activeFeedId) {
            audioEngine.playFeedSwitchSound();
            setActiveFeedId(nextLine.feedId);
          }
        } else {
          setIsAudioPlaying(false); // Finished cycle
        }
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isAudioPlaying, currentTranscriptIndex, playbackSpeed, activeFeedId]);

  const handleLineClick = (index: number) => {
    audioEngine.playFeedSwitchSound();
    setCurrentTranscriptIndex(index);
    const line = BROADCAST_TRANSCRIPT[index];
    if (line.feedId) {
      setActiveFeedId(line.feedId);
    }
    setIsAudioPlaying(true);
  };

  const handleTogglePlay = () => {
    audioEngine.playFeedSwitchSound();
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleReset = () => {
    audioEngine.playFeedSwitchSound();
    setCurrentTranscriptIndex(0);
    setActiveFeedId(BROADCAST_TRANSCRIPT[0].feedId);
    setIsAudioPlaying(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
      {/* Transcript Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
          <h3 className="text-sm font-bold font-display text-slate-100 uppercase tracking-wide">
            Live Telemetry Audio Transcript
          </h3>
          <span className="text-xs font-mono text-slate-500">
            ({currentTranscriptIndex + 1}/{BROADCAST_TRANSCRIPT.length})
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleReset}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Restart Transcript"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleTogglePlay}
            className={`px-3 py-1.5 rounded font-bold transition-all flex items-center gap-1.5 ${
              isAudioPlaying
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
          >
            {isAudioPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAudioPlaying ? 'PAUSE' : 'LIVE PLAY'}</span>
          </button>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-slate-800 text-slate-300 border border-slate-700 px-2 py-1 rounded text-xs"
          >
            <option value={1}>1.0x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>
        </div>
      </div>

      {/* Transcript Scrolling Body */}
      <div className="p-4 space-y-3 overflow-y-auto max-h-[420px] custom-scrollbar bg-slate-950/40">
        {BROADCAST_TRANSCRIPT.map((line, index) => {
          const isActive = index === currentTranscriptIndex;
          return (
            <div
              key={line.id}
              ref={isActive ? activeLineRef : null}
              onClick={() => handleLineClick(index)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer group ${
                isActive
                  ? 'bg-rose-950/60 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/40'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Speaker Metadata Header */}
              <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-bold uppercase ${isActive ? 'text-rose-400' : 'text-slate-200'}`}>
                    {line.speaker}
                  </span>
                  <span className="text-slate-500 text-[11px]">• {line.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isActive && <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                  <span className="text-[10px] text-slate-500">{line.time}</span>
                </div>
              </div>

              {/* Audio Marker Banner if present */}
              {line.audioMarker && (
                <div className="my-1.5 p-1.5 rounded bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-amber-400/90 flex items-center gap-2 italic">
                  <Volume2 className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{line.audioMarker}</span>
                </div>
              )}

              {/* Speech Text */}
              <p className={`text-sm leading-relaxed ${isActive ? 'text-slate-100 font-medium' : 'text-slate-300'}`}>
                "{line.text}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
