export interface BroadcastFeed {
  id: 'peedub' | 'whistler' | 'tokyo' | 'booth';
  title: string;
  location: string;
  reporter: string;
  role: string;
  image: string;
  status: 'LIVE - IMPACT ZONE' | 'WHITEOUT WARNING' | 'STUDIO INTERCEPT' | 'MAIN BOOTH';
  badgeColor: string;
  telemetry: {
    wind: string;
    windDirection: string;
    pressure: string;
    temp: string;
    waveOrSnow: string;
    heartRate?: number;
    gForce?: string;
    freezingLevel?: string;
    avalancheRisk?: string;
  };
  audioBg: 'surf' | 'alpine' | 'off';
  description: string;
}

export const BROADCAST_FEEDS: Record<string, BroadcastFeed> = {
  peedub: {
    id: 'peedub',
    title: 'PEE DUB // TASMAN SEA RESET',
    location: 'Piha / PW, New Zealand',
    reporter: 'JAY & PERRY CLARKE',
    role: 'Impact Zone Field Unit',
    image: '/src/assets/images/surf_barrel_nz_black_sand_1790306465091.jpg',
    status: 'LIVE - IMPACT ZONE',
    badgeColor: 'bg-emerald-500',
    audioBg: 'surf',
    description: '3-to-4 meter sets groomed by 20-knot southeast offshore winds into heavy black sand cavernous tubes.',
    telemetry: {
      wind: '20-KT SE OFFSHORE',
      windDirection: '135° SE',
      pressure: '982 hPa (DROPPING)',
      temp: '17°C WATER',
      waveOrSnow: '3.8m @ 16s PERIOD',
      heartRate: 145,
      gForce: '2.4 G',
    },
  },
  whistler: {
    id: 'whistler',
    title: 'WHISTLER // HIGH ALPINE WHITEOUT',
    location: 'Whistler Blackcomb, BC, Canada',
    reporter: 'PRETTY WORRELL',
    role: 'Alpine Severe Storm Unit',
    image: '/src/assets/images/whistler_alpine_blizzard_1790306482533.jpg',
    status: 'WHITEOUT WARNING',
    badgeColor: 'bg-rose-500',
    audioBg: 'alpine',
    description: 'Atmospheric river turned to coastal cement ice, 45cm fresh snow, freezing level plummeting to 800m.',
    telemetry: {
      wind: '65 KM/H GALE GUSTS',
      windDirection: '310° NW',
      pressure: '978 hPa',
      temp: '-8°C AIR',
      waveOrSnow: '45 CM NEW SNOW',
      freezingLevel: '800M',
      avalancheRisk: 'LEVEL 4 HIGH (RED)',
    },
  },
  tokyo: {
    id: 'tokyo',
    title: 'TOKYO CONTROL // PACIFIC MATRIX',
    location: 'Shibuya Command Center, Tokyo, Japan',
    reporter: 'MISAKI',
    role: 'Atmospheric Telemetry Analyst',
    image: '/src/assets/images/tokyo_weather_control_room_1790306496236.jpg',
    status: 'STUDIO INTERCEPT',
    badgeColor: 'bg-cyan-500',
    audioBg: 'off',
    description: 'Pacific low-pressure slingshot tracking live. Niseko patrol dropping ropes and prepping for massive northern dump.',
    telemetry: {
      wind: 'PACIFIC SLINGSHOT',
      windDirection: '270° W',
      pressure: '980 hPa ISO',
      temp: '14°C CONTROL',
      waveOrSnow: 'HOLOGRAPHIC GRID ACTIVE',
    },
  },
  booth: {
    id: 'booth',
    title: 'DRAGON 9 HQ // THE BOOTH',
    location: 'Global Broadcast Desk',
    reporter: 'DAVE MCKENZIE & STAN',
    role: 'Lead Broadcast Anchors',
    image: '/src/assets/images/dragon9_booth_studio_1790306507374.jpg',
    status: 'MAIN BOOTH',
    badgeColor: 'bg-amber-500',
    audioBg: 'off',
    description: 'Main studio deck monitoring redline telemetry across the Dragon 9 cycle and 432Hz harmonic sync.',
    telemetry: {
      wind: 'SYNCED MESH',
      windDirection: 'GLOBAL RELAY',
      pressure: '982 hPa AVG',
      temp: '432Hz HARMONIC',
      waveOrSnow: 'MINUTE 53 / CYCLE 9',
    },
  },
};

export interface TranscriptLine {
  id: number;
  speaker: string;
  location: string;
  time: string;
  text: string;
  audioMarker?: string;
  feedId: 'peedub' | 'whistler' | 'tokyo' | 'booth';
}

export const BROADCAST_TRANSCRIPT: TranscriptLine[] = [
  {
    id: 1,
    speaker: 'DAVE MCKENZIE',
    location: 'Main Booth',
    time: '00:01',
    feedId: 'booth',
    text: 'Telemetry is redlining across the board, people! The Dragon 9 cycle is pushing us straight into the deep end of the atmospheric pool today. We’ve got systems colliding, barometric pressure bottoming out, and absolute perfection firing on the black sands. Let\'s get right into the fluid motion of the future. Jay, talk to me about pee dub!',
    audioMarker: '[AUDIO: 432Hz drone vibrates heavily through audio channels]',
  },
  {
    id: 2,
    speaker: 'JAY',
    location: 'Pee Dub (NZ)',
    time: '00:18',
    feedId: 'peedub',
    text: 'Dave, the chaos has completely organized! The Tasman Sea just hit the reset button. That chunky southwesterly from this morning has swung into a stiff, 20-knot southeast offshore wind. It is violently grooming these 3-to-4 meter sets into absolute cavernous perfection.',
  },
  {
    id: 3,
    speaker: 'JAY',
    location: 'Pee Dub (NZ)',
    time: '00:32',
    feedId: 'peedub',
    text: 'The afternoon sun is lighting up the spray like liquid glass. Perry is currently out the back, sitting out the wider sets and waiting for a monster. Perry, what is the view from the impact zone?!',
  },
  {
    id: 4,
    speaker: 'PERRY CLARKE',
    location: 'Pee Dub Impact Zone',
    time: '00:44',
    feedId: 'peedub',
    text: 'I am quite literally sitting inside the fluid motion of the future right now, Jay! It is heavy, it is spitting black sand and salt, and it is flawless! If you are holding the rail, you are making it out. Stan, my neural link is vibrating out of my skull—throw this to the snow before I get caught inside a ten-foot closeout!',
  },
  {
    id: 5,
    speaker: 'STAN',
    location: 'Control Booth',
    time: '00:58',
    feedId: 'booth',
    text: 'Rerouting the feed! Hold your breath, Perry. Engaging kinetic dampeners. Dropping the thermal overlay and jumping to the high alpine. Pretty, you are live in 3... 2...',
    audioMarker: '[AUDIO: Ocean roar sucked into vacuum, replaced by alpine howl]',
  },
  {
    id: 6,
    speaker: 'PRETTY WORRELL',
    location: 'Whistler, BC',
    time: '01:08',
    feedId: 'whistler',
    text: 'Dave! Stan! I can barely hear the mesh feed over this wind! We have gone full whiteout up here! The atmospheric river completely turned to ice overnight. The freezing level plummeted straight down to 800 meters, and we have 45 centimeters of coastal cement dropping out of the sky!',
  },
  {
    id: 7,
    speaker: 'PRETTY WORRELL',
    location: 'Whistler, BC',
    time: '01:25',
    feedId: 'whistler',
    text: 'This is an unseasonal, massive system! Avalanche warnings are flashing red across all sectors. The patrol teams are throwing bombs, but the visibility is absolute zero. If you are tracking the back bowls, stay out of the terrain traps today. The mountain is wide awake and she is angry. Misaki, tell me this storm is tracking your way!',
  },
  {
    id: 8,
    speaker: 'MISAKI',
    location: 'Tokyo Control Room',
    time: '01:42',
    feedId: 'tokyo',
    text: 'Mōretsuna fukisusabu yuki desu! (It\'s a fierce blowing snow!) We see the data, Pretty! That exact low-pressure system is slingshotting across the Pacific grid right now. Niseko patrol is watching the telemetry spike. They are dropping the ropes, securing the lift towers, and prepping for a massive dump. The entire northern hemisphere is shifting gears into heavy winter.',
    audioMarker: '[AUDIO: Clean fiber-optic hum cuts through blizzard noise]',
  },
  {
    id: 9,
    speaker: 'DAVE MCKENZIE',
    location: 'Main Booth',
    time: '01:55',
    feedId: 'booth',
    text: 'Outstanding. Clock is at minute 53 of the Dragon 9 cycle. We are witnessing absolute extremes on both sides of the Pacific today. Respect the ocean, respect the mountain, and stay locked to the 432Hz frequency. We’ll see you on the flip side of the hour.',
    audioMarker: '[AUDIO: 432Hz hum swells into cinematic bass drop]',
  },
];
