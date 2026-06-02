import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar, MapPin, Users, Award, Ticket, Check, RefreshCw, BarChart2, Shield, Heart, Radio, Sparkles, Trash2 } from 'lucide-react';
import { Event, Attendee, CheckIn } from '../types';
import BadgeViewer from './BadgeViewer';

interface OrganizerPanelProps {
  events: Event[];
  onAddEvent: (newEvent: Event) => void;
  onDeleteEvent: (eventId: string) => void;
  onNavigate: (view: 'landing' | 'organizer' | 'attendee') => void;
}

export default function OrganizerPanel({
  events,
  onAddEvent,
  onDeleteEvent,
  onNavigate
}: OrganizerPanelProps) {
  const [activeEventId, setActiveEventId] = useState<string>(events[0]?.id || '');
  const [isCreating, setIsCreating] = useState(false);

  // Form States for New Event
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState(100);
  const [sponsorName, setSponsorName] = useState('');
  const [logoType, setLogoType] = useState<'sui' | 'walrus' | 'zklogin' | 'custom'>('custom');

  // Badge States for New Event
  const [badgeShape, setBadgeShape] = useState<'circle' | 'hexagon' | 'shield' | 'star' | 'diamond'>('circle');
  const [badgeColor, setBadgeColor] = useState('#7a564a');
  const [badgeAccent, setBadgeAccent] = useState('#ebbcae');
  const [badgeIcon, setBadgeIcon] = useState('Cpu');
  const [badgeEffect, setBadgeEffect] = useState<'glow' | 'metallic' | 'holographic' | 'classic'>('classic');

  // Scanner Simulator States
  const [scanName, setScanName] = useState('');
  const [scanRole, setScanRole] = useState('Web3 Architect');
  const [scanBio, setScanBio] = useState('Move contractor developing protocol endpoints.');
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Active checked in feeds (simulate real-time websocket check-ins)
  const [checkedInFeeds, setCheckedInFeeds] = useState<{
    id: string;
    name: string;
    role: string;
    time: string;
    ticketCode: string;
  }[]>([
    { id: 'feed-1', name: 'Tunde F.', role: 'Sui Moves Engineer', time: '10 mins ago', ticketCode: 'TKT-SUI-883' },
    { id: 'feed-2', name: 'Obiageli M.', role: 'Campus Lead', time: '28 mins ago', ticketCode: 'TKT-UNILAG-142' },
    { id: 'feed-3', name: 'Bolu C.', role: 'Full-Stack generalist', time: '45 mins ago', ticketCode: 'TKT-SUI-029' }
  ]);

  const activeEvent = events.find(e => e.id === activeEventId) || events[0];

  useEffect(() => {
    if (activeEvent && !activeEventId) {
      setActiveEventId(activeEvent.id);
    }
  }, [events, activeEvent, activeEventId]);

  // Handle Event Creation Submit
  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !date) return;

    const newEvent: Event = {
      id: `event-${Date.now()}`,
      name,
      tagline: tagline || "A premium memory keepsake by Qeepsy",
      description: description || "Join us to assemble, network with leaders, and secure your verifiable attendance digital keepsake.",
      location,
      date,
      capacity: Number(capacity),
      checkInCount: 0,
      organizerName: "Ecosystem Builder Workspace",
      badgeStyle: {
        shape: badgeShape,
        color: badgeColor,
        accentColor: badgeAccent,
        icon: badgeIcon,
        effect: badgeEffect
      },
      sponsor: {
        name: sponsorName || "Qeepsy Foundation",
        logoType,
        impressionCount: 0
      }
    };

    onAddEvent(newEvent);
    setActiveEventId(newEvent.id);
    setIsCreating(false);

    // Reset Form
    setName('');
    setTagline('');
    setDescription('');
    setLocation('');
    setDate('');
    setCapacity(100);
    setSponsorName('');
    setLogoType('custom');
  };

  // Run Scanner Simulation
  const handleMockCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanName || isScanning) return;

    setIsScanning(true);
    setScanSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);

      // Append attendee to simulated live feed
      const newFeed = {
        id: `feed-${Date.now()}`,
        name: scanName,
        role: scanRole,
        time: 'Just now',
        ticketCode: `TKT-${activeEvent.id.toUpperCase().substring(0,6)}-${Math.floor(Math.random() * 900) + 100}`
      };

      setCheckedInFeeds(prev => [newFeed, ...prev]);

      // Update the attendance count of the active event
      if (activeEvent) {
        activeEvent.checkInCount = Math.min(activeEvent.checkInCount + 1, activeEvent.capacity);
        activeEvent.sponsor.impressionCount += 3; // adding sponsor views
      }

      setScanName('');
    }, 1500);
  };

  // Auto trigger random attendee check-in to simulate active websocket
  const handleAddRandomMock = () => {
    const names = ["Amara O.", "Sani B.", "Chioma J.", "Emeka D.", "Kofi Y.", "Farah H."];
    const roles = ["Protocol Researcher", "Smart Contract Auditor", "Walrus Designer", "Ecosystem Evangelist"];
    const quotes = ["Laying decentralised nodes", "Curating smart templates", "Building decentralized identity layer"];

    const rName = names[Math.floor(Math.random() * names.length)];
    const rRole = roles[Math.floor(Math.random() * roles.length)];
    
    const newFeed = {
      id: `feed-auto-${Date.now()}`,
      name: rName,
      role: rRole,
      time: 'Just now',
      ticketCode: `TKT-${activeEvent.id.toUpperCase().substring(0,6)}-${Math.floor(Math.random() * 900) + 100}`
    };

    setCheckedInFeeds(prev => [newFeed, ...prev]);
    if (activeEvent) {
      activeEvent.checkInCount = Math.min(activeEvent.checkInCount + 1, activeEvent.capacity);
      activeEvent.sponsor.impressionCount += 2;
    }
  };

  // Custom styling elements representing sponsors
  const getSponsorLogoPath = (type: string) => {
    // Elegant text badges to prevent missing assets
    switch (type) {
      case 'sui': return { text: 'Sui Network', color: 'bg-cyan-500 text-white' };
      case 'walrus': return { text: 'Walrus Storage', color: 'bg-sky-600 text-white' };
      case 'zklogin': return { text: 'zkLogin Sec', color: 'bg-indigo-600 text-white' };
      default: return { text: 'SpinWave Sound', color: 'bg-amber-600 text-white' };
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 selection:bg-primary/20 pt-28">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Header Header Navigation Tab */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-primary/10">
          <div>
            <span className="font-sans text-primary text-[10px] uppercase tracking-[0.25em] font-black">
              Organizer Panel
            </span>
            <h1 className="font-sans text-4xl font-black text-on-background uppercase tracking-tighter leading-none mt-1">
              Event Management Studio
            </h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('landing')}
              className="px-5 py-2.5 rounded-full border border-outline-variant hover:border-primary text-text-muted font-black uppercase tracking-wider text-xs transition-with-glow"
            >
              Back to Home
            </button>
            <button 
              onClick={() => setIsCreating(true)}
              className="bg-primary hover:bg-primary-fixed-variant text-on-primary font-black uppercase tracking-wider text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> New Event
            </button>
          </div>
        </div>

        {/* Dashboard Stat Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface p-6 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between">
            <span className="font-mono text-text-muted/50 text-[10px] uppercase font-bold tracking-wider block mb-2">Active Events</span>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-extrabold text-on-background">{events.length}</span>
              <Calendar className="w-8 h-8 text-primary/30" />
            </div>
            <span className="text-[10px] text-primary mt-2">All initialized & checked</span>
          </div>

          <div className="bg-surface p-6 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between">
            <span className="font-mono text-text-muted/50 text-[10px] uppercase font-bold tracking-wider block mb-2">Sponsor Impressions</span>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-extrabold text-on-background">
                {events.reduce((sum, e) => sum + (e.sponsor?.impressionCount || 0), 0)}
              </span>
              <RefreshCw className="w-8 h-8 text-indigo-500/30 animate-spin-slow" />
            </div>
            <span className="text-[10px] text-emerald-600 mt-2">✓ Dynamic badge impressions</span>
          </div>

          <div className="bg-surface p-6 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between">
            <span className="font-mono text-text-muted/50 text-[10px] uppercase font-bold tracking-wider block mb-2">Verified Attendance</span>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-extrabold text-on-background">
                {events.reduce((sum, e) => sum + e.checkInCount, 0)}
              </span>
              <Ticket className="w-8 h-8 text-emerald-500/30" />
            </div>
            <span className="text-[10px] text-indigo-600 mt-2">Average 78% checked in</span>
          </div>

          <div className="bg-surface p-6 rounded-3xl border border-outline-variant/30 card-shadow flex flex-col justify-between">
            <span className="font-mono text-text-muted/50 text-[10px] uppercase font-bold tracking-wider block mb-2">zkLogin Active Keys</span>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-extrabold text-on-background">84</span>
              <Shield className="w-8 h-8 text-amber-500/30" />
            </div>
            <span className="text-[10px] text-amber-600 mt-2">Zero central database leaks</span>
          </div>
        </div>

        {/* Create Event Modal Dialog */}
        {isCreating && (
          <div className="fixed inset-0 bg-dark-glass/55 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-surface border border-primary/20 p-8 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl space-y-8 animate-float-short">
              
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="font-sans text-2xl font-black text-on-background uppercase tracking-tight">Configure New Event</h2>
                </div>
                <button 
                  onClick={() => setIsCreating(false)}
                  className="w-10 h-10 rounded-full border border-outline-variant hover:bg-surface-container flex items-center justify-center font-bold text-lg text-text-muted"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateEventSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* Information Side */}
                <div className="space-y-5">
                  <h3 className="font-mono text-xs uppercase text-primary/70 tracking-widest font-bold">Event Credentials</h3>
                  <div>
                    <label className="block text-xs font-bold text-text-muted/80 mb-1">Event Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Sui Developer Retreat Yaba" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted/80 mb-1">Aesthetic Tagline</label>
                    <input 
                      type="text" 
                      placeholder="e.g., The sound layer of modular contracts" 
                      value={tagline}
                      onChange={e => setTagline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-1">Date *</label>
                      <input 
                        type="date" 
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-1">Max Capacity</label>
                      <input 
                        type="number" 
                        value={capacity}
                        onChange={e => setCapacity(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted/80 mb-1">Physical Location *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Hard Rock Cafe, Lagos" 
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted/80 mb-1">Detailed Description</label>
                    <textarea 
                      placeholder="Discuss workshops, key developers, rules, onchain verification levels..." 
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                {/* Badge Design Side */}
                <div className="space-y-6">
                  <h3 className="font-mono text-xs uppercase text-primary/70 tracking-widest font-bold">On-chain Badge Configurator</h3>
                  
                  {/* Badge Preview box */}
                  <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center justify-center relative">
                    <span className="absolute top-2 left-4 font-mono text-[9px] text-text-muted/40 uppercase tracking-widest">LIVE MOCKUP PREVIEW</span>
                    <div className="scale-90">
                      <BadgeViewer 
                        badgeStyle={{
                          shape: badgeShape,
                          color: badgeColor,
                          accentColor: badgeAccent,
                          icon: badgeIcon,
                          effect: badgeEffect
                        }}
                        eventName={name || "Retreat &apos;26"}
                        isInteractable={false}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-1">Badge Medal Shape</label>
                      <select 
                        value={badgeShape} 
                        onChange={e => setBadgeShape(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                      >
                        <option value="circle">Circle Shield</option>
                        <option value="hexagon">Hexagon Shell</option>
                        <option value="shield">Legacy Shield</option>
                        <option value="star">Fandom Star</option>
                        <option value="diamond">Golden Diamond</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-1">Sponsor Technology</label>
                      <select 
                        value={logoType} 
                        onChange={e => setLogoType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                      >
                        <option value="sui">Sui Ecosystem</option>
                        <option value="walrus">Walrus protocol</option>
                        <option value="zklogin">zkLogin Auth</option>
                        <option value="custom">Custom brand</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-1">Internal Icon</label>
                      <select 
                        value={badgeIcon} 
                        onChange={e => setBadgeIcon(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                      >
                        <option value="Cpu">Cpu Chipset</option>
                        <option value="HardDrive">HardDrive Block</option>
                        <option value="Award">Award Shield</option>
                        <option value="Music">Soundwave</option>
                        <option value="Globe">Global Node</option>
                        <option value="Sparkles">Creative Spark</option>
                        <option value="Zap">Instant Speed</option>
                        <option value="Terminal">Terminal Console</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-1">Interactive Shader Effect</label>
                      <select 
                        value={badgeEffect} 
                        onChange={e => setBadgeEffect(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-outline-variant bg-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                      >
                        <option value="classic">Standard Earthy</option>
                        <option value="glow">Pulsing Glow</option>
                        <option value="metallic">Shining Gold Metallic</option>
                        <option value="holographic">Chroma Holographic</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-2">Base Hue Color</label>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="color" 
                          value={badgeColor}
                          onChange={e => setBadgeColor(e.target.value)}
                          className="w-10 h-10 border-0 outline-none cursor-pointer rounded-lg bg-transparent"
                        />
                        <span className="font-mono text-xs">{badgeColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-muted/80 mb-2">Accent Highlight Hue</label>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="color" 
                          value={badgeAccent}
                          onChange={e => setBadgeAccent(e.target.value)}
                          className="w-10 h-10 border-0 outline-none cursor-pointer rounded-lg bg-transparent"
                        />
                        <span className="font-mono text-xs">{badgeAccent}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted/80 mb-1">Sponsor Entity Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Sui Foundation" 
                      value={sponsorName}
                      onChange={e => setSponsorName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-outline-variant/30 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="font-semibold text-sm px-6 py-2.5 rounded-full border border-outline hover:border-primary text-text-muted transition-all"
                  >
                    Discard Configuration
                  </button>
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary-fixed-variant text-white font-bold px-8 py-2.5 rounded-full text-sm shadow-md transition-all cursor-pointer"
                  >
                    Deploy Event to On-Chain System
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Master Active Event Context Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Navigation: Events Directory */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface border border-outline-variant/30 p-6 rounded-3xl h-[610px] flex flex-col">
              <div className="pb-4 border-b border-outline-variant/30 mb-4 text-left">
                <h3 className="font-sans font-black text-lg text-on-background uppercase tracking-tight">Events Catalog</h3>
                <p className="text-[10px] text-text-muted/50 tracking-[0.15em] font-sans font-black">SELECT TO ACCESS DIAGNOSTIC PANEL</p>
              </div>

              {/* Events Lists */}
              <div className="space-y-3.5 overflow-y-auto flex-1 h-[450px] pr-2 text-left">
                {events.map((event) => {
                  const isSelected = event.id === activeEventId;
                  const percent = Math.round((event.checkInCount / event.capacity) * 100);

                  return (
                    <div 
                      key={event.id}
                      onClick={() => setActiveEventId(event.id)}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                        isSelected 
                          ? 'bg-primary/5 border-primary/40 shadow-sm' 
                          : 'bg-surface hover:bg-surface-container/30 border-outline-variant/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-on-background line-clamp-1">{event.name}</h4>
                        {events.length > 2 && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteEvent(event.id);
                            }}
                            className="text-text-muted/30 hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 rounded-md"
                            title="Delete event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-text-muted/60 flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0 text-primary/40" /> {event.location}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-4">
                        <div className="flex-1 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] font-bold text-primary whitespace-nowrap">
                          {event.checkInCount} / {event.capacity} ({percent}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Area: Event Diagnostic & Simulation panels */}
          <div className="lg:col-span-8 space-y-8">
            {activeEvent ? (
              <div className="space-y-8 text-left">

                {/* Event Core Summary Card */}
                <div className="bg-surface border border-outline-variant/35 rounded-[2.5rem] p-8 card-shadow grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-primary font-mono text-[10px] font-bold uppercase tracking-wider">
                        {activeEvent.date}
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold">
                        Capacity: {activeEvent.capacity}
                      </span>
                    </div>

                    <h2 className="font-sans text-3xl font-black text-on-background uppercase tracking-tighter">{activeEvent.name}</h2>
                    <p className="text-sm italic text-text-muted/80">{activeEvent.tagline}</p>
                    <p className="text-sm text-text-muted/70 leading-relaxed max-w-xl">{activeEvent.description}</p>
                    
                    <div className="flex gap-4 pt-2 text-xs">
                      <span className="flex items-center gap-1 font-semibold text-text-muted/60">
                        <MapPin className="w-4 h-4 text-primary/50" /> {activeEvent.location}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-text-muted/60">
                        <Users className="w-4 h-4 text-primary/50" /> {activeEvent.checkInCount} registered checks
                      </span>
                    </div>
                  </div>

                  {/* Badge Style Viewer */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center pt-4 md:pt-0">
                    <div className="relative p-6 glass border border-primary/10 rounded-2xl flex flex-col items-center">
                      <BadgeViewer 
                        badgeStyle={activeEvent.badgeStyle}
                        eventName={activeEvent.name}
                        serialNumber="ACTIVE"
                        isInteractable={true}
                      />
                      <span className="font-mono text-[9px] text-text-muted/40 uppercase tracking-widest mt-2 block">
                        METALLIC MULTI-SURFACE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lower grid: Mock Scan station PLUS Checked-in Feed */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Mock RFID / QR check-in post */}
                  <div className="bg-surface border border-outline-variant/30 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                      <div className="flex items-center gap-1.5">
                        <Radio className="w-5 h-5 text-primary animate-pulse" />
                        <h3 className="font-sans font-black text-sm text-on-background uppercase tracking-wider">Live RFID Check-In Post</h3>
                      </div>
                      <span className="bg-primary/10 rounded-full px-2 py-0.5 text-[9px] font-mono text-primary uppercase tracking-widest font-bold">STATION_ONLINE</span>
                    </div>

                    <p className="text-xs text-text-muted/70">
                      Simulate a hardware checkpoint check-in. Fill names and roles, and click check-in. The checked-in counter and sponsor impressions will rise live.
                    </p>

                    <form onSubmit={handleMockCheckInSubmit} className="space-y-4 text-left">
                      <div>
                        <label className="block text-[10px] font-bold text-text-muted/60 uppercase mb-1">Developer Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g., Kelechi Onyekwelu" 
                          value={scanName}
                          onChange={e => setScanName(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-text-muted/60 uppercase mb-1">Specialized Tech Role</label>
                        <select 
                          value={scanRole}
                          onChange={e => setScanRole(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        >
                          <option value="Sui move Architect">Sui Move Architect</option>
                          <option value="zkLogin Advisor">zkLogin Security Architect</option>
                          <option value="Frontend Alchemist">Frontend Alchemist</option>
                          <option value="Ecosystem VC Delegate">Ecosystem VC Delegate</option>
                          <option value="Student Builder Guild">Student Builder Guild</option>
                        </select>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button 
                          type="submit"
                          disabled={isScanning}
                          className="flex-1 bg-primary hover:bg-primary-fixed-variant text-white font-bold p-2.5 rounded-full text-xs flex justify-center items-center gap-1.5 transition-all outline-none"
                        >
                          {isScanning ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Scanning Ticket NFC...
                            </>
                          ) : (
                            <>
                              <Ticket className="w-3.5 h-3.5" /> Tap Mock Ticket
                            </>
                          )}
                        </button>
                        
                        <button 
                          type="button"
                          onClick={handleAddRandomMock}
                          className="px-3 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/5 font-semibold text-xs transition-colors"
                          title="Auto trigger generic check-in"
                        >
                          + Auto Check
                        </button>
                      </div>

                      {scanSuccess && (
                        <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 animate-float-short text-xs font-semibold">
                          <Check className="w-4 h-4 text-emerald-600 font-black shrink-0" /> Checked-in safely! Sui badge minted.
                        </div>
                      )}
                    </form>
                  </div>

                  {/* Checked-In Attendee Feed */}
                  <div className="bg-surface border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col h-[350px]">
                    <div className="pb-3 border-b border-outline-variant/30 mb-4 flex justify-between items-center">
                      <h3 className="font-sans font-black text-sm text-on-background uppercase tracking-wider">Attendance Gate Log</h3>
                      <span className="font-mono text-[9px] text-text-muted/50 uppercase font-semibold">Checked ({activeEvent.checkInCount})</span>
                    </div>

                    <div className="space-y-3.5 overflow-y-auto flex-1 h-[270px] pr-1">
                      {checkedInFeeds.map((feed) => (
                        <div key={feed.id} className="flex gap-4 items-start p-2 rounded-xl border border-transparent hover:border-outline-variant/20 transition-all">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                            {feed.name.substring(0, 2)}
                          </div>
                          <div className="flex-1 text-xs space-y-0.5">
                            <div className="flex justify-between">
                              <span className="font-bold text-on-background">{feed.name}</span>
                              <span className="text-[10px] text-text-muted/40 font-mono">{feed.time}</span>
                            </div>
                            <p className="text-text-muted/60">{feed.role}</p>
                            <p className="text-[10px] text-primary font-mono">{feed.ticketCode}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="p-20 text-center text-text-muted/50 border border-dashed border-outline-variant/40 rounded-3xl">
                Please add or select an event to administer it.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
