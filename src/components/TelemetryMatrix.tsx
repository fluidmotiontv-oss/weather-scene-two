import React, { useState } from 'react';
import { Gauge, Wind, Thermometer, ShieldAlert, Waves, Snowflake, Compass, Activity, Zap, RefreshCw } from 'lucide-react';

export const TelemetryMatrix: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'tasman' | 'whistler' | 'niseko'>('tasman');
  const [pulseCount, setPulseCount] = useState(432);

  return (
    <div className="space-y-6">
      {/* Telemetry Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
            DRAGON 9 ATMOSPHERIC TELEMETRY MATRIX
          </div>
          <h2 className="text-2xl font-extrabold font-display text-slate-100 mt-1">
            Global Barometric & Hydrodynamic Telemetry
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Live mesh sensors tracking Pacific low-pressure slingshot, 20-kt southeast offshore winds at Pee Dub, and Whistler coastal cement whiteout.
          </p>
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveZone('tasman')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
              activeZone === 'tasman' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            TASMAN SEA (NZ)
          </button>
          <button
            onClick={() => setActiveZone('whistler')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
              activeZone === 'whistler' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            WHISTLER (BC)
          </button>
          <button
            onClick={() => setActiveZone('niseko')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
              activeZone === 'niseko' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NISEKO (JAPAN)
          </button>
        </div>
      </div>

      {/* Grid Cards for Telemetry Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Barometric Pressure */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>BAROMETRIC PRESSURE</span>
            <Gauge className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white mt-2 tabular-nums">
            982 <span className="text-base text-rose-400 font-normal">hPa</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/50">
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
              BOTTOMING OUT
            </span>
            <span>-14 hPa / 6h</span>
          </div>
        </div>

        {/* Metric 2: Wind Vector */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>WIND VECTOR & GROOMING</span>
            <Compass className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white mt-2 tabular-nums">
            20 <span className="text-base text-amber-400 font-normal">KTS SE</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-amber-400 bg-amber-950/40 p-2 rounded border border-amber-900/50">
            <span>OFFSHORE GROOMING</span>
            <span>135° SE DIRECTION</span>
          </div>
        </div>

        {/* Metric 3: Swell / Snow Density */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>SWELL / SNOW DUMP</span>
            {activeZone === 'whistler' ? <Snowflake className="w-4 h-4 text-cyan-400" /> : <Waves className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="text-3xl font-extrabold font-mono text-white mt-2 tabular-nums">
            {activeZone === 'whistler' ? '45 CM' : '3.8M'}
            <span className="text-base text-emerald-400 font-normal ml-1">
              {activeZone === 'whistler' ? 'NEW POWDER' : '@ 16s'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
            <span>{activeZone === 'whistler' ? 'COASTAL CEMENT' : 'BLACK SAND TUBES'}</span>
            <span>{activeZone === 'whistler' ? 'FREEZE 800M' : 'CAVERNOUS'}</span>
          </div>
        </div>

        {/* Metric 4: 432Hz Harmonic Mesh */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>NEURAL LINK SYNC</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white mt-2 tabular-nums">
            432 <span className="text-base text-cyan-400 font-normal">Hz</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-cyan-400 bg-cyan-950/40 p-2 rounded border border-cyan-900/50">
            <span>PINEAL INTERFACE</span>
            <span className="animate-pulse">STABLE 100%</span>
          </div>
        </div>
      </div>

      {/* Detailed Telemetry Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Pacific Slingshot Atmospheric Map Simulation */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Pacific Grid Atmospheric River Radar
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                SLINGSHOT VECTOR: TASMAN SEA (NZ) → WHISTLER (BC) → NISEKO (JP)
              </p>
            </div>
            <span className="text-xs font-mono bg-rose-950 border border-rose-800 text-rose-400 px-2.5 py-1 rounded">
              SYSTEM COLLISION
            </span>
          </div>

          {/* Interactive Radar Graphic Container */}
          <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-6 bg-grid-pattern">
            {/* Animated Radar Pulse Rings */}
            <div className="absolute w-72 h-72 border border-cyan-500/20 rounded-full animate-ping pointer-events-none" />
            <div className="absolute w-48 h-48 border border-rose-500/30 rounded-full animate-pulse pointer-events-none" />

            {/* Weather System Map Labels */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              {/* Top Row: Whistler BC */}
              <div className="flex items-center justify-between">
                <div className="bg-slate-900/90 border border-cyan-500/60 p-3 rounded-lg backdrop-blur">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">WHISTLER (BC) NODE</div>
                  <div className="text-xs font-bold text-white">45cm Coastal Cement Dump</div>
                  <div className="text-[10px] text-slate-400 font-mono">Freezing line: 800m • Wind: 65 km/h</div>
                </div>

                <div className="bg-slate-900/90 border border-amber-500/60 p-3 rounded-lg backdrop-blur text-right">
                  <div className="text-[10px] font-mono text-amber-400 font-bold">NISEKO (JAPAN) INTERCEPT</div>
                  <div className="text-xs font-bold text-white">Slingshot Incoming</div>
                  <div className="text-[10px] text-slate-400 font-mono">Ropes Dropping • Towers Prepped</div>
                </div>
              </div>

              {/* Atmospheric Vector Wave Line */}
              <div className="my-auto py-4 flex items-center justify-between px-8 text-xs font-mono text-rose-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span>TASMAN RESET</span>
                </div>
                <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-rose-500 via-cyan-400 to-amber-400 relative">
                  <div className="absolute inset-y-0 w-8 bg-white/80 blur-xs animate-scanline" />
                </div>
                <div className="flex items-center gap-2">
                  <span>PACIFIC SLINGSHOT</span>
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                </div>
              </div>

              {/* Bottom Row: Pee Dub NZ */}
              <div className="bg-slate-900/90 border border-rose-500/60 p-3 rounded-lg backdrop-blur max-w-sm">
                <div className="text-[10px] font-mono text-rose-400 font-bold">PEE DUB (NZ) IMPACT ZONE</div>
                <div className="text-xs font-bold text-white">Perry Clarke HUD: 145 BPM</div>
                <div className="text-[10px] text-slate-400 font-mono">20-kt SE Offshore • 3.8m Black Sand Barrel</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Athlete HUD Data & Conditions Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-5">
          <h3 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
            Athlete Bio-Telemetry Feed
          </h3>

          {/* Perry Clarke Telemetry Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-rose-400 font-bold">PERRY CLARKE</span>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                RAIL LOCKED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">HEART RATE</span>
                <span className="text-base font-bold text-rose-400 tabular-nums">145 BPM</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">BOARD SPEED</span>
                <span className="text-base font-bold text-amber-400 tabular-nums">34 KM/H</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed font-sans italic bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
              "It is heavy, it is spitting black sand and salt, and it is flawless! If you are holding the rail, you are making it out."
            </div>
          </div>

          {/* Pretty Worrell Telemetry Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">PRETTY WORRELL</span>
              <span className="text-[10px] font-mono bg-rose-950 text-rose-400 px-2 py-0.5 rounded border border-rose-800">
                AVALANCHE RED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">VISIBILITY</span>
                <span className="text-base font-bold text-rose-400">ZERO (WHITEOUT)</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">SNOW DUMP</span>
                <span className="text-base font-bold text-cyan-400 tabular-nums">45 CM / 12H</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
