import React, { useState } from 'react';
import { Header } from './components/Header';
import { StreamPlayer } from './components/StreamPlayer';
import { TranscriptPlayer } from './components/TranscriptPlayer';
import { TelemetryMatrix } from './components/TelemetryMatrix';
import { AiStudioBooth } from './components/AiStudioBooth';
import { Footer } from './components/Footer';
import { Radio, ShieldAlert, Sparkles, Activity, Volume2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'stream' | 'telemetry' | 'matrix' | 'aibooth'>('stream');
  const [activeFeedId, setActiveFeedId] = useState<string>('peedub');
  const [is432HzActive, setIs432HzActive] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState<number>(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Dragon 9 Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        is432HzActive={is432HzActive}
        setIs432HzActive={setIs432HzActive}
      />

      {/* Main Broadcast Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* Top Emergency Ticker Bar */}
        <div className="bg-rose-950/60 border border-rose-900/80 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-mono text-rose-300 shadow-md overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-bold text-rose-400">ATMOSPHERIC ALERT:</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap ml-3">
            <div className="inline-block animate-pulse">
              Tasman Sea 3.8m sets firing at Pee Dub with 20-kt SE offshore winds · Whistler avalanche warnings red across all sectors (45cm dump) · Pacific low-pressure slingshot tracking live.
            </div>
          </div>
          <div className="hidden sm:block font-bold text-slate-400 text-[10px] shrink-0 ml-3">
            CYCLE 9 // MINUTE 53
          </div>
        </div>

        {/* Tab Content 1: Main Live Broadcast & Audio Transcript Player */}
        {activeTab === 'stream' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Columns: Video Stream Player & Channel Switcher */}
              <div className="lg:col-span-7">
                <StreamPlayer
                  activeFeedId={activeFeedId}
                  setActiveFeedId={setActiveFeedId}
                  isAudioPlaying={isAudioPlaying}
                  setIsAudioPlaying={setIsAudioPlaying}
                  currentTranscriptIndex={currentTranscriptIndex}
                />
              </div>

              {/* Right 5 Columns: Synchronized Audio Transcript */}
              <div className="lg:col-span-5 h-full">
                <TranscriptPlayer
                  activeFeedId={activeFeedId}
                  setActiveFeedId={setActiveFeedId}
                  isAudioPlaying={isAudioPlaying}
                  setIsAudioPlaying={setIsAudioPlaying}
                  currentTranscriptIndex={currentTranscriptIndex}
                  setCurrentTranscriptIndex={setCurrentTranscriptIndex}
                />
              </div>
            </div>

            {/* Quick Access Telemetry Snapshot Below Stream */}
            <TelemetryMatrix />
          </div>
        )}

        {/* Tab Content 2: Telemetry Matrix */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <TelemetryMatrix />
          </div>
        )}

        {/* Tab Content 3: Pacific Slingshot Radar Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <TelemetryMatrix />
          </div>
        )}

        {/* Tab Content 4: AI Studio Booth */}
        {activeTab === 'aibooth' && (
          <div className="space-y-6">
            <AiStudioBooth />
          </div>
        )}
      </main>

      {/* Dragon 9 Footer */}
      <Footer />
    </div>
  );
}
