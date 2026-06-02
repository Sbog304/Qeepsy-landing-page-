import { ArrowRight, Sparkles, Check, X, ShieldAlert, BadgeInfo, Users, Calendar, Award } from 'lucide-react';
import BadgeViewer from './BadgeViewer';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'organizer' | 'attendee') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 bg-surface text-text-muted">
      
      {/* 1. Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-primary/10">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <span className="font-sans font-black text-3xl tracking-tighter text-on-background uppercase">Qeepsy<span className="text-primary italic font-serif lowercase">.</span></span>
          </div>

          <div className="hidden md:flex gap-10 items-center">
            <a href="#how-it-works" className="font-sans font-black uppercase tracking-[0.2em] text-[10px] text-text-muted hover:text-primary transition-colors">How it works</a>
            <a href="#comparison" className="font-sans font-black uppercase tracking-[0.2em] text-[10px] text-text-muted hover:text-primary transition-colors">Our Philosophy</a>
            <a href="#use-cases" className="font-sans font-black uppercase tracking-[0.2em] text-[10px] text-text-muted hover:text-primary transition-colors">Solutions</a>
            <a href="#testimonials" className="font-sans font-black uppercase tracking-[0.2em] text-[10px] text-text-muted hover:text-primary transition-colors">Community</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('attendee')}
              className="text-primary font-black uppercase tracking-wider text-xs hover:text-primary-fixed-variant px-3 py-2 transition-colors"
            >
              My Wallet
            </button>
            <button 
              onClick={() => onNavigate('organizer')}
              className="bg-primary hover:bg-primary-fixed-variant text-on-primary font-black uppercase tracking-wider text-xs px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Organizer Portal
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Huge Background Text (Non-scrolling anchor) */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <h1 className="text-[170px] sm:text-[230px] md:text-[310px] font-black leading-none tracking-[-0.07em] text-primary/[0.025] uppercase select-none">
            LEGACY
          </h1>
        </div>
        {/* Subtle grid and decorative circles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/4 blur-3xl" />
          <div className="absolute bottom-[25%] right-[10%] w-96 h-96 rounded-full bg-accent/6 blur-3xl animate-pulse-glow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-primary/25">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-black text-primary">
                Event Memory Infrastructure
              </span>
            </div>

            <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] text-on-background tracking-tighter uppercase">
              Every event deserves <br />
              <span className="text-primary italic font-serif normal-case tracking-normal font-light">a legacy.</span>
            </h1>

            <p className="max-w-xl font-sans text-[17px] text-text-muted leading-relaxed font-light">
              Personalised digital keepsakes for modern events — powered by seamless Google onboarding, dynamic AI memory recaps, and verifiable Sui identities. No crypto knowledge required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onNavigate('organizer')}
                className="bg-primary hover:bg-primary-fixed-variant text-on-primary font-black uppercase tracking-wider text-sm px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Create Your Event <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button 
                onClick={() => onNavigate('attendee')}
                className="glass border-primary/15 hover:border-primary text-primary font-black uppercase tracking-wider text-sm px-8 py-4 rounded-full transition-all cursor-pointer text-center"
              >
                Join as Attendee (Demo)
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-primary/10">
              <span className="flex items-center gap-1.5 text-[10px] text-text-muted uppercase tracking-[0.2em] font-black">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" /> Built on Sui L1
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-text-muted uppercase tracking-[0.2em] font-black">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> zkLogin Protected
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-text-muted uppercase tracking-[0.2em] font-black">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" /> Free for Attendees
              </span>
            </div>
          </div>

          {/* Hero Badge Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[520px]">
            {/* Main Interactive Keepsake Medal */}
            <div className="relative z-20 glass rounded-[2.5rem] p-10 shadow-2xl w-[320px] flex flex-col items-center justify-center text-center space-y-6 border-primary/20 animate-float">
              
              <div className="w-full h-44 flex items-center justify-center overflow-hidden rounded-2xl bg-surface-container-low relative">
                <div className="scale-110">
                  <BadgeViewer 
                    badgeStyle={{
                      shape: 'diamond',
                      color: '#7a564a',
                      accentColor: '#ebbcae',
                      icon: 'Cpu',
                      effect: 'metallic'
                    }} 
                    eventName="Builder Night Lagos"
                    serialNumber="064"
                    isInteractable={false}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-primary/60 text-[10px] tracking-[2.5px] uppercase">
                  SUI OVERFLOW · NIGERIA
                </p>
                <h3 className="serif-title text-on-background text-2xl font-semibold">
                  Builder Night &apos;26
                </h3>
                <p className="font-sans text-xs text-text-muted/70">
                  June 14, 2026 · Yaba, Lagos
                </p>
              </div>

              <div className="w-full pt-1 border-t border-outline-variant/30 flex justify-between items-center text-left">
                <div>
                  <p className="text-[10px] font-bold text-text-muted/40 uppercase">COLLECTOR</p>
                  <p className="text-xs font-semibold text-primary">Adaeze K.</p>
                </div>
                <div className="bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full text-primary font-bold text-[9px] uppercase tracking-wider">
                  ✓ Sui Minted
                </div>
              </div>
            </div>

            {/* Background floating indicators */}
            <div className="absolute top-[8%] left-[2%] z-30 glass p-5 rounded-2xl shadow-xl w-36 h-28 flex flex-col items-center justify-center gap-1 animate-float-delayed border-primary/10">
              <Award className="w-7 h-7 text-primary/60" />
              <span className="font-mono text-[9px] text-text-muted/50 tracking-[1.5px] uppercase">BADGE LEVEL</span>
              <span className="text-xs font-bold text-primary">GOLD BUILDER</span>
            </div>

            <div className="absolute bottom-[10%] right-[-2%] z-10 glass p-4 rounded-2xl shadow-xl w-56 flex items-center gap-3 animate-float border-primary/10">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                AO
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-on-background">Tunde F. checked in</span>
                <span className="text-[10px] text-primary/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow"></span> Just checked in
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Walkthrough Section */}
      <section id="how-it-works" className="py-24 bg-surface-container border-y border-primary/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.25em] font-black text-primary mb-2 flex items-center justify-center gap-2">
              <span className="w-2.5 h-[1.5px] bg-primary"></span> Step-by-step Demo
            </div>
            <h2 className="font-sans text-4xl md:text-5xl font-black text-on-background uppercase tracking-tighter leading-none">
              Watch presence turn into <span className="serif-title italic font-medium normal-case tracking-normal text-primary">influence.</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base font-light">
              We design event check-ins to make memory collection second nature. Setup event in 2 minutes, register, and mint in 4 quick stages.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-surface p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-5 text-left relative overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="absolute top-4 right-4 text-4xl font-serif font-black text-primary/5">01</div>
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="serif-title text-xl font-bold text-on-background">1. Click Link</h4>
              <p className="text-sm text-text-muted/80 leading-relaxed">
                Attendees scan your custom physical event banner, QR code, or open the link on their mobile phones.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-5 text-left relative overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="absolute top-4 right-4 text-4xl font-serif font-black text-primary/5">02</div>
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="serif-title text-xl font-bold text-on-background">2. Social login</h4>
              <p className="text-sm text-text-muted/80 leading-relaxed">
                Connect simple Google profile with zero web3 headaches using secure zkLogin that creates dynamic keys silently.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-5 text-left relative overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="absolute top-4 right-4 text-4xl font-serif font-black text-primary/5">03</div>
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="serif-title text-xl font-bold text-on-background">3. AI recap is born</h4>
              <p className="text-sm text-text-muted/80 leading-relaxed">
                Our Gemini API reads check-in moments, attendee role, and event description to draft an inspiring personalized keepsake story.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-3xl border border-primary/20 shadow-md space-y-5 text-left relative overflow-hidden bg-primary/5 group">
              <div className="absolute top-4 right-4 text-4xl font-serif font-black text-primary/10">04</div>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="serif-title text-xl font-bold text-primary">4. Mint Forever</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                A single click records both the personalized AI memory block and the graphic badge permanently onto the L1 ledger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem/Solution Section */}
      <section id="comparison" className="py-24 bg-background max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="max-w-2xl space-y-4 mb-20 text-left">
          <div className="text-[10px] uppercase tracking-[0.25em] font-black text-text-muted mb-3 flex items-center gap-2">
            <span className="w-2.5 h-[1.5px] bg-primary"></span> The Problem & The Paradigm Shift
          </div>
          <h2 className="font-sans text-4xl lg:text-5xl font-black text-on-background uppercase tracking-tighter leading-[0.95]">
            Events eventually end. <br />
            Presence shouldn&apos;t just <span className="serif-title italic font-medium normal-case tracking-normal text-primary">disappear.</span>
          </h2>
          <p className="text-text-muted text-base font-light pt-2">
            Instead of buried photo albums and missing contact cards, we preserve the professional and emotional progress of your network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Without Column */}
          <div className="space-y-6">
            <div className="font-mono text-xs text-text-muted/50 border-b border-outline-variant pb-4 uppercase tracking-[2.5px] font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Events run without memory architecture
            </div>
            
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 text-text-muted/70 flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm">Photos get locked inside infinite, unnamed camera folders.</p>
              </div>
              <div className="p-6 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 text-text-muted/70 flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm">Connecting with peers relies on napkin social tags and notes that get lost.</p>
              </div>
              <div className="p-6 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 text-text-muted/70 flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm">No digital proof you actually attended or constructed code there.</p>
              </div>
              <div className="p-6 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 text-text-muted/70 flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm">Sponsors get boring emails with Excel lists instead of raw interactive ROI.</p>
              </div>
            </div>
          </div>

          {/* With Column */}
          <div className="space-y-6">
            <div className="font-mono text-xs text-primary/70 border-b border-primary/20 pb-4 uppercase tracking-[2.5px] font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              The Qeepsy standard
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-text-muted flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">Active, tangible memory badge retained in personal digital wallets.</p>
              </div>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-text-muted flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">Your entire attendance path automatically charted into custom AI portfolios.</p>
              </div>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-text-muted flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">Cryptographically verified on-chain proof of build for employers.</p>
              </div>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-text-muted flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">Real-time sponsor viewings; badges dynamically display sponsor artwork.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Use Cases */}
      <section id="use-cases" className="py-24 bg-surface scroll-mt-20 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <div className="text-[10px] uppercase tracking-[0.25em] font-black text-primary mb-2 flex items-center justify-center gap-2">
              <span className="w-2.5 h-[1.5px] bg-primary"></span> Flexible Solutions
            </div>
            <h2 className="font-sans text-4xl font-black text-on-background uppercase tracking-tighter leading-none">
              Built for every kind of <span className="serif-title italic font-medium normal-case tracking-normal text-primary">gathering.</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-sm md:text-base font-light">
              From elite tech hackathons in Lagos to campus forums and community events — anywhere builders assemble.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-10 rounded-[2rem] hover:border-primary/40 transition-all flex flex-col hover:shadow-lg">
              <div className="font-mono text-primary text-xs font-bold tracking-wider mb-2 uppercase">HACKATHONS</div>
              <h3 className="serif-title text-2xl font-semibold text-on-background mb-4">Code Contributes</h3>
              <p className="text-sm text-text-muted/80 leading-relaxed mb-6">
                Record active team creations, verified codebase repositories, smart contract deployments, and technical achievements permanently.
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/20 flex justify-between text-xs font-mono font-bold text-primary">
                <span>✓ Move & Solidity Ready</span>
                <span>✓ Onchain Proof</span>
              </div>
            </div>

            <div className="glass p-10 rounded-[2rem] hover:border-primary/40 transition-all flex flex-col hover:shadow-lg">
              <div className="font-mono text-primary text-xs font-bold tracking-wider mb-2 uppercase">CONF & SUMMITS</div>
              <h3 className="serif-title text-2xl font-semibold text-on-background mb-4">Intimate Roundtables</h3>
              <p className="text-sm text-text-muted/80 leading-relaxed mb-6">
                Engage distinguished key speakers, generate dynamic workshop micro-certificates, and unlock private telegram logs dynamically.
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/20 flex justify-between text-xs font-mono font-bold text-primary">
                <span>✓ Guest Passcards</span>
                <span>✓ High Capacity ready</span>
              </div>
            </div>

            <div className="glass p-10 rounded-[2rem] hover:border-primary/40 transition-all flex flex-col hover:shadow-lg">
              <div className="font-mono text-primary text-xs font-bold tracking-wider mb-2 uppercase">STUDENT CLUBS</div>
              <h3 className="serif-title text-2xl font-semibold text-on-background mb-4">Campus Networks</h3>
              <p className="text-sm text-text-muted/80 leading-relaxed mb-6">
                Perfect for university tech clubs wanting cheap, lightning-fast digital identity storage. No wallet download or credit card needed.
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/20 flex justify-between text-xs font-mono font-bold text-primary">
                <span>✓ zkLogin simplicity</span>
                <span>✓ Student Portfolios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section id="testimonials" className="py-24 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl space-y-4 mb-16 text-left">
            <div className="text-[10px] uppercase tracking-[0.25em] font-black text-text-muted mb-3 flex items-center gap-2">
              <span className="w-2.5 h-[1.5px] bg-primary"></span> Ecosystem Voices
            </div>
            <h2 className="font-sans text-4xl font-black text-on-background uppercase tracking-tighter leading-none">
              What founders & developers <br /><span className="serif-title italic font-medium normal-case tracking-normal text-primary">say.</span>
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x">
            
            <div className="min-w-[325px] md:min-w-[380px] snap-center glass p-10 rounded-3xl flex flex-col justify-between border-primary/5 hover:border-primary/20 transition-all">
              <p className="font-sans italic text-text-muted text-lg leading-relaxed">
                &quot;Absolutely legendary! Finally a setup to record checking into local tech meets that doesn't feel clunky or demand gas instantly. The AI recap summary actually gave my LinkedIn an upgrade.&quot;
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  AK
                </div>
                <div>
                  <h5 className="font-sans font-bold text-on-background text-sm">Adaeze K.</h5>
                  <p className="text-[10px] uppercase font-semibold text-text-muted/50 tracking-wider">Frontend Developer · Lagos</p>
                </div>
              </div>
            </div>

            <div className="min-w-[325px] md:min-w-[380px] snap-center glass p-10 rounded-3xl flex flex-col justify-between border-primary/5 hover:border-primary/20 transition-all">
              <p className="font-sans italic text-text-muted text-lg leading-relaxed">
                &quot;Our campus hackathon set up checkins in 10 minutes. Over 100 students got high fidelity memory cards, sparking extreme social engagement on Twitter.&quot;
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  OM
                </div>
                <div>
                  <h5 className="font-sans font-bold text-on-background text-sm">Obiageli M.</h5>
                  <p className="text-[10px] uppercase font-semibold text-text-muted/50 tracking-wider">Student Lead · Unilag</p>
                </div>
              </div>
            </div>

            <div className="min-w-[325px] md:min-w-[380px] snap-center glass p-10 rounded-3xl flex flex-col justify-between border-primary/5 hover:border-primary/20 transition-all">
              <p className="font-sans italic text-text-muted text-lg leading-relaxed">
                &quot;Sponsors love the detailed analytics from Qeepsy. They can check how many digital wallet impressions occurred instantly. A massive paradigm shift for event monetization.&quot;
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  TF
                </div>
                <div>
                  <h5 className="font-sans font-bold text-on-background text-sm">Tunde F.</h5>
                  <p className="text-[10px] uppercase font-semibold text-text-muted/50 tracking-wider">Smart Contract Builder · Nairobi</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-surface py-24 border-t border-primary/10">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-sans text-4xl md:text-5xl font-black text-on-background uppercase tracking-tighter leading-[0.95]">
            Ready to give your event <br />
            a permanent digital <span className="serif-title italic font-medium normal-case tracking-normal text-primary">footprint?</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm md:text-base font-light">
            Create an organizer workspace or step in as an attendee builder and claim your proof-of-work memories. Interconnection starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => onNavigate('organizer')}
              className="bg-primary hover:bg-primary-fixed-variant text-white font-bold px-8 py-4 rounded-full transition-all shadow-md"
            >
              Enter Organizer Suite
            </button>
            <button
              onClick={() => onNavigate('attendee')}
              className="glass border-outline-variant hover:border-primary text-primary font-semibold px-8 py-4 rounded-full transition-all"
            >
              Review Attendee Wallet
            </button>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-surface-container-low py-16 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-2">
            <span className="font-sans font-black text-2xl tracking-tighter text-on-background uppercase">Qeepsy<span className="text-primary italic font-serif lowercase">.</span></span>
            <p className="text-xs text-text-muted max-w-sm">Every event deserves a legacy. Built for the Sui Overflow Hackathon ecosystem.</p>
          </div>
          <p className="text-xs text-text-muted/40 font-mono">
            © 2026 Qeepsy. All rights reserved. Persistent off-line encryption enabled.
          </p>
        </div>
      </footer>
    </div>
  );
}
