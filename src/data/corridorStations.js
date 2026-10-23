// Detailed Geospatial and Topological Data for Metro Corridors

export const BENGALURU_PURPLE_LINE = {
  id: 'bengaluru-purple',
  name: 'Bengaluru: Indiranagar - Whitefield Metro Corridor',
  center: [12.9868, 77.7289],
  zoom: 13,
  stations: [
    {
      id: 'stn-byph',
      name: 'Baiyappanahalli',
      code: 'BYPH',
      lat: 12.9907,
      lng: 77.6525,
      type: 'interchange',
      baseDemandRate: 42, // commuters/min in peak
      gates: [
        { id: 'G1', name: 'Gate 1 (Old Madras Rd)', facing: 'North', currentSupply: 8 },
        { id: 'G2', name: 'Gate 2 (Railway Station)', facing: 'South', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-byph-1', name: 'Metro North EV Hub', type: 'EV_STAND', capacity: 25, currentVehicles: 12, lat: 12.9915, lng: 77.6532 },
        { id: 'std-byph-2', name: 'Old Madras Auto Stand', type: 'AUTO_STAND', capacity: 20, currentVehicles: 8, lat: 12.9901, lng: 77.6518 },
      ],
      destinations: ['Bagmane Tech Park CV Raman Nagar', 'DRDO Complex', 'Benniganahalli Lake'],
    },
    {
      id: 'stn-bnhl',
      name: 'Benniganahalli',
      code: 'BNHL',
      lat: 12.9958,
      lng: 77.6680,
      type: 'regular',
      baseDemandRate: 35,
      gates: [
        { id: 'G1', name: 'Gate 1 (Tin Factory Junction)', facing: 'West', currentSupply: 5 },
        { id: 'G2', name: 'Gate 2 (ORR Flyover Side)', facing: 'East', currentSupply: 4 },
      ],
      stands: [
        { id: 'std-bnhl-1', name: 'Tin Factory Feeder Bay', type: 'BUS_FEEDER', capacity: 15, currentVehicles: 6, lat: 12.9965, lng: 77.6688 },
      ],
      destinations: ['Kasturi Nagar', 'Pai Layout', 'ORR Ring Road North'],
    },
    {
      id: 'stn-krpr',
      name: 'KR Pura (Outer Ring Rd)',
      code: 'KRPR',
      lat: 12.9972,
      lng: 77.6795,
      type: 'interchange',
      baseDemandRate: 68,
      gates: [
        { id: 'G1', name: 'Gate 1 (Ring Road Southbound)', facing: 'South', currentSupply: 10 },
        { id: 'G2', name: 'Gate 2 (Ring Road Northbound)', facing: 'North', currentSupply: 8 },
        { id: 'G3', name: 'Gate 3 (KR Puram Railway Stn Bridge)', facing: 'East', currentSupply: 7 },
      ],
      stands: [
        { id: 'std-krpr-1', name: 'ORR Smart Feeder Stand', type: 'EV_STAND', capacity: 35, currentVehicles: 14, lat: 12.9980, lng: 77.6805 },
        { id: 'std-krpr-2', name: 'Railway Interchange Auto Syndicate', type: 'AUTO_STAND', capacity: 30, currentVehicles: 11, lat: 12.9962, lng: 77.6785 },
        { id: 'std-krpr-3', name: 'BMTC Metro Feeder Depot Stand', type: 'BUS_FEEDER', capacity: 10, currentVehicles: 4, lat: 12.9975, lng: 77.6812 },
      ],
      destinations: ['Manyata Tech Park Shuttles', 'Marathahalli ORR IT Corridor', 'Mahadevapura'],
    },
    {
      id: 'stn-grcp',
      name: 'Garudacharpalya',
      code: 'GRCP',
      lat: 12.9940,
      lng: 77.7120,
      type: 'regular',
      baseDemandRate: 52,
      gates: [
        { id: 'G1', name: 'Gate 1 (Bagmane WTC Side)', facing: 'South', currentSupply: 6 },
        { id: 'G2', name: 'Gate 2 (Mahadevapura Main Rd)', facing: 'North', currentSupply: 5 },
      ],
      stands: [
        { id: 'std-grcp-1', name: 'Bagmane WTC Feeder Bay', type: 'EV_STAND', capacity: 25, currentVehicles: 9, lat: 12.9932, lng: 77.7128 },
        { id: 'std-grcp-2', name: 'Decathlon Mahadevapura Stand', type: 'AUTO_STAND', capacity: 18, currentVehicles: 7, lat: 12.9948, lng: 77.7112 },
      ],
      destinations: ['Bagmane World Technology Center', 'Ferns City', 'Rainbow Children Hospital'],
    },
    {
      id: 'stn-hodi',
      name: 'Hoodi',
      code: 'HODI',
      lat: 12.9920,
      lng: 77.7180,
      type: 'high_stress',
      baseDemandRate: 74,
      gates: [
        { id: 'G1', name: 'Gate 1 (Hoodi Junction)', facing: 'North', currentSupply: 4 },
        { id: 'G2', name: 'Gate 2 (EPIP Zone Feeder)', facing: 'South', currentSupply: 5 },
      ],
      stands: [
        { id: 'std-hodi-1', name: 'Hoodi Circle Auto Hub', type: 'AUTO_STAND', capacity: 20, currentVehicles: 5, lat: 12.9925, lng: 77.7170 },
        { id: 'std-hodi-2', name: 'EPIP Smart EV Zone', type: 'EV_STAND', capacity: 25, currentVehicles: 6, lat: 12.9912, lng: 77.7192 },
      ],
      destinations: ['EPIP Industrial Area Phase 1', 'Capgemini EPIP Campus', 'TCS Think Campus'],
    },
    {
      id: 'stn-itpl',
      name: 'Pattandur Agrahara (ITPL)',
      code: 'ITPL',
      lat: 12.9890,
      lng: 77.7580,
      type: 'tech_hub',
      baseDemandRate: 88,
      gates: [
        { id: 'G1', name: 'Gate 1 (Park Square Mall)', facing: 'West', currentSupply: 12 },
        { id: 'G2', name: 'Gate 2 (ITPL Main Tech Gate)', facing: 'East', currentSupply: 9 },
        { id: 'G3', name: 'Gate 3 (Ascendas Concourse)', facing: 'South', currentSupply: 7 },
      ],
      stands: [
        { id: 'std-itpl-1', name: 'ITPL Main Gate EV Superhub', type: 'EV_STAND', capacity: 45, currentVehicles: 24, lat: 12.9898, lng: 77.7592 },
        { id: 'std-itpl-2', name: 'Park Square Shared Auto Bay', type: 'AUTO_STAND', capacity: 30, currentVehicles: 16, lat: 12.9882, lng: 77.7570 },
        { id: 'std-itpl-3', name: 'Ascendas Corporate Shuttle Stand', type: 'SHUTTLE_HUB', capacity: 18, currentVehicles: 9, lat: 12.9875, lng: 77.7600 },
      ],
      destinations: ['International Tech Park (ITPL)', 'Prestige Shantiniketan', 'Schneider Electric', 'Mu Sigma'],
    },
    {
      id: 'stn-kndh',
      name: 'Kundalahalli',
      code: 'KNDH',
      lat: 12.9750,
      lng: 77.7240,
      type: 'tech_hub',
      baseDemandRate: 64,
      gates: [
        { id: 'G1', name: 'Gate 1 (Brookefield Side)', facing: 'South', currentSupply: 7 },
        { id: 'G2', name: 'Gate 2 (SAP Labs Road)', facing: 'North', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-kndh-1', name: 'Brookefield Feeder Stand', type: 'EV_STAND', capacity: 25, currentVehicles: 10, lat: 12.9742, lng: 77.7232 },
        { id: 'std-kndh-2', name: 'Kundalahalli Gate Auto Stand', type: 'AUTO_STAND', capacity: 20, currentVehicles: 8, lat: 12.9758, lng: 77.7251 },
      ],
      destinations: ['SAP Labs India', 'Qualcomm Bangalore', 'AECS Layout', 'Ryan International'],
    },
    {
      id: 'stn-whfd',
      name: 'Whitefield (Kadugodi)',
      code: 'WHFD',
      lat: 13.0030,
      lng: 77.7670,
      type: 'terminus',
      baseDemandRate: 72,
      gates: [
        { id: 'G1', name: 'Gate 1 (Whitefield Railway Stn)', facing: 'East', currentSupply: 11 },
        { id: 'G2', name: 'Gate 2 (Kadugodi Bus Stand Feeder)', facing: 'West', currentSupply: 14 },
      ],
      stands: [
        { id: 'std-whfd-1', name: 'Kadugodi TTMC Bus Feeder', type: 'BUS_FEEDER', capacity: 25, currentVehicles: 12, lat: 13.0038, lng: 77.7682 },
        { id: 'std-whfd-2', name: 'Whitefield Station Auto Hub', type: 'AUTO_STAND', capacity: 35, currentVehicles: 15, lat: 13.0022, lng: 77.7658 },
      ],
      destinations: ['Kadugodi Residential', 'Belathur', 'Hoskote Industrial Corridor Shuttles'],
    },
  ]
};

export const HYDERABAD_BLUE_LINE = {
  id: 'hyderabad-blue',
  name: 'Hyderabad: HITEC City Cyber Towers Corridor',
  center: [17.4474, 78.3762],
  zoom: 13,
  stations: [
    {
      id: 'stn-ampt',
      name: 'Ameerpet Interchange',
      code: 'AMPT',
      lat: 17.4375,
      lng: 78.4483,
      type: 'interchange',
      baseDemandRate: 85,
      gates: [
        { id: 'G1', name: 'Gate 1 (SR Nagar Concourse)', facing: 'North', currentSupply: 12 },
        { id: 'G2', name: 'Gate 2 (Punjagutta Road)', facing: 'South', currentSupply: 10 },
      ],
      stands: [
        { id: 'std-ampt-1', name: 'Ameerpet Junction EV Stand', type: 'EV_STAND', capacity: 30, currentVehicles: 14, lat: 17.4382, lng: 78.4490 },
        { id: 'std-ampt-2', name: 'Mythrivanam Auto Stand', type: 'AUTO_STAND', capacity: 25, currentVehicles: 11, lat: 17.4368, lng: 78.4475 },
      ],
      destinations: ['Mythrivanam IT Coaching Hub', 'Punjagutta', 'SR Nagar Market'],
    },
    {
      id: 'stn-mdhp',
      name: 'Madhapur',
      code: 'MDHP',
      lat: 17.4380,
      lng: 78.3910,
      type: 'regular',
      baseDemandRate: 58,
      gates: [
        { id: 'G1', name: 'Gate 1 (Inorbit Road)', facing: 'South', currentSupply: 8 },
        { id: 'G2', name: 'Gate 2 (Ayyappa Society)', facing: 'North', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-mdhp-1', name: 'Madhapur Police Stn Auto Bay', type: 'AUTO_STAND', capacity: 20, currentVehicles: 7, lat: 17.4372, lng: 78.3920 },
        { id: 'std-mdhp-2', name: 'Ayyappa Society EV Feeder', type: 'EV_STAND', capacity: 22, currentVehicles: 9, lat: 17.4390, lng: 78.3900 },
      ],
      destinations: ['Ayyappa Society Hostels', 'Inorbit Mall Area', 'Madhapur IT Labs'],
    },
    {
      id: 'stn-durg',
      name: 'Durgam Cheruvu',
      code: 'DURG',
      lat: 17.4420,
      lng: 78.3840,
      type: 'tech_hub',
      baseDemandRate: 66,
      gates: [
        { id: 'G1', name: 'Gate 1 (Mindspace West Concourse)', facing: 'West', currentSupply: 8 },
        { id: 'G2', name: 'Gate 2 (Cable Bridge Road)', facing: 'East', currentSupply: 7 },
      ],
      stands: [
        { id: 'std-durg-1', name: 'Mindspace West Gate Shuttles', type: 'SHUTTLE_HUB', capacity: 25, currentVehicles: 10, lat: 17.4428, lng: 78.3850 },
        { id: 'std-durg-2', name: 'Cable Bridge View Auto Stand', type: 'AUTO_STAND', capacity: 18, currentVehicles: 6, lat: 17.4412, lng: 78.3830 },
      ],
      destinations: ['Raheja Mindspace IT Park Building 12', 'Durgam Cheruvu Cable Bridge', 'Knowledge Park'],
    },
    {
      id: 'stn-htec',
      name: 'HITEC City (Cyber Towers)',
      code: 'HTEC',
      lat: 17.4474,
      lng: 78.3762,
      type: 'tech_hub',
      baseDemandRate: 95,
      gates: [
        { id: 'G1', name: 'Gate 1 (Cyber Towers Circle)', facing: 'North', currentSupply: 10 },
        { id: 'G2', name: 'Gate 2 (L&T Infocity Gate)', facing: 'South', currentSupply: 8 },
        { id: 'G3', name: 'Gate 3 (Cyber Gateway Corridor)', facing: 'East', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-htec-1', name: 'Cyber Towers EV Smart Stand', type: 'EV_STAND', capacity: 40, currentVehicles: 16, lat: 17.4482, lng: 78.3770 },
        { id: 'std-htec-2', name: 'L&T Infocity Auto Syndicate', type: 'AUTO_STAND', capacity: 30, currentVehicles: 11, lat: 17.4465, lng: 78.3755 },
        { id: 'std-htec-3', name: 'TSRTC Cyber Shuttle Bay', type: 'BUS_FEEDER', capacity: 15, currentVehicles: 6, lat: 17.4470, lng: 78.3780 },
      ],
      destinations: ['Cyber Towers', 'L&T Infocity', 'Oracle India', 'Broadcom Campus', 'Cyber Pearl'],
    },
    {
      id: 'stn-rdrg',
      name: 'Raidurg (Mindspace)',
      code: 'RDRG',
      lat: 17.4410,
      lng: 78.3680,
      type: 'terminus',
      baseDemandRate: 88,
      gates: [
        { id: 'G1', name: 'Gate 1 (IKEA / Financial Dist Link)', facing: 'West', currentSupply: 12 },
        { id: 'G2', name: 'Gate 2 (Mindspace Main Gate)', facing: 'North', currentSupply: 10 },
      ],
      stands: [
        { id: 'std-rdrg-1', name: 'Raidurg Terminal EV Feeder', type: 'EV_STAND', capacity: 40, currentVehicles: 18, lat: 17.4418, lng: 78.3690 },
        { id: 'std-rdrg-2', name: 'Financial District Shuttle Terminal', type: 'SHUTTLE_HUB', capacity: 30, currentVehicles: 12, lat: 17.4402, lng: 78.3670 },
      ],
      destinations: ['IKEA Hyderabad', 'Financial District Gachibowli Shuttles', 'Amazon Campus', 'Microsoft IDC'],
    },
  ]
};

export const CORRIDOR_DATA_MAP = {
  'bengaluru-purple': BENGALURU_PURPLE_LINE,
  'hyderabad-blue': HYDERABAD_BLUE_LINE,
};
