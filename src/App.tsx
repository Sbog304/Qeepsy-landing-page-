import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import OrganizerPanel from './components/OrganizerPanel';
import AttendeePanel from './components/AttendeePanel';
import AppWorkspace from './components/AppWorkspace';
import { INITIAL_EVENTS, MOCK_ATTENDEES, MOCK_BADGES } from './data/mockEvents';
import { Event, Attendee, Badge } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'organizer' | 'attendee'>('landing');

  // Initialize master synchronized states checking local storage first
  const [events, setEvents] = useState<Event[]>(() => {
    const cached = localStorage.getItem('qeepsy_events');
    return cached ? JSON.parse(cached) : INITIAL_EVENTS;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const cached = localStorage.getItem('qeepsy_badges');
    return cached ? JSON.parse(cached) : MOCK_BADGES;
  });

  const [attendee, setAttendee] = useState<Attendee>(() => {
    const cached = localStorage.getItem('qeepsy_attendee');
    return cached ? JSON.parse(cached) : MOCK_ATTENDEES[0];
  });

  // Keep localStorage up-to-date with any state changes
  useEffect(() => {
    localStorage.setItem('qeepsy_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('qeepsy_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('qeepsy_attendee', JSON.stringify(attendee));
  }, [attendee]);

  // Read URL query parameters on load to support scanned QR code routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get('event') || params.get('checkin');
    if (eventParam) {
      const match = events.some(e => e.id === eventParam);
      if (match) {
        localStorage.setItem('qeepsy_selected_event_id', eventParam);
        // Put a small welcome flag so the attendee panel can show a nice HUD
        localStorage.setItem('qeepsy_welcomed_via_qr', 'true');
        setCurrentView('attendee');
      }
    }
  }, [events]);

  // Actions
  const handleAddEvent = (newEvent: Event) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const handleUpdateAttendee = (updatedAttendee: Attendee) => {
    setAttendee(updatedAttendee);
  };

  const handleAddBadge = (newBadge: Badge) => {
    setBadges(prev => [...prev, newBadge]);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'organizer':
        return (
          <AppWorkspace currentView={currentView} onNavigate={setCurrentView}>
            <OrganizerPanel
              events={events}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
              onNavigate={setCurrentView}
            />
          </AppWorkspace>
        );
      case 'attendee':
        return (
          <AppWorkspace currentView={currentView} onNavigate={setCurrentView}>
            <AttendeePanel
              events={events}
              badges={badges}
              attendee={attendee}
              onUpdateAttendee={handleUpdateAttendee}
              onAddBadge={handleAddBadge}
              onNavigate={setCurrentView}
            />
          </AppWorkspace>
        );
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-text-muted">
      <div className="texture-overlay" />
      {renderCurrentView()}
    </div>
  );
}
