// Detailed Geospatial & Concourse Data for Mumbai Public Transit Corridors
// 6 Metro Lines + 3 Suburban Local Lines

export const MUMBAI_METRO_1 = {
  id: 'mumbai-metro-1',
  name: 'Metro Line 1: Versova – Andheri – Ghatkopar (Blue Line)',
  center: [19.1176, 72.8680],
  zoom: 13,
  stations: [
    {
      id: 'stn-m1-vsv',
      name: 'Versova',
      code: 'VSV',
      lat: 19.1352,
      lng: 72.8228,
      type: 'terminus',
      baseDemandRate: 48,
      gates: [
        { id: 'G1', name: 'Gate 1 (Seven Bungalows)', facing: 'North', currentSupply: 8 },
        { id: 'G2', name: 'Gate 2 (Yari Road Feeder)', facing: 'South', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-vsv-1', name: 'Seven Bungalows Auto Syndicate', type: 'AUTO_STAND', capacity: 30, currentVehicles: 12, lat: 19.1358, lng: 72.8235 },
        { id: 'std-vsv-2', name: 'Versova Smart EV Hub', type: 'EV_STAND', capacity: 20, currentVehicles: 9, lat: 19.1345, lng: 72.8220 },
      ],
      destinations: ['Yari Road Coast', 'Aram Nagar Studios', 'Lokhandwala Back Road'],
    },
    {
      id: 'stn-m1-dnn',
      name: 'D.N. Nagar (Interchange with Line 2A)',
      code: 'DNN',
      lat: 19.1305,
      lng: 72.8355,
      type: 'interchange',
      baseDemandRate: 72,
      gates: [
        { id: 'G1', name: 'Gate 1 (Link Road West)', facing: 'West', currentSupply: 10 },
        { id: 'G2', name: 'Gate 2 (Bhavan’s College)', facing: 'East', currentSupply: 8 },
      ],
      stands: [
        { id: 'std-dnn-1', name: 'Link Road Smart EV Stand', type: 'EV_STAND', capacity: 35, currentVehicles: 14, lat: 19.1312, lng: 72.8362 },
        { id: 'std-dnn-2', name: 'Bhavan’s Gate Auto Bay', type: 'AUTO_STAND', capacity: 25, currentVehicles: 11, lat: 19.1298, lng: 72.8348 },
      ],
      destinations: ['Bhavan’s College Campus', 'Andheri Sports Complex', 'Juhu Circle Feeder'],
    },
    {
      id: 'stn-m1-and',
      name: 'Andheri Metro (Interchange with Western Railway)',
      code: 'ANDM',
      lat: 19.1197,
      lng: 72.8464,
      type: 'mega_interchange',
      baseDemandRate: 110,
      gates: [
        { id: 'G1', name: 'Gate 1 (Andheri Railway Skywalk)', facing: 'West', currentSupply: 14 },
        { id: 'G2', name: 'Gate 2 (Old Nagardas Road)', facing: 'East', currentSupply: 10 },
        { id: 'G3', name: 'Gate 3 (Gundavali Link Concourse)', facing: 'North', currentSupply: 8 },
      ],
      stands: [
        { id: 'std-and-1', name: 'Andheri East Railway Auto Hub', type: 'AUTO_STAND', capacity: 50, currentVehicles: 22, lat: 19.1205, lng: 72.8475 },
        { id: 'std-and-2', name: 'BEST Metro Feeder Bay 1', type: 'BUS_FEEDER', capacity: 20, currentVehicles: 8, lat: 19.1188, lng: 72.8455 },
        { id: 'std-and-3', name: 'Nagardas Road Smart EV Stand', type: 'EV_STAND', capacity: 30, currentVehicles: 15, lat: 19.1210, lng: 72.8480 },
      ],
      destinations: ['Western Railway Platforms 1-9', 'MIDC Andheri East', 'Mahakali Caves Road', 'Chakala'],
    },
    {
      id: 'stn-m1-weh',
      name: 'Western Express Highway (WEH)',
      code: 'WEH',
      lat: 19.1160,
      lng: 72.8550,
      type: 'interchange',
      baseDemandRate: 64,
      gates: [
        { id: 'G1', name: 'Gate 1 (WEH Highway Northbound)', facing: 'East', currentSupply: 8 },
        { id: 'G2', name: 'Gate 2 (Gundavali Metro Link)', facing: 'South', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-weh-1', name: 'WEH Flyover Auto Stand', type: 'AUTO_STAND', capacity: 25, currentVehicles: 10, lat: 19.1165, lng: 72.8558 },
      ],
      destinations: ['Gundavali Metro Line 7', 'Bisleri Compound', 'Solitaire Corporate Park'],
    },
    {
      id: 'stn-m1-mrln',
      name: 'Marol Naka (Interchange with Line 3 Aqua)',
      code: 'MRLN',
      lat: 19.1105,
      lng: 72.8805,
      type: 'tech_hub',
      baseDemandRate: 92,
      gates: [
        { id: 'G1', name: 'Gate 1 (Andheri-Kurla Road)', facing: 'South', currentSupply: 9 },
        { id: 'G2', name: 'Gate 2 (MIDC Central Road Feeder)', facing: 'North', currentSupply: 7 },
      ],
      stands: [
        { id: 'std-mrln-1', name: 'Marol Fire Brigade EV Hub', type: 'EV_STAND', capacity: 35, currentVehicles: 16, lat: 19.1112, lng: 72.8815 },
        { id: 'std-mrln-2', name: 'MIDC Cross Road Auto Stand', type: 'AUTO_STAND', capacity: 30, currentVehicles: 12, lat: 19.1098, lng: 72.8795 },
      ],
      destinations: ['SEEPZ Special Economic Zone', 'MIDC IT Parks', 'L&T Heavy Engineering', 'International Airport Cargo'],
    },
    {
      id: 'stn-m1-sknk',
      name: 'Saki Naka',
      code: 'SKNK',
      lat: 19.1025,
      lng: 72.8885,
      type: 'high_stress',
      baseDemandRate: 88,
      gates: [
        { id: 'G1', name: 'Gate 1 (Saki Naka Junction)', facing: 'West', currentSupply: 6 },
        { id: 'G2', name: 'Gate 2 (Powai Saki Vihar Road)', facing: 'East', currentSupply: 5 },
      ],
      stands: [
        { id: 'std-sknk-1', name: 'Saki Naka Circle Shared Auto Stand', type: 'AUTO_STAND', capacity: 30, currentVehicles: 8, lat: 19.1030, lng: 72.8892 },
        { id: 'std-sknk-2', name: 'Saki Vihar Smart EV Stand', type: 'EV_STAND', capacity: 25, currentVehicles: 9, lat: 19.1018, lng: 72.8878 },
      ],
      destinations: ['Chandivali Hiranandani Feeder', 'Saki Vihar Road IT Labs', 'LBS Marg Kurla'],
    },
    {
      id: 'stn-m1-ghtk',
      name: 'Ghatkopar Metro (Interchange with Central Railway)',
      code: 'GHTK',
      lat: 19.0860,
      lng: 72.9080,
      type: 'mega_interchange',
      baseDemandRate: 115,
      gates: [
        { id: 'G1', name: 'Gate 1 (Central Railway Foot-Over-Bridge)', facing: 'East', currentSupply: 15 },
        { id: 'G2', name: 'Gate 2 (LBS Marg & R-City Feeder)', facing: 'West', currentSupply: 11 },
      ],
      stands: [
        { id: 'std-ghtk-1', name: 'Ghatkopar West Railway Auto Stand', type: 'AUTO_STAND', capacity: 60, currentVehicles: 24, lat: 19.0868, lng: 72.9090 },
        { id: 'std-ghtk-2', name: 'BEST Ghatkopar Station Depot', type: 'BUS_FEEDER', capacity: 25, currentVehicles: 10, lat: 19.0852, lng: 72.9070 },
        { id: 'std-ghtk-3', name: 'LBS Marg Smart EV Stand', type: 'EV_STAND', capacity: 35, currentVehicles: 18, lat: 19.0875, lng: 72.9065 },
      ],
      destinations: ['Central Railway Platforms 1-7', 'R-City Mall Ghatkopar West', 'Garodia Nagar', 'Pant Nagar'],
    },
  ]
};

export const MUMBAI_METRO_2A = {
  id: 'mumbai-metro-2a',
  name: 'Metro Line 2A: Dahisar East – D.N. Nagar (Yellow Line)',
  center: [19.1920, 72.8420],
  zoom: 12,
  stations: [
    {
      id: 'stn-m2a-dhs',
      name: 'Dahisar East',
      code: 'DHSE',
      lat: 19.2560,
      lng: 72.8620,
      type: 'interchange',
      baseDemandRate: 55,
      gates: [
        { id: 'G1', name: 'Gate 1 (Link Road Junction)', facing: 'West', currentSupply: 8 },
        { id: 'G2', name: 'Gate 2 (Line 7 Red Line Transfer)', facing: 'East', currentSupply: 10 },
      ],
      stands: [
        { id: 'std-m2a-dhs-1', name: 'Dahisar Checknaka EV Stand', type: 'EV_STAND', capacity: 30, currentVehicles: 14, lat: 19.2568, lng: 72.8628 },
      ],
      destinations: ['Mira Road Feeder', 'Rawalpada', 'Western Express Highway'],
    },
    {
      id: 'stn-m2a-borw',
      name: 'Borivali West (Don Bosco)',
      code: 'BORW',
      lat: 19.2310,
      lng: 72.8460,
      type: 'regular',
      baseDemandRate: 70,
      gates: [
        { id: 'G1', name: 'Gate 1 (Don Bosco School)', facing: 'East', currentSupply: 9 },
        { id: 'G2', name: 'Gate 2 (Gorai Creek Road)', facing: 'West', currentSupply: 7 },
      ],
      stands: [
        { id: 'std-borw-1', name: 'Gorai Jetty Feeder Stand', type: 'AUTO_STAND', capacity: 35, currentVehicles: 15, lat: 19.2318, lng: 72.8450 },
        { id: 'std-borw-2', name: 'Shimpoli Smart EV Stand', type: 'EV_STAND', capacity: 25, currentVehicles: 11, lat: 19.2302, lng: 72.8470 },
      ],
      destinations: ['Gorai Jetty', 'Shimpoli', 'IC Colony', 'Borivali Railway West'],
    },
    {
      id: 'stn-m2a-kndw',
      name: 'Kandivali West',
      code: 'KNDW',
      lat: 19.2080,
      lng: 72.8390,
      type: 'regular',
      baseDemandRate: 65,
      gates: [
        { id: 'G1', name: 'Gate 1 (Mahavir Nagar)', facing: 'East', currentSupply: 8 },
        { id: 'G2', name: 'Gate 2 (Charkop Sector 8)', facing: 'West', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-kndw-1', name: 'Mahavir Nagar Food Street Stand', type: 'AUTO_STAND', capacity: 25, currentVehicles: 10, lat: 19.2088, lng: 72.8398 },
        { id: 'std-kndw-2', name: 'Charkop Smart EV Feeder', type: 'EV_STAND', capacity: 25, currentVehicles: 12, lat: 19.2072, lng: 72.8382 },
      ],
      destinations: ['Charkop Industrial Estate', 'Mahavir Nagar', 'Kandivali West Bazaar'],
    },
    {
      id: 'stn-m2a-mldw',
      name: 'Malad West',
      code: 'MLDW',
      lat: 19.1860,
      lng: 72.8350,
      type: 'tech_hub',
      baseDemandRate: 85,
      gates: [
        { id: 'G1', name: 'Gate 1 (Infiniti Mall / Mindspace)', facing: 'West', currentSupply: 12 },
        { id: 'G2', name: 'Gate 2 (Marve Road Feeder)', facing: 'North', currentSupply: 8 },
      ],
      stands: [
        { id: 'std-mldw-1', name: 'Mindspace IT Park Feeder Hub', type: 'SHUTTLE_HUB', capacity: 40, currentVehicles: 18, lat: 19.1868, lng: 72.8340 },
        { id: 'std-mldw-2', name: 'Infiniti Mall Auto Stand', type: 'AUTO_STAND', capacity: 30, currentVehicles: 14, lat: 19.1852, lng: 72.8360 },
      ],
      destinations: ['Mindspace Malad Tech Hub', 'Infiniti Mall', 'Inorbit Mall Malad', 'Marve Beach Feeder'],
    },
    {
      id: 'stn-m2a-grgw',
      name: 'Goregaon West (Pahadi)',
      code: 'GRGW',
      lat: 19.1620,
      lng: 72.8340,
      type: 'regular',
      baseDemandRate: 68,
      gates: [
        { id: 'G1', name: 'Gate 1 (Bangur Nagar)', facing: 'East', currentSupply: 7 },
        { id: 'G2', name: 'Gate 2 (Motilal Nagar)', facing: 'West', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-grgw-1', name: 'Bangur Nagar Smart EV Stand', type: 'EV_STAND', capacity: 25, currentVehicles: 10, lat: 19.1628, lng: 72.8348 },
      ],
      destinations: ['Inorbit Mall Goregaon', 'Bangur Nagar', 'Oshiwara Police Station'],
    },
    {
      id: 'stn-m2a-dnn',
      name: 'D.N. Nagar (Terminus & Line 1 Interchange)',
      code: 'DNN2',
      lat: 19.1305,
      lng: 72.8355,
      type: 'interchange',
      baseDemandRate: 75,
      gates: [
        { id: 'G1', name: 'Gate 1 (Andheri West Concourse)', facing: 'West', currentSupply: 11 },
        { id: 'G2', name: 'Gate 2 (Line 1 Skywalk)', facing: 'East', currentSupply: 9 },
      ],
      stands: [
        { id: 'std-m2a-dnn-1', name: 'D.N. Nagar Metro Interchange Stand', type: 'AUTO_STAND', capacity: 35, currentVehicles: 15, lat: 19.1312, lng: 72.8360 },
      ],
      destinations: ['Metro Line 1 (Versova-Ghatkopar)', 'Juhu Circle', 'Lokhandwala Complex'],
    },
  ]
};

export const MUMBAI_METRO_7 = {
  id: 'mumbai-metro-7',
  name: 'Metro Line 7: Dahisar East – Gundavali / Andheri East (Red Line)',
  center: [19.1850, 72.8620],
  zoom: 12,
  stations: [
    {
      id: 'stn-m7-dhs',
      name: 'Dahisar East (Line 7)',
      code: 'DHSR',
      lat: 19.2560,
      lng: 72.8620,
      type: 'interchange',
      baseDemandRate: 52,
      gates: [
        { id: 'G1', name: 'Gate 1 (WEH Flyover)', facing: 'East', currentSupply: 8 },
      ],
      stands: [
        { id: 'std-m7-dhs-1', name: 'Dahisar East Toll Stand', type: 'AUTO_STAND', capacity: 25, currentVehicles: 11, lat: 19.2565, lng: 72.8625 },
      ],
      destinations: ['Thane Ghodbunder Link', 'Mira-Bhayandar Feeder'],
    },
    {
      id: 'stn-m7-npk',
      name: 'National Park (Borivali East)',
      code: 'NPKB',
      lat: 19.2290,
      lng: 72.8630,
      type: 'regular',
      baseDemandRate: 60,
      gates: [
        { id: 'G1', name: 'Gate 1 (Sanjay Gandhi National Park)', facing: 'East', currentSupply: 7 },
        { id: 'G2', name: 'Gate 2 (Borivali East Station Road)', facing: 'West', currentSupply: 8 },
      ],
      stands: [
        { id: 'std-m7-npk-1', name: 'SGNP Gate Smart EV Stand', type: 'EV_STAND', capacity: 25, currentVehicles: 12, lat: 19.2298, lng: 72.8638 },
      ],
      destinations: ['Sanjay Gandhi National Park', 'Borivali East Railway', 'Kulupwadi'],
    },
    {
      id: 'stn-m7-dnd',
      name: 'Dindoshi (Goregaon East)',
      code: 'DNDS',
      lat: 19.1740,
      lng: 72.8630,
      type: 'tech_hub',
      baseDemandRate: 82,
      gates: [
        { id: 'G1', name: 'Gate 1 (Oberoi Mall & Commerz IT Park)', facing: 'West', currentSupply: 12 },
        { id: 'G2', name: 'Gate 2 (Film City Road Feeder)', facing: 'East', currentSupply: 9 },
      ],
      stands: [
        { id: 'std-m7-dnd-1', name: 'Oberoi Mall Feeder Stand', type: 'AUTO_STAND', capacity: 35, currentVehicles: 16, lat: 19.1748, lng: 72.8622 },
        { id: 'std-m7-dnd-2', name: 'Commerz IT Park Corporate Shuttle', type: 'SHUTTLE_HUB', capacity: 30, currentVehicles: 14, lat: 19.1735, lng: 72.8640 },
      ],
      destinations: ['Oberoi Mall', 'Commerz I, II & III IT Parks', 'Film City Gate', 'Gokuldham Colony'],
    },
    {
      id: 'stn-m7-gnd',
      name: 'Gundavali (Andheri East)',
      code: 'GNDV',
      lat: 19.1170,
      lng: 72.8560,
      type: 'mega_interchange',
      baseDemandRate: 105,
      gates: [
        { id: 'G1', name: 'Gate 1 (WEH Metro 1 Skywalk)', facing: 'South', currentSupply: 14 },
        { id: 'G2', name: 'Gate 2 (MIDC Central Road Feeder)', facing: 'East', currentSupply: 11 },
      ],
      stands: [
        { id: 'std-m7-gnd-1', name: 'Gundavali Junction Smart EV Stand', type: 'EV_STAND', capacity: 45, currentVehicles: 20, lat: 19.1178, lng: 72.8568 },
        { id: 'std-m7-gnd-2', name: 'Andheri East WEH Auto Syndicate', type: 'AUTO_STAND', capacity: 40, currentVehicles: 17, lat: 19.1162, lng: 72.8552 },
      ],
      destinations: ['WEH Metro Line 1', 'MIDC Andheri East IT Corridor', 'Nesco Center Goregaon', 'Chakala Hub'],
    },
  ]
};

export const MUMBAI_METRO_3 = {
  id: 'mumbai-metro-3',
  name: 'Metro Line 3: Aarey JVLR – BKC – Colaba (Aqua Line)',
  center: [19.0950, 72.8550],
  zoom: 12,
  stations: [
    {
      id: 'stn-m3-ary',
      name: 'Aarey JVLR',
      code: 'ARY3',
      lat: 19.1430,
      lng: 72.8720,
      type: 'terminus',
      baseDemandRate: 58,
      gates: [
        { id: 'G1', name: 'Gate 1 (JVLR Highway Concourse)', facing: 'North', currentSupply: 9 },
        { id: 'G2', name: 'Gate 2 (Aarey Forest Road)', facing: 'South', currentSupply: 6 },
      ],
      stands: [
        { id: 'std-m3-ary-1', name: 'Aarey Depot Smart EV Bay', type: 'EV_STAND', capacity: 30, currentVehicles: 14, lat: 19.1438, lng: 72.8728 },
      ],
      destinations: ['Powai Lake Shuttles', 'JVLR East-West Connector', 'Aarey Colony'],
    },
    {
      id: 'stn-m3-spz',
      name: 'SEEPZ (Special Economic Zone)',
      code: 'SPZ3',
      lat: 19.1280,
      lng: 72.8790,
      type: 'tech_hub',
      baseDemandRate: 98,
      gates: [
        { id: 'G1', name: 'Gate 1 (SEEPZ Gate 1 Main Entrance)', facing: 'East', currentSupply: 14 },
        { id: 'G2', name: 'Gate 2 (MIDC Central Road Link)', facing: 'West', currentSupply: 10 },
      ],
      stands: [
        { id: 'std-m3-spz-1', name: 'SEEPZ Gate 1 EV Feeder Hub', type: 'EV_STAND', capacity: 50, currentVehicles: 24, lat: 19.1288, lng: 72.8800 },
        { id: 'std-m3-spz-2', name: 'MIDC Cross Road Auto Bay', type: 'AUTO_STAND', capacity: 35, currentVehicles: 15, lat: 19.1272, lng: 72.8780 },
      ],
      destinations: ['SEEPZ IT Park (TCS, LTIMindtree)', 'MIDC Electronic Zone', 'Mahakali Caves'],
    },
    {
      id: 'stn-m3-t2',
      name: 'CSMIA Airport Terminal 2',
      code: 'T2AP',
      lat: 19.0980,
      lng: 72.8740,
      type: 'mega_interchange',
      baseDemandRate: 90,
      gates: [
        { id: 'G1', name: 'Gate 1 (T2 Arrivals Concourse)', facing: 'South', currentSupply: 16 },
        { id: 'G2', name: 'Gate 2 (Airport Sahar Elevated Road)', facing: 'North', currentSupply: 12 },
      ],
      stands: [
        { id: 'std-m3-t2-1', name: 'Airport Pre-paid EV Stand', type: 'EV_STAND', capacity: 60, currentVehicles: 30, lat: 19.0988, lng: 72.8750 },
        { id: 'std-m3-t2-2', name: 'Sahar Cargo Feeder Bay', type: 'BUS_FEEDER', capacity: 25, currentVehicles: 12, lat: 19.0972, lng: 72.8730 },
      ],
      destinations: ['Terminal 2 International & Domestic Flights', 'Sahar Luxury Hotels', 'Vile Parle East'],
    },
    {
      id: 'stn-m3-bkc',
      name: 'Bandra-Kurla Complex (BKC)',
      code: 'BKC3',
      lat: 19.0660,
      lng: 72.8660,
      type: 'tech_hub',
      baseDemandRate: 120,
      gates: [
        { id: 'G1', name: 'Gate 1 (ICICI Bank / SEBI Headquarters)', facing: 'North', currentSupply: 18 },
        { id: 'G2', name: 'Gate 2 (Jio World Centre & US Consulate)', facing: 'South', currentSupply: 15 },
        { id: 'G3', name: 'Gate 3 (MMRDA Grounds Concourse)', facing: 'East', currentSupply: 12 },
      ],
      stands: [
        { id: 'std-m3-bkc-1', name: 'BKC G-Block Electric Shuttle Superhub', type: 'SHUTTLE_HUB', capacity: 65, currentVehicles: 34, lat: 19.0668, lng: 72.8672 },
        { id: 'std-m3-bkc-2', name: 'Jio World Convention EV Bay', type: 'EV_STAND', capacity: 45, currentVehicles: 22, lat: 19.0652, lng: 72.8648 },
        { id: 'std-m3-bkc-3', name: 'BEST BKC Feeder Depot', type: 'BUS_FEEDER', capacity: 30, currentVehicles: 14, lat: 19.0675, lng: 72.8680 },
      ],
      destinations: ['Jio World Convention Centre', 'NSE / BSE BKC Towers', 'US Consulate General', 'MMRDA Office', 'Diamond Bourse'],
    },
  ]
};

export const MUMBAI_METRO_2B = {
  id: 'mumbai-metro-2b',
  name: 'Metro Line 2B: D.N. Nagar – BKC – Mandale (Yellow Line Ext)',
  center: [19.0620, 72.8580],
  zoom: 12,
  stations: [
    {
      id: 'stn-m2b-dnn',
      name: 'D.N. Nagar Junction',
      code: 'DNNB',
      lat: 19.1305,
      lng: 72.8355,
      type: 'interchange',
      baseDemandRate: 64,
      gates: [{ id: 'G1', name: 'Gate 1 (Link Road West)', facing: 'West', currentSupply: 9 }],
      stands: [{ id: 'std-m2b-dnn-1', name: 'Link Road Smart EV Stand', type: 'EV_STAND', capacity: 25, currentVehicles: 11, lat: 19.1312, lng: 72.8360 }],
      destinations: ['Line 1 & 2A Transfers', 'Lokhandwala', 'Juhu'],
    },
    {
      id: 'stn-m2b-bnd',
      name: 'National College (Bandra West)',
      code: 'NCBW',
      lat: 19.0620,
      lng: 72.8360,
      type: 'regular',
      baseDemandRate: 78,
      gates: [
        { id: 'G1', name: 'Gate 1 (Linking Road Shopping)', facing: 'West', currentSupply: 10 },
        { id: 'G2', name: 'Gate 2 (SVT College Road)', facing: 'East', currentSupply: 8 },
      ],
      stands: [
        { id: 'std-m2b-bnd-1', name: 'Linking Road Auto Stand', type: 'AUTO_STAND', capacity: 30, currentVehicles: 12, lat: 19.0628, lng: 72.8368 },
      ],
      destinations: ['Linking Road Fashion Street', 'Hill Road Bandra', 'Bandra Railway West'],
    },
    {
      id: 'stn-m2b-bkc',
      name: 'MMRDA (BKC East Link)',
      code: 'MMRD',
      lat: 19.0650,
      lng: 72.8680,
      type: 'tech_hub',
      baseDemandRate: 95,
      gates: [{ id: 'G1', name: 'Gate 1 (BKC Connector Flyover)', facing: 'South', currentSupply: 14 }],
      stands: [{ id: 'std-m2b-bkc-1', name: 'BKC East Feeder Hub', type: 'SHUTTLE_HUB', capacity: 40, currentVehicles: 19, lat: 19.0658, lng: 72.8690 }],
      destinations: ['Bandra-Kurla Complex Financial District', 'Kurla Railway Transfer'],
    },
    {
      id: 'stn-m2b-chm',
      name: 'Chembur (Line 2B)',
      code: 'CHM2',
      lat: 19.0620,
      lng: 72.8980,
      type: 'interchange',
      baseDemandRate: 72,
      gates: [{ id: 'G1', name: 'Gate 1 (Chembur Monorail Transfer)', facing: 'North', currentSupply: 10 }],
      stands: [{ id: 'std-m2b-chm-1', name: 'Chembur Naka Auto Stand', type: 'AUTO_STAND', capacity: 30, currentVehicles: 13, lat: 19.0628, lng: 72.8990 }],
      destinations: ['Mumbai Monorail Chembur', 'Eastern Freeway', 'RK Studios Area'],
    },
  ]
};

export const MUMBAI_METRO_6 = {
  id: 'mumbai-metro-6',
  name: 'Metro Line 6: Swami Samarth Nagar – JVLR – Vikhroli (Pink Line)',
  center: [19.1280, 72.8950],
  zoom: 12,
  stations: [
    {
      id: 'stn-m6-ssn',
      name: 'Swami Samarth Nagar (Lokhandwala)',
      code: 'SSNL',
      lat: 19.1410,
      lng: 72.8250,
      type: 'terminus',
      baseDemandRate: 65,
      gates: [{ id: 'G1', name: 'Gate 1 (Lokhandwala Complex Main Gate)', facing: 'West', currentSupply: 10 }],
      stands: [{ id: 'std-m6-ssn-1', name: 'Lokhandwala Circle Auto Hub', type: 'AUTO_STAND', capacity: 35, currentVehicles: 14, lat: 19.1418, lng: 72.8258 }],
      destinations: ['Lokhandwala Market', 'Oshiwara', 'Infinity Mall Andheri'],
    },
    {
      id: 'stn-m6-iit',
      name: 'IIT Bombay (Powai Lake)',
      code: 'IITP',
      lat: 19.1330,
      lng: 72.9150,
      type: 'tech_hub',
      baseDemandRate: 85,
      gates: [
        { id: 'G1', name: 'Gate 1 (IIT Bombay Main Gate)', facing: 'South', currentSupply: 12 },
        { id: 'G2', name: 'Gate 2 (Hiranandani Powai Link)', facing: 'North', currentSupply: 9 },
      ],
      stands: [
        { id: 'std-m6-iit-1', name: 'Hiranandani Galleria EV Stand', type: 'EV_STAND', capacity: 40, currentVehicles: 18, lat: 19.1338, lng: 72.9160 },
        { id: 'std-m6-iit-2', name: 'IIT Powai Auto Syndicate', type: 'AUTO_STAND', capacity: 30, currentVehicles: 12, lat: 19.1322, lng: 72.9140 }],
      destinations: ['IIT Bombay Campus', 'Hiranandani Gardens Powai', 'Crisil & Nomura Towers', 'Powai Lake Promenade'],
    },
    {
      id: 'stn-m6-vkh',
      name: 'Vikhroli EEH (Line 6 Terminus)',
      code: 'VKH6',
      lat: 19.1120,
      lng: 72.9320,
      type: 'interchange',
      baseDemandRate: 70,
      gates: [{ id: 'G1', name: 'Gate 1 (Eastern Express Highway & Godrej)', facing: 'East', currentSupply: 11 }],
      stands: [{ id: 'std-m6-vkh-1', name: 'Godrej One Corporate Feeder Hub', type: 'SHUTTLE_HUB', capacity: 35, currentVehicles: 15, lat: 19.1128, lng: 72.9330 }],
      destinations: ['Godrej One Campus', 'Eastern Express Highway', 'Vikhroli Railway Station'],
    },
  ]
};

// --- 3 MUMBAI SUBURBAN LOCAL LINES ---

export const MUMBAI_LOCAL_WESTERN = {
  id: 'mumbai-local-western',
  name: 'Western Railway Local: Churchgate – Dadar – Andheri – Borivali',
  center: [19.0600, 72.8400],
  zoom: 11,
  stations: [
    {
      id: 'stn-wr-chg',
      name: 'Churchgate (WR Terminus)',
      code: 'CCG',
      lat: 18.9322,
      lng: 72.8264,
      type: 'terminus',
      baseDemandRate: 130,
      gates: [
        { id: 'G1', name: 'Gate 1 (Nariman Point & Marine Drive)', facing: 'South', currentSupply: 18 },
        { id: 'G2', name: 'Gate 2 (Eros Cinema & Oval Maidan)', facing: 'East', currentSupply: 14 },
      ],
      stands: [
        { id: 'std-wr-chg-1', name: 'Nariman Point Black-and-Yellow Taxi Stand', type: 'AUTO_STAND', capacity: 50, currentVehicles: 24, lat: 18.9315, lng: 72.8258 },
        { id: 'std-wr-chg-2', name: 'BEST Churchgate Electric Bus Bay', type: 'BUS_FEEDER', capacity: 30, currentVehicles: 15, lat: 18.9330, lng: 72.8272 },
      ],
      destinations: ['Nariman Point Financial Towers', 'Bombay High Court', 'Mantralaya', 'Marine Drive'],
    },
    {
      id: 'stn-wr-ddr',
      name: 'Dadar Western (Central-Western Super Interchange)',
      code: 'DDRW',
      lat: 19.0185,
      lng: 72.8433,
      type: 'mega_interchange',
      baseDemandRate: 150,
      gates: [
        { id: 'G1', name: 'Gate 1 (Dadar West Flower Market)', facing: 'West', currentSupply: 20 },
        { id: 'G2', name: 'Gate 2 (Central Railway Overbridge)', facing: 'East', currentSupply: 18 },
      ],
      stands: [
        { id: 'std-wr-ddr-1', name: 'Plaza Cinema Taxi & Feeder Stand', type: 'AUTO_STAND', capacity: 55, currentVehicles: 26, lat: 19.0192, lng: 72.8425 },
        { id: 'std-wr-ddr-2', name: 'Shivaji Park Smart EV Stand', type: 'EV_STAND', capacity: 35, currentVehicles: 16, lat: 19.0178, lng: 72.8440 },
      ],
      destinations: ['Central Railway Local Interchange', 'Shivaji Park', 'Siddhivinayak Temple', 'Dadar TT Circle'],
    },
    {
      id: 'stn-wr-bnd',
      name: 'Bandra Western (Queen of Suburbs)',
      code: 'BAWR',
      lat: 19.0544,
      lng: 72.8402,
      type: 'mega_interchange',
      baseDemandRate: 135,
      gates: [
        { id: 'G1', name: 'Gate 1 (Bandra East BKC Skywalk)', facing: 'East', currentSupply: 18 },
        { id: 'G2', name: 'Gate 2 (Bandra West Hill Road Feeder)', facing: 'West', currentSupply: 16 },
      ],
      stands: [
        { id: 'std-wr-bnd-1', name: 'Bandra East BKC Share Auto Stand', type: 'AUTO_STAND', capacity: 60, currentVehicles: 30, lat: 19.0552, lng: 72.8415 },
        { id: 'std-wr-bnd-2', name: 'Bandra West Smart EV Stand', type: 'EV_STAND', capacity: 40, currentVehicles: 19, lat: 19.0538, lng: 72.8390 },
      ],
      destinations: ['Bandra-Kurla Complex (BKC) Financial District', 'Linking Road', 'Mount Mary Church', 'Carter Road'],
    },
    {
      id: 'stn-wr-and',
      name: 'Andheri Western (Metro 1 Interchange)',
      code: 'ADH',
      lat: 19.1197,
      lng: 72.8464,
      type: 'mega_interchange',
      baseDemandRate: 160,
      gates: [
        { id: 'G1', name: 'Gate 1 (Andheri West SV Road Concourse)', facing: 'West', currentSupply: 22 },
        { id: 'G2', name: 'Gate 2 (Andheri East Metro Skywalk)', facing: 'East', currentSupply: 20 },
      ],
      stands: [
        { id: 'std-wr-and-1', name: 'Andheri West SV Road Auto Stand', type: 'AUTO_STAND', capacity: 70, currentVehicles: 35, lat: 19.1190, lng: 72.8455 },
        { id: 'std-wr-and-2', name: 'Andheri East MIDC Smart EV Hub', type: 'EV_STAND', capacity: 50, currentVehicles: 25, lat: 19.1205, lng: 72.8475 },
      ],
      destinations: ['Metro Line 1 (Versova-Ghatkopar)', 'SEEPZ & MIDC IT Corridor', 'Juhu Beach', 'Lokhandwala'],
    },
    {
      id: 'stn-wr-bor',
      name: 'Borivali Western (Northern Gateway Terminus)',
      code: 'BVI',
      lat: 19.2290,
      lng: 72.8570,
      type: 'terminus',
      baseDemandRate: 145,
      gates: [
        { id: 'G1', name: 'Gate 1 (Borivali West SV Road)', facing: 'West', currentSupply: 20 },
        { id: 'G2', name: 'Gate 2 (Borivali East National Park Link)', facing: 'East', currentSupply: 18 },
      ],
      stands: [
        { id: 'std-wr-bor-1', name: 'Borivali West Station Auto Hub', type: 'AUTO_STAND', capacity: 65, currentVehicles: 32, lat: 19.2282, lng: 72.8560 },
        { id: 'std-wr-bor-2', name: 'Gorai Ferry Link Smart EV Stand', type: 'EV_STAND', capacity: 40, currentVehicles: 20, lat: 19.2298, lng: 72.8580 },
      ],
      destinations: ['Sanjay Gandhi National Park', 'Gorai & EsselWorld Ferry', 'IC Colony', 'Kandivali'],
    },
  ]
};

export const MUMBAI_LOCAL_CENTRAL = {
  id: 'mumbai-local-central',
  name: 'Central Railway Local: CSMT – Dadar – Kurla – Ghatkopar – Thane',
  center: [19.0700, 72.8900],
  zoom: 11,
  stations: [
    {
      id: 'stn-cr-csmt',
      name: 'CSMT (Chhatrapati Shivaji Maharaj Terminus)',
      code: 'CSMT',
      lat: 18.9398,
      lng: 72.8355,
      type: 'terminus',
      baseDemandRate: 155,
      gates: [
        { id: 'G1', name: 'Gate 1 (Fort & Ballard Estate Concourse)', facing: 'South', currentSupply: 24 },
        { id: 'G2', name: 'Gate 2 (DN Road Heritage Concourse)', facing: 'West', currentSupply: 18 },
      ],
      stands: [
        { id: 'std-cr-csmt-1', name: 'Fort Business District Taxi Stand', type: 'AUTO_STAND', capacity: 60, currentVehicles: 28, lat: 18.9390, lng: 72.8348 },
        { id: 'std-cr-csmt-2', name: 'BEST Electric Feeder Terminal', type: 'BUS_FEEDER', capacity: 35, currentVehicles: 18, lat: 18.9405, lng: 72.8362 },
      ],
      destinations: ['Fort Financial District', 'Ballard Estate Port Hub', 'RBI Headquarters', 'Nariman Point'],
    },
    {
      id: 'stn-cr-ddr',
      name: 'Dadar Central (CR-WR Super Hub)',
      code: 'DDRC',
      lat: 19.0185,
      lng: 72.8433,
      type: 'mega_interchange',
      baseDemandRate: 165,
      gates: [
        { id: 'G1', name: 'Gate 1 (Dadar East Swami Narayan Temple)', facing: 'East', currentSupply: 22 },
        { id: 'G2', name: 'Gate 2 (Dadar TT Circle)', facing: 'North', currentSupply: 18 },
      ],
      stands: [
        { id: 'std-cr-ddr-1', name: 'Dadar TT Circle Auto Syndicate', type: 'AUTO_STAND', capacity: 65, currentVehicles: 30, lat: 19.0192, lng: 72.8445 },
        { id: 'std-cr-ddr-2', name: 'Parel Hospital Cluster EV Feeder', type: 'EV_STAND', capacity: 40, currentVehicles: 19, lat: 19.0175, lng: 72.8420 },
      ],
      destinations: ['Western Railway Interchange', 'KEM & Tata Memorial Hospitals', 'Matunga East', 'Prabhadevi'],
    },
    {
      id: 'stn-cr-krl',
      name: 'Kurla Central (Central & Harbour Interchange)',
      code: 'KRLC',
      lat: 19.0650,
      lng: 72.8790,
      type: 'mega_interchange',
      baseDemandRate: 140,
      gates: [
        { id: 'G1', name: 'Gate 1 (Kurla West LBS Marg & Phoenix Marketcity)', facing: 'West', currentSupply: 20 },
        { id: 'G2', name: 'Gate 2 (Kurla East Nehru Nagar & BKC Link)', facing: 'East', currentSupply: 18 },
      ],
      stands: [
        { id: 'std-cr-krl-1', name: 'Kurla West Phoenix Marketcity Stand', type: 'AUTO_STAND', capacity: 55, currentVehicles: 25, lat: 19.0658, lng: 72.8780 },
        { id: 'std-cr-krl-2', name: 'BKC East Direct Shared EV Stand', type: 'EV_STAND', capacity: 50, currentVehicles: 24, lat: 19.0642, lng: 72.8800 },
      ],
      destinations: ['Harbour Line Interchange', 'Phoenix Marketcity Mall', 'BKC G-Block Shuttles', 'Nehru Nagar MSRTC Depot'],
    },
    {
      id: 'stn-cr-ght',
      name: 'Ghatkopar Central (Metro 1 Interchange)',
      code: 'GHTC',
      lat: 19.0860,
      lng: 72.9080,
      type: 'mega_interchange',
      baseDemandRate: 150,
      gates: [
        { id: 'G1', name: 'Gate 1 (Metro 1 Elevated Concourse)', facing: 'West', currentSupply: 22 },
        { id: 'G2', name: 'Gate 2 (Ghatkopar East Station Road)', facing: 'East', currentSupply: 16 },
      ],
      stands: [
        { id: 'std-cr-ght-1', name: 'Ghatkopar East Market Auto Stand', type: 'AUTO_STAND', capacity: 50, currentVehicles: 24, lat: 19.0868, lng: 72.9090 },
        { id: 'std-cr-ght-2', name: 'R-City Mall Smart EV Stand', type: 'EV_STAND', capacity: 40, currentVehicles: 20, lat: 19.0852, lng: 72.9070 },
      ],
      destinations: ['Metro Line 1 to Andheri & Versova', 'R-City Mall', 'Pant Nagar', 'Vikhroli West'],
    },
    {
      id: 'stn-cr-thn',
      name: 'Thane Central (Major Suburban Interchange)',
      code: 'TNA',
      lat: 19.1860,
      lng: 72.9750,
      type: 'terminus',
      baseDemandRate: 155,
      gates: [
        { id: 'G1', name: 'Gate 1 (Thane West Gokhale Road Concourse)', facing: 'West', currentSupply: 24 },
        { id: 'G2', name: 'Gate 2 (Thane East Kopri & EEH Concourse)', facing: 'East', currentSupply: 20 },
      ],
      stands: [
        { id: 'std-cr-thn-1', name: 'Thane West Station Auto Stand', type: 'AUTO_STAND', capacity: 70, currentVehicles: 34, lat: 19.1868, lng: 72.9740 },
        { id: 'std-cr-thn-2', name: 'Ghodbunder Road Smart EV Hub', type: 'EV_STAND', capacity: 50, currentVehicles: 26, lat: 19.1852, lng: 72.9760 },
      ],
      destinations: ['Ghodbunder Road IT Parks', 'Kopri Thane East', 'Viviana Mall', 'Trans-Harbour Line to Vashi'],
    },
  ]
};

export const MUMBAI_LOCAL_HARBOUR = {
  id: 'mumbai-local-harbour',
  name: 'Harbour Railway Local: CSMT – Vadala – Kurla – Vashi – Panvel',
  center: [19.0400, 72.9300],
  zoom: 11,
  stations: [
    {
      id: 'stn-hr-vdl',
      name: 'Vadala Road (Harbour Line Interchange)',
      code: 'VDLR',
      lat: 19.0160,
      lng: 72.8580,
      type: 'interchange',
      baseDemandRate: 85,
      gates: [
        { id: 'G1', name: 'Gate 1 (Wadala Monorail Link)', facing: 'East', currentSupply: 12 },
        { id: 'G2', name: 'Gate 2 (Veermata Jijabai Technological Institute - VJTI)', facing: 'West', currentSupply: 10 },
      ],
      stands: [
        { id: 'std-hr-vdl-1', name: 'Wadala Station Auto Stand', type: 'AUTO_STAND', capacity: 35, currentVehicles: 15, lat: 19.0168, lng: 72.8590 },
      ],
      destinations: ['VJTI Engineering Campus', 'Wadala Monorail', 'BPT Port Area'],
    },
    {
      id: 'stn-hr-krl',
      name: 'Kurla Harbour Platforms',
      code: 'KRLH',
      lat: 19.0650,
      lng: 72.8790,
      type: 'mega_interchange',
      baseDemandRate: 110,
      gates: [{ id: 'G1', name: 'Gate 1 (Kurla East Transit Interchange)', facing: 'East', currentSupply: 16 }],
      stands: [{ id: 'std-hr-krl-1', name: 'Kurla East Auto Stand', type: 'AUTO_STAND', capacity: 45, currentVehicles: 21, lat: 19.0658, lng: 72.8800 }],
      destinations: ['Central Railway Local Interchange', 'BKC East Feeder', 'Chembur'],
    },
    {
      id: 'stn-hr-vsh',
      name: 'Vashi (Gateway to Navi Mumbai)',
      code: 'VSH',
      lat: 19.0770,
      lng: 72.9980,
      type: 'tech_hub',
      baseDemandRate: 125,
      gates: [
        { id: 'G1', name: 'Gate 1 (Vashi Sector 30A IT & Inorbit Mall)', facing: 'North', currentSupply: 18 },
        { id: 'G2', name: 'Gate 2 (APMC Market & Highway Concourse)', facing: 'South', currentSupply: 15 },
      ],
      stands: [
        { id: 'std-hr-vsh-1', name: 'Inorbit Vashi Smart EV Stand', type: 'EV_STAND', capacity: 50, currentVehicles: 26, lat: 19.0778, lng: 72.9990 },
        { id: 'std-hr-vsh-2', name: 'Vashi Station Plaza Auto Stand', type: 'AUTO_STAND', capacity: 55, currentVehicles: 28, lat: 19.0762, lng: 72.9970 },
      ],
      destinations: ['APMC Wholesale Market', 'Inorbit Mall Vashi', 'Sector 17 Commercial Hub', 'Kopar Khairane IT Park'],
    },
    {
      id: 'stn-hr-pnv',
      name: 'Panvel (Harbour Terminus & Airport Link)',
      code: 'PNVL',
      lat: 18.9900,
      lng: 73.1180,
      type: 'terminus',
      baseDemandRate: 115,
      gates: [
        { id: 'G1', name: 'Gate 1 (Panvel Bus Depot & Navi Mumbai Airport Link)', facing: 'North', currentSupply: 18 },
        { id: 'G2', name: 'Gate 2 (New Panvel East Sector)', facing: 'South', currentSupply: 14 },
      ],
      stands: [
        { id: 'std-hr-pnv-1', name: 'Panvel Station Auto Syndicate', type: 'AUTO_STAND', capacity: 50, currentVehicles: 24, lat: 18.9908, lng: 73.1190 },
        { id: 'std-hr-pnv-2', name: 'NMIA Airport Shuttles Stand', type: 'SHUTTLE_HUB', capacity: 35, currentVehicles: 16, lat: 18.9892, lng: 73.1170 },
      ],
      destinations: ['Navi Mumbai International Airport (NMIA)', 'New Panvel', 'Khandeshwar', 'Kharghar Central Park'],
    },
  ]
};

export const CORRIDOR_DATA_MAP = {
  'mumbai-metro-1': MUMBAI_METRO_1,
  'mumbai-metro-2a': MUMBAI_METRO_2A,
  'mumbai-metro-7': MUMBAI_METRO_7,
  'mumbai-metro-3': MUMBAI_METRO_3,
  'mumbai-metro-2b': MUMBAI_METRO_2B,
  'mumbai-metro-6': MUMBAI_METRO_6,
  'mumbai-local-western': MUMBAI_LOCAL_WESTERN,
  'mumbai-local-central': MUMBAI_LOCAL_CENTRAL,
  'mumbai-local-harbour': MUMBAI_LOCAL_HARBOUR,
};
