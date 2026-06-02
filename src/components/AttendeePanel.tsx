import React, { useState } from 'react';
import { Sparkles, Award, Wallet, Cpu, Check, ArrowLeft, RefreshCw, Send, CheckCircle, Edit3, Save, User, Globe, FileText, Share2 } from 'lucide-react';
import { Event, Attendee, Badge, AIRecapResult } from '../types';
import BadgeViewer from './BadgeViewer';

interface AttendeePanelProps {
  events: Event[];
  badges: Badge[];
  attendee: Attendee;
  onUpdateAttendee: (updated: Attendee) => void;
  onAddBadge: (newBadge: Badge) => void;
  onNavigate: (view: 'landing' | 'organizer' | 'attendee') => void;
}

export default function AttendeePanel({
  events,
  badges,
  attendee,
  onUpdateAttendee,
  onAddBadge,
  onNavigate
}: AttendeePanelProps) {
  const [activeBadgeId, setActiveBadgeId] = useState<string | null>(badges[0]?.id || null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Edit profile buffer
  const [profileName, setProfileName] = useState(attendee.name);
  const [profileRole, setProfileRole] = useState(attendee.role);
  const [profileBio, setProfileBio] = useState(attendee.bio);

  // Claim checkin logic states
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // AI Story Generation state
  const [selectedMoments, setSelectedMoments] = useState<string[]>([
    "Explored core layer contract structures",
    "Pitched novel dapp design concepts to sponsors"
  ]);
  const [isGeneratingRecap, setIsGeneratingRecap] = useState(false);
  const [aiRecap, setAiRecap] = useState<AIRecapResult | null>(null);

  // Sui Ledger minting state
  const [isMinting, setIsMinting] = useState(false);
  const [mintedSuccess, setMintedSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Available highlights they can select for AI synthesis
  const MOMENT_OPTIONS = [
    "Analyzed gas optimization models for smart contracts",
    "Explored decentralized media assets on Walrus storage",
    "Pitched novel dapp design concepts with Sui designers",
    "Built beautiful SVG client wrappers using Lucide icons",
    "Gave code review on decentralized student loans",
    "Met 4 high-profile blockchain researchers during networking",
    "Explored zkLogin social authentications in student arenas"
  ];

  // Pick active badge or search
  const currentBadge = badges.find(b => b.id === activeBadgeId) || null;

  // Handle Profile Update
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAttendee({
      ...attendee,
      name: profileName,
      role: profileRole,
      bio: profileBio
    });
    setIsEditingProfile(false);
  };

  // Toggle highlight momement selection
  const handleToggleMoment = (moment: string) => {
    setSelectedMoments(prev => 
      prev.includes(moment) 
        ? prev.filter(m => m !== moment) 
        : (prev.length < 3 ? [...prev, moment] : prev) // Limit to max 3
    );
  };

  // Trigger server-side AI Keepsake Generation using Express backend route
  const handleGenerateAIKeepsake = async () => {
    setIsGeneratingRecap(true);
    setAiRecap(null);

    const targetEvent = events.find(e => e.id === selectedEventId) || events[0];

    try {
      const response = await fetch('/api/generate-recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: targetEvent.name,
          eventTagline: targetEvent.tagline,
          eventDescription: targetEvent.description,
          location: targetEvent.location,
          date: targetEvent.date,
          attendeeName: attendee.name,
          attendeeRole: attendee.role,
          attendeeBio: attendee.bio,
          highlights: selectedMoments
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI server");
      }

      const data: AIRecapResult = await response.json();
      setAiRecap(data);
    } catch (err) {
      console.error("Failed generating AI recap: ", err);
      // Failover alert fallback
    } finally {
      setIsGeneratingRecap(false);
    }
  };

  // Trigger Sui On-Chain Ledger Minting Flow
  const handleMintOnSui = () => {
    if (!aiRecap) return;
    setIsMinting(true);

    setTimeout(() => {
      const generatedTx = `0x${Array.from({length:64}, () => Math.floor(Math.random()*16).toString(16)).join('')}`;
      setTxHash(generatedTx);
      setIsMinting(false);
      setMintedSuccess(true);

      const targetEvent = events.find(e => e.id === selectedEventId) || events[0];

      // Add minted Badge to their Wallet
      const newBadge: Badge = {
        id: `badge-minted-${Date.now()}`,
        eventId: targetEvent.id,
        eventName: targetEvent.name,
        eventDate: targetEvent.date,
        eventLocation: targetEvent.location,
        attendeeId: attendee.id,
        ownerName: attendee.name,
        ownerRole: attendee.role,
        badgeStyle: {
          ...targetEvent.badgeStyle,
          // customize badge title based on AI result!
          icon: targetEvent.badgeStyle.icon
        },
        mintedTx: generatedTx,
        mintedAt: new Date().toISOString(),
        serialNumber: `0${targetEvent.checkInCount + 1}`
      };

      onAddBadge(newBadge);
      setActiveBadgeId(newBadge.id);
    }, 2200);
  };

  // Mock share function trigger
  const handleShareTrigger = () => {
    alert("🔗 Keepsake link copied to clipboard! Share on Twitter or Farcaster to showcase your event verified presence.");
  };

  return (
    <div className="min-h-screen bg-background pb-20 selection:bg-primary/20 pt-28">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Header Navigation Tab */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1rem] bg-primary text-on-primary flex items-center justify-center shadow-md">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans text-primary text-[10px] uppercase tracking-[0.25em] font-black block">Attendee Hub</span>
              <h1 className="font-sans text-4xl font-black text-on-background uppercase tracking-tighter leading-none mt-1">Qeepsy Keepsake Wallet</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('landing')}
              className="px-5 py-2.5 rounded-full border border-outline-variant hover:border-primary text-text-muted font-black uppercase tracking-wider text-xs transition-all"
            >
              Back to Home
            </button>
            <button 
              onClick={() => onNavigate('organizer')}
              className="bg-surface border border-outline-variant hover:border-primary text-text-muted font-black uppercase tracking-wider text-xs px-5 py-2.5 rounded-full transition-all shadow-sm"
            >
              Go to Organizer Dashboard
            </button>
          </div>
        </div>

        {/* Multi-Section Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left panel: Attendee Profile Setup and Wallet list */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 1. Attendee Profile Card */}
            <div className="bg-surface border border-outline-variant/30 p-6 rounded-3xl shadow-sm text-left space-y-5">
              <div className="flex justify-between items-start pb-3 border-b border-outline-variant/25">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="font-sans font-black text-sm uppercase tracking-wider text-on-background">My Presence Profile</h3>
                </div>
                {!isEditingProfile && (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="text-primary hover:text-primary-fixed-variant text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted/60 uppercase mb-1">Display Name</label>
                    <input 
                      type="text" 
                      required
                      value={profileName}
                      onChange={e => setProfileName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted/60 uppercase mb-1">Ecosystem Role</label>
                    <input 
                      type="text" 
                      required
                      value={profileRole}
                      onChange={e => setProfileRole(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted/60 uppercase mb-1">Professional Bio / Elevator pitch</label>
                    <textarea 
                      required
                      value={profileBio}
                      onChange={e => setProfileBio(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      className="bg-primary hover:bg-primary-fixed-variant text-white font-bold px-4 py-1.5 rounded-full text-xs flex items-center gap-1 text-center"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-1.5 rounded-full border border-outline-variant text-text-muted text-xs hover:bg-surface-container"
                    >
                      Discard
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                      {attendee.name.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-on-background text-sm">{attendee.name}</h4>
                      <p className="text-xs text-text-muted/60 font-mono">{attendee.email}</p>
                    </div>
                  </div>

                  <p className="inline-block bg-primary/5 border border-primary/20 text-primary font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {attendee.role}
                  </p>

                  <p className="text-xs text-text-muted/80 leading-relaxed bg-surface-container-low/50 p-3 rounded-2xl border border-outline-variant/20 italic">
                    &quot;{attendee.bio}&quot;
                  </p>
                </div>
              )}
            </div>

            {/* 2. Collection Directory */}
            <div className="bg-surface border border-outline-variant/30 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="pb-3 border-b border-outline-variant/25 text-left flex justify-between items-center">
                <div>
                  <h3 className="font-sans font-black text-sm uppercase tracking-wider text-on-background">Collectible Keepsakes</h3>
                  <p className="text-[9px] font-sans text-text-muted/50 uppercase tracking-widest font-black">VERIFIED LEDGER ON-CHAIN</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold">
                  {badges.length} claimed
                </span>
              </div>

              {badges.length === 0 ? (
                <div className="p-8 text-center text-text-muted/40 text-xs border border-dashed border-outline-variant/30 rounded-2xl">
                  No claimed onchain keepsakes. Head to the Claim center on the right to start your journey.
                </div>
              ) : (
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {badges.map((badge) => {
                    const isSelected = activeBadgeId === badge.id;

                    return (
                      <div
                        key={badge.id}
                        onClick={() => {
                          setActiveBadgeId(badge.id);
                          setAiRecap(null); // Reset when viewing claimed to avoid confusing states
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer text-left flex items-center gap-3.5 ${
                          isSelected 
                            ? 'bg-primary/5 border-primary/40 shadow-sm' 
                            : 'bg-surface hover:bg-surface-container/20 border-outline-variant/20'
                        }`}
                      >
                        <div className="w-12 h-12 bg-surface-container-low border border-outline-variant/20 rounded-xl flex items-center justify-center shrink-0">
                          {/* Nano icon representation of style */}
                          <div className="scale-50">
                            <BadgeViewer 
                              badgeStyle={badge.badgeStyle}
                              eventName={badge.eventName}
                              isInteractable={false}
                              size="sm"
                            />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-bold text-on-background line-clamp-1">{badge.eventName}</h4>
                          <p className="text-[10px] text-text-muted/50 font-mono truncate">#SUI-QE-{badge.serialNumber}</p>
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className="text-primary font-bold">✓ Verified Blocked</span>
                            <span className="text-text-muted/30">{badge.eventDate}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Claim Keepsake generator space */}
          <div className="lg:col-span-8">
            <div className="bg-surface border border-outline-variant/30 rounded-[2.5rem] p-8 card-shadow space-y-8 min-h-[580px]">
              
              {/* Dynamic Action Mode Selection */}
              <div className="flex border-b border-outline-variant/20 pb-4 justify-between items-center">
                <div className="flex gap-6">
                  <button 
                    onClick={() => {
                      setActiveBadgeId(null);
                      setAiRecap(null);
                      setMintedSuccess(false);
                    }}
                    className={`pb-2 text-sm font-semibold border-b-2 transition-all ${
                      activeBadgeId === null 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-text-muted/65 hover:text-primary'
                    }`}
                  >
                    Claim New Keepsake
                  </button>
                  {badges.length > 0 && (
                    <button 
                      onClick={() => {
                        if (badges[0]) {
                          setActiveBadgeId(badges[0].id);
                          setAiRecap(null);
                        }
                      }}
                      className={`pb-2 text-sm font-semibold border-b-2 transition-all ${
                        activeBadgeId !== null 
                          ? 'border-primary text-primary' 
                          : 'border-transparent text-text-muted/65 hover:text-primary'
                      }`}
                    >
                      Inspect Claimed Keepsakes
                    </button>
                  )}
                </div>

                <span className="font-mono text-[9px] text-text-muted/40 uppercase tracking-widest bg-surface-container px-3 py-1 rounded-full">
                  zkLogin Authenticated
                </span>
              </div>

              {/* Mode A: Inspect Claimed Keepsakes */}
              {activeBadgeId !== null && currentBadge ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left animate-float-short">
                  
                  {/* Badge Viewer Graphic */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-3xl border border-outline-variant/20 relative">
                    <span className="absolute top-3 left-4 font-mono text-[9px] border border-outline-variant/30 rounded-full px-2.5 py-0.5 text-text-muted/50 uppercase">
                      SECURED KEEP
                    </span>
                    <div className="scale-100 py-6">
                      <BadgeViewer 
                        badgeStyle={currentBadge.badgeStyle}
                        eventName={currentBadge.eventName}
                        serialNumber={currentBadge.serialNumber}
                        isInteractable={true}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 font-bold tracking-widest uppercase">
                      ✓ PERMANENT LEDGER SYNCED
                    </span>
                  </div>

                  {/* Metadata and claims details */}
                  <div className="md:col-span-7 space-y-5">
                    <div className="space-y-2">
                      <span className="bg-primary/5 border border-primary/25 px-2.5 py-1 rounded-full text-primary font-mono text-[9px] font-black uppercase tracking-widest">
                        {currentBadge.eventDate}
                      </span>
                      <h2 className="font-sans text-3xl font-black text-on-background uppercase tracking-tight leading-tight">{currentBadge.eventName}</h2>
                      <p className="text-xs text-text-muted/60">{currentBadge.eventLocation}</p>
                    </div>

                    <div className="bg-surface-container-low p-4 rounded-2xl space-y-3.5 border border-outline-variant/20 text-xs">
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span className="text-text-muted/50 font-bold uppercase text-[9px]">COLLECTOR</span>
                        <span className="font-bold text-primary">{currentBadge.ownerName} ({currentBadge.ownerRole})</span>
                      </div>
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span className="text-text-muted/50 font-bold uppercase text-[9px]">SUI SERIAL</span>
                        <span className="font-mono text-on-background font-bold">#SUI-QE-{currentBadge.serialNumber}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-text-muted/50 font-bold uppercase text-[9px]">METADATA TRANSACTION BLOCK</span>
                        <span className="font-mono text-[10px] text-emerald-600 break-all select-all font-bold p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                          {currentBadge.mintedTx || "Not Available"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={handleShareTrigger}
                        className="flex-1 bg-primary hover:bg-primary-fixed-variant text-white font-bold py-3 px-6 rounded-full text-xs flex justify-center items-center gap-2 shadow-sm transition-all"
                      >
                        <Share2 className="w-4 h-4" /> Share Legacy Card
                      </button>
                      
                      <button 
                        onClick={() => {
                          setAiRecap(null);
                          setActiveBadgeId(null);
                        }}
                        className="px-6 py-3 rounded-full border border-outline text-text-muted hover:border-primary font-bold text-xs"
                      >
                        Claim Another
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                
                // Mode B: Claim Keepsakes Center (Interactive AI Recapper)
                <div className="space-y-8 text-left animate-float-short">
                  
                  {/* Select target Event */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div>
                      <label className="block text-[10px] font-bold text-text-muted/60 uppercase mb-2">
                        CHOOSE ATTENDED EVENT
                      </label>
                      <select 
                        value={selectedEventId}
                        onChange={e => {
                          setSelectedEventId(e.target.value);
                          setAiRecap(null);
                          setMintedSuccess(false);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                      >
                        {events.map(ev => (
                          <option key={ev.id} value={ev.id}>{ev.name} ({ev.location})</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 text-xs flex justify-between items-center bg-primary/2">
                      <span className="text-text-muted text-[11px]">Event Date: <b className="text-primary font-bold">{(events.find(e => e.id === selectedEventId) || events[0])?.date}</b></span>
                      <span className="font-bold text-emerald-600">✓ Eligible for Badge claim</span>
                    </div>
                  </div>

                  {/* Highlights picker checklist */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-text-muted/60 uppercase">
                      SELECT 1-3 ATTENDANCE HIGHLIGHTS TO EMBED IN STORY
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {MOMENT_OPTIONS.map((opt, idx) => {
                        const isSelected = selectedMoments.includes(opt);
                        return (
                          <div 
                            key={idx}
                            onClick={() => handleToggleMoment(opt)}
                            className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-start gap-2.5 transition-all select-none ${
                              isSelected 
                                ? 'bg-primary/5 border-primary/40 shadow-sm font-semibold' 
                                : 'bg-surface hover:bg-surface-container/20 border-outline-variant/15'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? 'bg-primary border-primary text-white' : 'border-outline-variant'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="text-on-background/80 leading-relaxed">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-text-muted/40 block">Max 3 options. Our Gemini AI engine will parse these to build your personalized narrative card.</span>
                  </div>

                  {/* Generate Trigger block */}
                  {!aiRecap && !mintedSuccess && (
                    <div className="pt-4 flex justify-center">
                      <button 
                        onClick={handleGenerateAIKeepsake}
                        disabled={isGeneratingRecap || selectedMoments.length === 0}
                        className="bg-primary hover:bg-primary-fixed-variant disabled:bg-primary/40 text-white font-bold py-4 px-10 rounded-full text-sm flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        {isGeneratingRecap ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Personalized AI Story...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 animate-pulse" /> Launch AI Keepsake Synthesis (Gemini Engine)
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Display Synthesized AI Keepsake & Sui publisher console */}
                  {aiRecap && (
                    <div className="space-y-6 pt-4 border-t border-outline-variant/25 animate-float-short">
                      
                      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-primary/25 pb-3">
                          <div className="flex items-center gap-1.5 text-primary">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <h3 className="font-sans font-black text-lg uppercase tracking-tight text-on-background">My Generative AI Memory Card</h3>
                          </div>
                          <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest">
                            {aiRecap.badgeTitle}
                          </span>
                        </div>

                        <div className="space-y-4 text-sm leading-relaxed text-text-muted/80">
                          <p>{aiRecap.story}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                              <span className="block text-[10px] font-bold text-text-muted/50 uppercase mb-1">Key Experience Points</span>
                              <ul className="space-y-1">
                                {aiRecap.highlights.map((h, i) => (
                                  <li key={i} className="text-xs flex items-center gap-2 text-on-background">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {h}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold text-text-muted/50 uppercase mb-1">Networking Merges</span>
                              <ul className="space-y-1">
                                {aiRecap.keyConnections.map((c, i) => (
                                  <li key={i} className="text-xs flex items-center gap-2 text-on-background">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-between items-center text-xs">
                            <div>
                              <span className="block text-[10px] font-bold text-text-muted/50 uppercase mb-1">Demonstrated Capacities</span>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {aiRecap.skillsProven.map((s, i) => (
                                  <span key={i} className="bg-surface border border-outline-variant/30 text-text-muted px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right italic font-serif text-primary/75 max-w-[250px]">
                              &ldquo;{aiRecap.quote}&rdquo;
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* On-Chain Sui Console */}
                      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 space-y-4 font-mono select-none relative overflow-hidden flex flex-col justify-between border border-slate-800">
                        <div className="absolute top-0 right-0 p-4 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold tracking-widest uppercase rounded-bl-xl border-l border-b border-emerald-500/20">
                          MINT_CENTRAL
                        </div>

                        <div className="space-y-1 text-xs">
                          <p className="text-slate-400">&gt; INITIALIZING SUI CRYPTO LEDGER CLIENT...</p>
                          <p className="text-slate-300">&gt; zkLogin Public Key: <b className="text-slate-100">sui-zk-login-sec-0x9219ea</b></p>
                          <p className="text-slate-300">&gt; Target Payload: <b className="text-indigo-400">Metadata block memory structure // serialize</b></p>
                          <p className="text-slate-300">&gt; Gas Limit Fee estimate: <b className="text-emerald-400">~ 0.0028 SUI</b></p>
                        </div>

                        {isMinting ? (
                          <div className="py-2 flex items-center justify-center gap-2 text-primary font-bold animate-pulse text-amber-500 text-xs">
                            <RefreshCw className="w-4 h-4 animate-spin" /> WRITING VERIFIED BLOCKS, SYNCING WALRUS METADATA...
                          </div>
                        ) : mintedSuccess ? (
                          <div className="bg-emerald-900/40 border border-emerald-800/10 p-3 rounded-xl text-[11px] space-y-1 text-emerald-400 text-left">
                            <p className="font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> SUCCESS: DIGITAL KEEPSAKE MINTED WITH PERSISTENT STATUS</p>
                            <p className="break-all">Ledger TX: {txHash}</p>
                          </div>
                        ) : (
                          <div className="pt-2 flex justify-center">
                            <button 
                              onClick={handleMintOnSui}
                              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-3 rounded-full text-xs flex items-center gap-1.5 transition-all shadow-md"
                            >
                              <Send className="w-3.5 h-3.5" /> Deploy & Mint Keepsake on Sui Layer-1
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {mintedSuccess && (
                    <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-float-short">
                      <div className="w-14 h-14 bg-emerald-500 text-neutral-900 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle className="w-8 h-8 font-black text-[#DFFF00]" />
                      </div>
                      <h3 className="font-sans text-2xl font-black text-emerald-950 uppercase tracking-tight">Keepsake Created Permanently!</h3>
                      <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                        Your attendee badge, personalized AI history resume, and network connections metadata block have been stamped together in the Sui ledger.
                      </p>
                      <button 
                        onClick={() => {
                          setAiRecap(null);
                          setMintedSuccess(false);
                          setActiveBadgeId(badges[badges.length - 1]?.id || null);
                        }}
                        className="bg-primary text-white font-bold text-xs px-6 py-2 rounded-full hover:bg-primary-fixed-variant"
                      >
                        Inspect My New Badge In Wallet
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
