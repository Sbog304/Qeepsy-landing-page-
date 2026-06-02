import React from 'react';
import { Calendar, Wallet, Home, Radio, Sparkles, CheckCircle2 } from 'lucide-react';

interface AppWorkspaceProps {
  currentView: 'organizer' | 'attendee';
  onNavigate: (view: 'landing' | 'organizer' | 'attendee') => void;
  children: React.ReactNode;
}

export default function AppWorkspace({ currentView, onNavigate, children }: AppWorkspaceProps) {
  return (
    <div className="min-h-screen bg-background text-text-muted flex flex-col relative">
      {/* 
        Unified App Portal Header:
        Completely insulated from the marketing landing page, providing real SaaS layout.
      */}
      <header className="sticky top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md border-b border-primary/10 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center gap-4">
          
          {/* Logo & Node Env Status indicator */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="font-sans font-black text-xl tracking-tighter text-on-background uppercase">
                Qeepsy<span className="text-primary italic font-serif lowercase">.</span>
              </span>
              <span className="bg-primary/10 border border-primary/25 rounded px-1.5 py-0.5 text-[8px] font-mono text-primary font-black uppercase tracking-[0.1em]">
                DAPP
              </span>
            </div>
          </div>

          {/* Unified App Workspace Segmented Switcher */}
          <div className="bg-surface-container border border-outline-variant/50 p-1 rounded-full flex gap-1.5 shadow-inner">
            <button
              onClick={() => onNavigate('organizer')}
              className={`px-4 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-[0.15em] font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'organizer'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-text-muted/70 hover:text-on-background'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Organizer</span>
            </button>
            <button
              onClick={() => onNavigate('attendee')}
              className={`px-4 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-[0.15em] font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'attendee'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-text-muted/70 hover:text-on-background'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Attendee</span>
            </button>
          </div>

          {/* Network System Health & Back-to-web Gate */}
          <div className="flex items-center gap-4">
            {/* Net Node Status indicator */}
            <div className="hidden lg:flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[9px] text-text-muted font-bold tracking-wider uppercase">
                Sui DevNet Connected
              </span>
            </div>

            <button
              onClick={() => onNavigate('landing')}
              className="px-3.5 py-1.5 rounded-full border border-outline-variant hover:border-primary text-text-muted hover:text-primary font-sans text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer bg-surface"
              title="Exit to Public Website"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit App</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main app panel viewport wrapper */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Discrete app space footer */}
      <footer className="py-8 bg-surface-container-low border-t border-primary/10 text-center text-[10px] font-mono tracking-wider text-text-muted/40">
        QEEPSY APP WORKSPACE &copy; 2026. PROTECTED BY SUI zkLOGIN VERIFIED CREDENTIALS.
      </footer>
    </div>
  );
}
