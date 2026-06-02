export interface EventBadgeStyle {
  shape: 'circle' | 'hexagon' | 'shield' | 'star' | 'diamond';
  color: string; // Hex color structure, e.g., "#7a564a"
  accentColor: string; // Accent color, e.g., "#ebbcae"
  icon: string; // Lucide icon identifierName
  effect: 'glow' | 'metallic' | 'holographic' | 'classic';
}

export interface Sponsor {
  name: string;
  logoType: 'sui' | 'walrus' | 'zklogin' | 'custom';
  description?: string;
  impressionCount: number;
}

export interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  date: string;
  capacity: number;
  badgeStyle: EventBadgeStyle;
  organizerName: string;
  sponsor: Sponsor;
  checkInCount: number;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  role: string; // e.g., 'Web3 Developer', 'Sui Designer', 'Concert Fan', 'Student Builder'
  bio: string;
  avatarColor: string;
}

export interface CheckIn {
  id: string;
  eventId: string;
  attendeeId: string;
  timestamp: string;
  ticketCode: string;
}

export interface Badge {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  attendeeId: string;
  ownerName: string;
  ownerRole: string;
  badgeStyle: EventBadgeStyle;
  mintedTx: string | null;
  mintedAt: string | null;
  serialNumber: string;
}

export interface AIRecapResult {
  story: string;
  highlights: string[];
  keyConnections: string[];
  skillsProven: string[];
  quote: string;
  badgeTitle: string;
}
