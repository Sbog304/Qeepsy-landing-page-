import { Event, Attendee, Badge } from '../types';

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'sui-overflow-lagos',
    name: "Sui Overflow Lagos Builder Night '26",
    tagline: "Every event deserves a legacy",
    description: "The official premium builder afterhours for Sui Overflow Lagos Hackathon contestants. Mingle with elite web3 developers, pitch sponsors, and claim your exclusive onchain attendance keepsake.",
    location: "Yaba, Lagos, Nigeria",
    date: "2026-06-14",
    capacity: 100,
    checkInCount: 64,
    organizerName: "Sui West Africa",
    badgeStyle: {
      shape: 'diamond',
      color: '#7a564a',
      accentColor: '#ebbcae',
      icon: 'Cpu',
      effect: 'metallic'
    },
    sponsor: {
      name: "Sui Foundation",
      logoType: "sui",
      description: "Secure, powerful, and blazing-fast layer-1 smart contract platform.",
      impressionCount: 142
    }
  },
  {
    id: 'nairobi-summit',
    name: "Nairobi Web3 Core Summit",
    tagline: "East Africa's decentralized frontier",
    description: "An intimate gathering of researchers, developers, and founders expanding the boundary of decentralized storage and protocol scaling in East Africa.",
    location: "Kilimani, Nairobi, Kenya",
    date: "2026-07-02",
    capacity: 150,
    checkInCount: 42,
    organizerName: "African Protocol Lab",
    badgeStyle: {
      shape: 'hexagon',
      color: '#1a3a4b',
      accentColor: '#4fcdff',
      icon: 'HardDrive',
      effect: 'holographic'
    },
    sponsor: {
      name: "Walrus Protocol",
      logoType: "walrus",
      description: "Decentralized storage layer designed for instant media availability.",
      impressionCount: 98
    }
  },
  {
    id: 'unilag-hacker-arena',
    name: "Unilag Student Hacker Arena",
    tagline: "Unleashing university build power",
    description: "University of Lagos student developers building applications for local retail, agricultural tech, and student loans on-chain.",
    location: "Jelili Adebisi Hall, Unilag",
    date: "2026-08-18",
    capacity: 200,
    checkInCount: 119,
    organizerName: "Unilag Tech Hub",
    badgeStyle: {
      shape: 'shield',
      color: '#1e3a1e',
      accentColor: '#4fff4f',
      icon: 'Award',
      effect: 'glow'
    },
    sponsor: {
      name: "zkLogin Auth",
      logoType: "zklogin",
      description: "Web2 social identity credentials converted server-side into non-custodial wallets.",
      impressionCount: 204
    }
  },
  {
    id: 'afrobeats-nite-vi',
    name: "Afrobeats Nite VI",
    tagline: "Rhythm meets the decentralized network",
    description: "Premium sound experience with emerging Nigerian producers and audio visualizers. Fans claim exclusive collectibles as proof of sound experience.",
    location: "Hard Rock Cafe, Lagos",
    date: "2026-09-05",
    capacity: 300,
    checkInCount: 152,
    organizerName: "SoundLegacy Labs",
    badgeStyle: {
      shape: 'star',
      color: '#4a154b',
      accentColor: '#ff7bf1',
      icon: 'Music',
      effect: 'classic'
    },
    sponsor: {
      name: "SpinWave Sound",
      logoType: "custom",
      description: "Sponsor of the immersive spatial music ecosystem.",
      impressionCount: 310
    }
  }
];

export const MOCK_ATTENDEES: Attendee[] = [
  {
    id: 'att-1',
    name: "Adaeze K.",
    email: "adaeze.k@gmail.com",
    role: "Frontend Dev",
    bio: "Passionate designer and React enthusiast building consumer-facing Web3 apps.",
    avatarColor: "#e6b7a9"
  },
  {
    id: 'att-2',
    name: "Tunde F.",
    email: "tunde.f@sui.io",
    role: "Sui Smart Contract Builder",
    bio: "Move Engineer obsessed with low-level protocol designs and object-centric models.",
    avatarColor: "#ebbcae"
  },
  {
    id: 'att-3',
    name: "Obiageli M.",
    email: "obi.m@unilag.edu",
    role: "Organizer",
    bio: "Student community lead focused on bridging campus builders with international networks.",
    avatarColor: "#cdc5c0"
  },
  {
    id: 'att-4',
    name: "Bolu C.",
    email: "bolu_c@dev.ceo",
    role: "Full-Stack Engineer",
    bio: "TypeScript generalist crafting clean CSS, durable node servers, and digital art.",
    avatarColor: "#e9e1dc"
  }
];

export const MOCK_BADGES: Badge[] = [
  {
    id: 'b-1',
    eventId: 'sui-overflow-lagos',
    eventName: "Sui Overflow Lagos Builder Night '26",
    eventDate: "2026-06-14",
    eventLocation: "Yaba, Lagos, Nigeria",
    attendeeId: 'att-1',
    ownerName: "Adaeze K.",
    ownerRole: "Frontend Dev",
    badgeStyle: {
      shape: 'diamond',
      color: '#7a564a',
      accentColor: '#ebbcae',
      icon: 'Cpu',
      effect: 'metallic'
    },
    mintedTx: "0x39a978f8fd...e76aeef82",
    mintedAt: "2026-06-02T10:14:22Z",
    serialNumber: "064"
  },
  {
    id: 'b-2',
    eventId: 'nairobi-summit',
    eventName: "Nairobi Web3 Core Summit",
    eventDate: "2026-07-02",
    eventLocation: "Kilimani, Nairobi, Kenya",
    attendeeId: 'att-1',
    ownerName: "Adaeze K.",
    ownerRole: "Frontend Dev",
    badgeStyle: {
      shape: 'hexagon',
      color: '#1a3a4b',
      accentColor: '#4fcdff',
      icon: 'HardDrive',
      effect: 'holographic'
    },
    mintedTx: null,
    mintedAt: null,
    serialNumber: "042"
  }
];
