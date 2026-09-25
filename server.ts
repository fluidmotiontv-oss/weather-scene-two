import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize server-side Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Endpoint for Live AI Commentary
app.post('/api/commentary', async (req, res) => {
  try {
    const { prompt, speaker, location, telemetry } = req.body;
    const model = 'gemini-3.8-flash';

    const systemPrompt = `You are an AI character engine for the high-octane DRAGON 9 FLUID MOTION BROADCAST NETWORK.
Speaker Persona: ${speaker || 'DAVE MCKENZIE (Main Booth Host)'}.
Active Location: ${location || 'Dragon 9 Control Booth'}.
Current Atmospheric Telemetry: ${JSON.stringify(telemetry || { pressure: '982 hPa', wind: '20-kt SE Offshore', waveHeight: '3.8m', heartRate: '145 BPM' })}.

Character Guidelines:
1. DAVE MCKENZIE (Booth Host): Energetic, authoritative action-sports play-by-play anchor. Talk about telemetry redlining, 432Hz harmonic sync, atmospheric rivers, barometric pressure bottoming out.
2. JAY (Live from Pee Dub / NZ): Screaming over the ocean spray, reporting 20-kt SE offshore winds grooming 3-4m sets into cavernous black sand perfection.
3. PERRY CLARKE (Athlete Feed HUD): Breathing heavily, heart rate at 145 BPM, inside the tube spitting black sand and liquid glass.
4. PRETTY WORRELL (Live from Whistler, BC): Yelling over high alpine blizzard howl, 45cm coastal cement snow dump, avalanche bombs detonating, 800m freezing level.
5. MISAKI (Studio Intercept, Tokyo): Crisp, hyper-organized augmented broadcast, holographic weather mapping, Pacific low-pressure slingshot, Niseko patrol updates.

Response style: High-energy, intense, authentic extreme sports broadcast language. Keep response concise (2-4 sentences max). Do not break character.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt ? prompt : `Provide a live broadcast update on current atmospheric conditions at ${location}.`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.9,
      },
    });

    res.json({
      text: response.text || 'Telemetry sync unstable... rerouting 432Hz stream.',
      speaker,
      timestamp: new Date().toLocaleTimeString(),
    });
  } catch (error: any) {
    console.error('Error generating commentary:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate commentary' });
  }
});

// API Endpoint for Atmospheric Forecast Analysis
app.post('/api/telemetry-analysis', async (req, res) => {
  try {
    const { zone, wind, swell, pressure, snow } = req.body;
    const model = 'gemini-3.8-flash';

    const response = await ai.models.generateContent({
      model,
      contents: `Analyze the following extreme environment telemetry for Zone: ${zone}. 
Wind: ${wind}, Swell: ${swell}, Barometric Pressure: ${pressure}, Snow/Freezing: ${snow}. 
Provide a 3-bullet Dragon 9 Tactical Report assessing wave/snow quality, hazard level, and optimal riding window.`,
    });

    res.json({ report: response.text });
  } catch (error: any) {
    console.error('Error in telemetry analysis:', error);
    res.status(500).json({ error: 'Failed to analyze telemetry' });
  }
});

// Start Server with Vite Middleware in Dev or Static files in Production
async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DRAGON 9 BROADCAST ENGINE] Running on http://0.0.0.0:${PORT}`);
  });
}

start();
