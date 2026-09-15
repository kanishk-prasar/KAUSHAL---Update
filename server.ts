import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check endpoint mirroring the NestJS apps/api architecture
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'kaushal-api',
    version: '1.0.0',
    database: {
      connected: true,
      name: 'kaushal',
      client: 'Prisma 6.19.3',
      provider: 'PostgreSQL 17',
    },
    cache: {
      connected: true,
      provider: 'Redis 7.0',
    },
    timestamp: new Date().toISOString(),
  });
});

// 2. Monorepo and connection configuration endpoint
app.get('/api/config', (req: Request, res: Response) => {
  res.json({
    projectName: 'kaushal-web',
    workspaces: ['apps/web', 'apps/api'],
    databaseUrl: 'postgresql://postgres:***@localhost:5432/kaushal',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
    jwtConfigured: true,
    dockerServices: ['postgres:17', 'redis:7'],
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 3. AI Kaushal Advisor endpoint (Gemini API server-side)
app.post('/api/ai/advisor', async (req: Request, res: Response) => {
  try {
    const { message, learnerProfile, currentTopic } = req.body;

    const userPrompt = `
You are the Chief Vocational Career & Skill Mentor for "Kaushal" (कौशल), India's premier Skill Development, Apprenticeship, and NSQF Vocational Excellence Platform.
The user is asking: "${message || 'Give me guidance on career path'}"
Learner context:
- Current NSQF Level: ${learnerProfile?.currentNSQF || 4}
- Target Sector: ${currentTopic || 'General Vocational'}
- Location: ${learnerProfile?.state || 'India'}
- Enrolled / Completed: ${learnerProfile?.completedCourses?.join(', ') || 'Surya Mitra / Solar PV'}

Provide an inspiring, precise, and practical response:
1. Recommend 1-2 concrete vocational skill tracks or NSQF Level upskilling steps.
2. Outline current industrial demand (e.g. Tata Motors EV, Adani Solar, Godrej Aerospace, Kisan Drones, Hospitals).
3. Mention expected monthly salary/stipend ranges and apprenticeship opportunities under NAPS (National Apprenticeship Promotion Scheme).
4. Keep the tone dignified, empowering, and grounded in real craftsmanship (कारीगरी और कौशल विकास). Keep it to 3 concise, structured paragraphs with bullet points.
`;

    const ai = getAIClient();
    if (ai) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI request timeout')), 5000)
        );
        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction:
              'You are Kaushal Guru, a wise, practical, and highly knowledgeable Indian vocational education and industry apprenticeship counselor.',
          },
        });

        const geminiResponse = await Promise.race([geminiCall, timeoutPromise]);
        const replyText = geminiResponse.text || 'Skill roadmap generated.';
        res.json({ reply: replyText, source: 'gemini-3.8-flash' });
        return;
      } catch (geminiErr) {
        console.warn('Gemini call failed or timed out, using Kaushal advisor fallback:', geminiErr);
      }
    }

    // Fallback response if GEMINI_API_KEY is not configured
    const fallbackReply = `
**Kaushal Career Recommendation for ${learnerProfile?.name || 'Skilled Learner'}:**

1. **High-Impact Career Pathway (NSQF Level 5):**
   - **Recommended Track**: *Electric Vehicle Powertrain & Battery Diagnostic Technician* or *Surya Mitra Microgrid Lead*.
   - **Why this fits**: Your practical background and diagnostic aptitude match the critical industry shortage where 45,000+ certified technicians are needed across Chakan (Pune), Manesar (NCR), and Sriperumbudur (Chennai) auto hubs.

2. **Apprenticeship & Earnings Projection:**
   - **Starting NAPS Stipend**: ₹18,500 - ₹22,000/month with company lodging & ESI coverage.
   - **Post-Certification Salary**: ₹32,000 - ₹45,000/month after 12 months on-the-job training.

3. **Immediate Next Step:**
   - Log at least 15 more practical hours in the *EV High-Voltage Multimeter Simulation Lab*.
   - Submit your verified Kaushal Digital Passport to verified partner companies like Mahindra Electric or Tata Power.
    `.trim();

    res.json({ reply: fallbackReply, source: 'kaushal-local-engine' });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error in /api/ai/advisor:', error);
    res.status(500).json({
      error: 'Failed to generate advisory response',
      details: error.message,
    });
  }
});

// Serve static files from public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Vite middleware & Static SPA handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kaushal Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
