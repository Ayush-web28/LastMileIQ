// LastMileIQ Metro Corridor Baseline Datasets

export const CORRIDORS = {
  'bengaluru-purple': {
    id: 'bengaluru-purple',
    name: 'Bengaluru: Indiranagar - Whitefield Metro Corridor',
    shortName: 'Bengaluru: Purple Line',
    city: 'Bengaluru',
    stationsCount: 16,
    lengthKm: 22.4,
    primaryHub: 'ITPL & Bagmane Tech Parks',
    mapCenter: [12.9868, 77.7289],
    defaultZoom: 13,
    description: 'High-density tech corridor carrying over 240,000 daily commuters between central Bengaluru and the eastern IT hub of Whitefield/Kadugodi.',
    keyStations: ['Baiyappanahalli', 'KR Pura', 'Garudacharpalya', 'Hoodi', 'ITPL', 'Whitefield'],
    fleetSummary: {
      activeRickshaws: 184,
      activeEVAutos: 142,
      activeFeederBuses: 28,
      activeCampusShuttles: 36,
    }
  },
  'hyderabad-blue': {
    id: 'hyderabad-blue',
    name: 'Hyderabad: HITEC City Cyber Towers Corridor',
    shortName: 'Hyderabad: HITEC Blue Line',
    city: 'Hyderabad',
    stationsCount: 9,
    lengthKm: 14.8,
    primaryHub: 'Cyber Towers, Mindspace & Financial Dist',
    mapCenter: [17.4474, 78.3762],
    defaultZoom: 13,
    description: 'The primary tech transit spine connecting Ameerpet interchange to Madhapur, Durgam Cheruvu, HITEC City, and Raidurg.',
    keyStations: ['Ameerpet', 'Madhapur', 'Durgam Cheruvu', 'HITEC City', 'Raidurg'],
    fleetSummary: {
      activeRickshaws: 156,
      activeEVAutos: 118,
      activeFeederBuses: 22,
      activeCampusShuttles: 44,
    }
  }
};
