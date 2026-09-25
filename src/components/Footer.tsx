import React from 'react';
import { Radio, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950 px-4 md:px-8 py-6 text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-300">
            <Radio className="w-4 h-4 text-rose-500" />
            <span>DRAGON 9 FLUID MOTION BROADCAST SYSTEM</span>
          </div>
          <span>·</span>
          <span>432Hz Harmonic Relay</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>Tasman Sea (Pee Dub)</span>
          <span>·</span>
          <span>Whistler Alpine (BC)</span>
          <span>·</span>
          <span>Shibuya Command (Tokyo)</span>
        </div>

        <div className="text-slate-600">
          © {new Date().getFullYear()} Dragon 9 Network. All atmospheric rights reserved.
        </div>
      </div>
    </footer>
  );
};
