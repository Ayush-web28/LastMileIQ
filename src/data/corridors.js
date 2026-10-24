// Mumbai Public Transit Corridors — 6 Metro Lines & 3 Suburban Local Lines

export const CORRIDORS = {
  // --- 6 MUMBAI METRO LINES ---
  'mumbai-metro-1': {
    id: 'mumbai-metro-1',
    category: 'metro',
    categoryLabel: 'Metro Line',
    name: 'Metro Line 1: Versova – Andheri – Ghatkopar (Blue Line)',
    shortName: 'Metro 1: Versova - Ghatkopar',
    lineCode: 'Line 1',
    color: '#0284C7', // Sky Blue
    city: 'Mumbai',
    stationsCount: 12,
    lengthKm: 11.4,
    primaryHub: 'Andheri & Ghatkopar Interchanges',
    mapCenter: [19.1176, 72.8680],
    defaultZoom: 13,
    description: 'High-density east-west transit spine connecting Western Railway at Andheri and Central Railway at Ghatkopar.',
    keyStations: ['Versova', 'D.N. Nagar', 'Andheri', 'WEH', 'Marol Naka', 'Saki Naka', 'Ghatkopar'],
    fleetSummary: {
      activeRickshaws: 240,
      activeEVAutos: 180,
      activeFeederBuses: 36,
      activeCampusShuttles: 42,
    }
  },
  'mumbai-metro-2a': {
    id: 'mumbai-metro-2a',
    category: 'metro',
    categoryLabel: 'Metro Line',
    name: 'Metro Line 2A: Dahisar East – D.N. Nagar (Yellow Line)',
    shortName: 'Metro 2A: Dahisar - D.N. Nagar',
    lineCode: 'Line 2A',
    color: '#EAB308', // Bright Yellow
    city: 'Mumbai',
    stationsCount: 17,
    lengthKm: 18.6,
    primaryHub: 'Link Road Western Suburbs Corridor',
    mapCenter: [19.1920, 72.8420],
    defaultZoom: 12,
    description: 'Elevated arterial line running along Link Road connecting Dahisar, Borivali West, Kandivali West, Malad West, and D.N. Nagar.',
    keyStations: ['Dahisar East', 'Borivali West', 'Kandivali West', 'Malad West', 'Goregaon West', 'D.N. Nagar'],
    fleetSummary: {
      activeRickshaws: 210,
      activeEVAutos: 155,
      activeFeederBuses: 28,
      activeCampusShuttles: 30,
    }
  },
  'mumbai-metro-7': {
    id: 'mumbai-metro-7',
    category: 'metro',
    categoryLabel: 'Metro Line',
    name: 'Metro Line 7: Dahisar East – Gundavali / Andheri East (Red Line)',
    shortName: 'Metro 7: Dahisar - Gundavali',
    lineCode: 'Line 7',
    color: '#F97316', // Red-Orange Line
    city: 'Mumbai',
    stationsCount: 14,
    lengthKm: 16.5,
    primaryHub: 'Western Express Highway (WEH) Spine',
    mapCenter: [19.1850, 72.8620],
    defaultZoom: 12,
    description: 'Parallels the Western Express Highway connecting Dahisar East, National Park, Kandivali, Goregaon East, and Gundavali (Andheri East interchange).',
    keyStations: ['Dahisar East', 'National Park', 'Magathane', 'Dindoshi', 'Goregaon East', 'Gundavali'],
    fleetSummary: {
      activeRickshaws: 195,
      activeEVAutos: 140,
      activeFeederBuses: 32,
      activeCampusShuttles: 35,
    }
  },
  'mumbai-metro-3': {
    id: 'mumbai-metro-3',
    category: 'metro',
    categoryLabel: 'Metro Line',
    name: 'Metro Line 3: Aarey JVLR – BKC – Colaba (Aqua Line)',
    shortName: 'Metro 3: Aarey - BKC - Colaba',
    lineCode: 'Line 3',
    color: '#06B6D4', // Aqua Cyan
    city: 'Mumbai',
    stationsCount: 10,
    lengthKm: 12.4,
    primaryHub: 'BKC Financial District & SEEPZ Hub',
    mapCenter: [19.0950, 72.8550],
    defaultZoom: 12,
    description: 'Mumbai’s first fully underground metro connecting Aarey JVLR, SEEPZ, CSMIA Airport Terminals T1/T2, and Bandra-Kurla Complex (BKC).',
    keyStations: ['Aarey JVLR', 'SEEPZ', 'Marol Naka', 'CSMIA T2', 'CSMIA T1', 'BKC'],
    fleetSummary: {
      activeRickshaws: 220,
      activeEVAutos: 190,
      activeFeederBuses: 45,
      activeCampusShuttles: 65,
    }
  },
  'mumbai-metro-2b': {
    id: 'mumbai-metro-2b',
    category: 'metro',
    categoryLabel: 'Metro Line',
    name: 'Metro Line 2B: D.N. Nagar – BKC – Mandale (Yellow Line Ext)',
    shortName: 'Metro 2B: D.N. Nagar - BKC - Mandale',
    lineCode: 'Line 2B',
    color: '#D97706', // Warm Amber
    city: 'Mumbai',
    stationsCount: 11,
    lengthKm: 23.6,
    primaryHub: 'Bandra - BKC - Chembur Connector',
    mapCenter: [19.0620, 72.8580],
    defaultZoom: 12,
    description: 'Key cross-suburban link running from D.N. Nagar through Bandra West, BKC financial hub, Kurla East, and Chembur to Mandale.',
    keyStations: ['D.N. Nagar', 'National College Bandra', 'BKC MMRDA', 'Kurla East', 'Chembur', 'Mandale'],
    fleetSummary: {
      activeRickshaws: 175,
      activeEVAutos: 130,
      activeFeederBuses: 30,
      activeCampusShuttles: 40,
    }
  },
  'mumbai-metro-6': {
    id: 'mumbai-metro-6',
    category: 'metro',
    categoryLabel: 'Metro Line',
    name: 'Metro Line 6: Swami Samarth Nagar – JVLR – Vikhroli (Pink Line)',
    shortName: 'Metro 6: Lokhandwala - JVLR - Vikhroli',
    lineCode: 'Line 6',
    color: '#EC4899', // Hot Pink
    city: 'Mumbai',
    stationsCount: 13,
    lengthKm: 15.3,
    primaryHub: 'JVLR East-West Arterial & Powai Lake',
    mapCenter: [19.1280, 72.8950],
    defaultZoom: 12,
    description: 'Crucial east-west arterial traversing JVLR connecting Lokhandwala/Andheri West with SEEPZ, IIT Bombay Powai, and Vikhroli EEH.',
    keyStations: ['Swami Samarth Nagar', 'Jogeshwari West', 'JVLR', 'SEEPZ Village', 'IIT Bombay', 'Vikhroli EEH'],
    fleetSummary: {
      activeRickshaws: 160,
      activeEVAutos: 120,
      activeFeederBuses: 25,
      activeCampusShuttles: 32,
    }
  },

  // --- 3 MUMBAI SUBURBAN LOCAL LINES (Distinct High-Contrast Dot Colors) ---
  'mumbai-local-western': {
    id: 'mumbai-local-western',
    category: 'local',
    categoryLabel: 'Suburban Local Line',
    name: 'Western Railway Local: Churchgate – Dadar – Andheri – Borivali',
    shortName: 'Western Local: Churchgate - Borivali',
    lineCode: 'WR Local',
    color: '#EF4444', // Distinct Vibrant Crimson Red
    city: 'Mumbai',
    stationsCount: 16,
    lengthKm: 34.2,
    primaryHub: 'Dadar, Bandra & Andheri Interchanges',
    mapCenter: [19.0600, 72.8400],
    defaultZoom: 11,
    description: 'The premier suburban line of Mumbai carrying over 3.5 million daily commuters between South Mumbai, Bandra, and northern suburbs.',
    keyStations: ['Churchgate', 'Mumbai Central', 'Dadar WR', 'Bandra', 'Santacruz', 'Andheri WR', 'Goregaon', 'Borivali'],
    fleetSummary: {
      activeRickshaws: 420,
      activeEVAutos: 290,
      activeFeederBuses: 80,
      activeCampusShuttles: 95,
    }
  },
  'mumbai-local-central': {
    id: 'mumbai-local-central',
    category: 'local',
    categoryLabel: 'Suburban Local Line',
    name: 'Central Railway Local: CSMT – Dadar – Kurla – Ghatkopar – Thane',
    shortName: 'Central Local: CSMT - Dadar - Thane',
    lineCode: 'CR Local',
    color: '#F59E0B', // Distinct Vibrant Electric Amber / Gold
    city: 'Mumbai',
    stationsCount: 15,
    lengthKm: 33.8,
    primaryHub: 'CSMT, Dadar, Kurla & Thane Interchanges',
    mapCenter: [19.0700, 72.8900],
    defaultZoom: 11,
    description: 'The historic spine connecting South Mumbai CSMT through industrial and commercial hubs of Dadar, Kurla, Ghatkopar, and Thane.',
    keyStations: ['CSMT', 'Byculla', 'Dadar CR', 'Kurla CR', 'Ghatkopar CR', 'Vikhroli', 'Bhandup', 'Thane'],
    fleetSummary: {
      activeRickshaws: 450,
      activeEVAutos: 310,
      activeFeederBuses: 90,
      activeCampusShuttles: 88,
    }
  },
  'mumbai-local-harbour': {
    id: 'mumbai-local-harbour',
    category: 'local',
    categoryLabel: 'Suburban Local Line',
    name: 'Harbour Railway Local: CSMT – Vadala – Kurla – Vashi – Panvel',
    shortName: 'Harbour Local: CSMT - Vashi - Panvel',
    lineCode: 'HR Local',
    color: '#8B5CF6', // Distinct Vibrant Royal Purple / Violet
    city: 'Mumbai',
    stationsCount: 14,
    lengthKm: 48.5,
    primaryHub: 'Vadala Road, Kurla & Vashi Creek Bridge',
    mapCenter: [19.0400, 72.9300],
    defaultZoom: 11,
    description: 'Connects island city CSMT and Vadala Road through eastern docklands and Kurla across Thane Creek to Navi Mumbai and Panvel.',
    keyStations: ['CSMT', 'Vadala Road', 'GTB Nagar', 'Kurla Harbour', 'Chembur HR', 'Mankhurd', 'Vashi', 'Panvel'],
    fleetSummary: {
      activeRickshaws: 340,
      activeEVAutos: 240,
      activeFeederBuses: 60,
      activeCampusShuttles: 55,
    }
  }
};
