import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GoogleGenAI } from '@google/genai';
import { User } from './src/models/User.js';
import { authenticateToken, AuthRequest } from './src/middleware/auth.js';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careerpilot';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_careerpilot_jwt_key_2026';

// Middleware for parsing JSON bodies
app.use(express.json({ limit: '10mb' }));

// Helper regex for email validation
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// Track MongoDB connection state
let isMongoConnected = false;

// Connect to MongoDB Database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    isMongoConnected = true;
    console.log(`[Database] Connected successfully to MongoDB at ${MONGODB_URI}`);
  })
  .catch((err) => {
    isMongoConnected = false;
    console.warn(`[Database Warning] MongoDB connection failed: ${err.message}`);
    console.warn(`[Database Note] Make sure MongoDB is running locally or MONGODB_URI in .env is correct.`);
  });

// Setup Gemini AI Client if API key is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// ==========================================
// AUTHENTICATION API ENDPOINTS
// ==========================================

/**
 * POST /api/signup
 * Register a new user account with name, email, and password
 */
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Server-side Input Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // Check DB connection
    if (!isMongoConnected && mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database connection unavailable. Please check if MongoDB is running locally.',
      });
    }

    // 2. Prevent Duplicate Email Registration
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    // 3. Hash Password using bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save User to MongoDB Database
    const newUser = new User({
      name: cleanName,
      email: cleanEmail,
      hashedPassword,
    });
    await newUser.save();

    // 5. Generate JSON Web Token (JWT)
    const token = jwt.sign(
      {
        userId: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 6. Return Success Response
    return res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return res.status(500).json({ error: error.message || 'Server error during signup.' });
  }
});

/**
 * POST /api/login
 * Authenticate existing user with email and password
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Server-side Input Validation
    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Please enter your password.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Check DB connection
    if (!isMongoConnected && mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database connection unavailable. Please check if MongoDB is running.',
      });
    }

    // 2. Find User in Database
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 3. Verify Password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 4. Issue JWT Token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Return Success Response
    return res.status(200).json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: error.message || 'Server error during login.' });
  }
});

/**
 * GET /api/dashboard (Protected Route)
 * Returns protected user telemetry dashboard data (requires valid JWT in Auth header)
 */
app.get('/api/dashboard', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized request.' });
    }

    // Fetch user details from DB excluding password
    const user = await User.findById(userId).select('-hashedPassword');
    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    // Protected telemetry stats payload for user dashboard
    return res.status(200).json({
      message: `Welcome, ${user.name}!`,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      dashboardStats: {
        resumesScored: 5,
        avgAtsScore: 92,
        interviewCallbackLift: '+28%',
        skillUpgradesCompleted: 3,
        targetRole: 'Senior Software Engineer / Tech Lead',
      },
    });
  } catch (error: any) {
    console.error('Dashboard Error:', error);
    return res.status(500).json({ error: error.message || 'Server error fetching dashboard.' });
  }
});

/**
 * POST /api/logout
 * Log out endpoint (clears client session)
 */
app.post('/api/logout', (req, res) => {
  return res.status(200).json({ message: 'Logged out successfully.' });
});

/**
 * BONUS: POST /api/forgot-password
 * Initiates password reset flow by generating a 6-digit reset code
 */
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      // Security best practice: don't reveal if user email exists, but return clear message
      return res.status(200).json({
        message: 'If an account exists with this email, password reset instructions have been generated.',
        demoResetCode: null,
      });
    }

    // Generate 6-digit reset token
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetToken = resetCode;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // Expiry in 1 hour
    await user.save();

    return res.status(200).json({
      message: 'Password reset code generated successfully!',
      demoResetCode: resetCode, // Returned for easy instant testing in basic flow
    });
  } catch (error: any) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ error: error.message || 'Error processing forgot password.' });
  }
});

/**
 * BONUS: POST /api/reset-password
 * Resets user password using reset code and new password
 */
app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ error: 'Email, reset code, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({
      email: cleanEmail,
      resetToken: resetCode.trim(),
    });

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired password reset code.' });
    }

    // Hash new password and update user record
    user.hashedPassword = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      message: 'Password has been reset successfully! You can now log in with your new password.',
    });
  } catch (error: any) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ error: error.message || 'Error resetting password.' });
  }
});

// ==========================================
// RESUME SCORING & AI ENDPOINTS (Existing)
// ==========================================

app.post('/api/score-resume', async (req, res) => {
  const { resumeText, targetRole, targetJobDescription } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: 'resumeText is required' });
  }

  if (!ai) {
    return res.status(503).json({ error: 'AI engine API key not configured on server' });
  }

  try {
    const prompt = `You are the lead ATS Evaluation & Career Intelligence engine for CareerPilot.
Analyze the following candidate resume for the target role: "${targetRole || 'Software Engineer'}".
${targetJobDescription ? `Target Job Description: ${targetJobDescription}` : ''}

Candidate Resume:
"""
${resumeText}
"""

Evaluate this resume strictly and objectively. Return a JSON object with:
- overallScore (number 0-100)
- trajectoryBand (string e.g. "Top 3% - Elite Market Calibration")
- percentile (string e.g. "97th Percentile")
- interviewBoost (string e.g. "+24% Interview Callbacks")
- atsReadability: { score (0-100), status (string), strengths (array of strings), issues (array of strings) }
- impactAndMetrics: { score (0-100), quantifiedRate (string), actionVerbDensity (string), strengths (array of strings), suggestions (array of strings) }
- keywordsAndFit: { score (0-100), matchedKeywords (array of strings), missingKeywords (array of strings), densityComment (string) }
- structureAndStyle: { score (0-100), pageLength (string), wordCount (number), bulletFormat (string), suggestions (array of strings) }
- detectedSkillGaps: array of { skill (string), category (string), priority ("critical"|"high"|"recommended"), avgSalaryLift (string), marketDemand (0-100), relatedCourseId (string), reason (string) }
- lineRewrites: array of { original (string), improved (string), reason (string), category (string) }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/score-resume:', error);
    return res.status(500).json({ error: error.message || 'Internal evaluation error' });
  }
});

app.post('/api/enhance-bullet', async (req, res) => {
  const { bullet, roleContext } = req.body;

  if (!bullet) {
    return res.status(400).json({ error: 'bullet is required' });
  }

  if (!ai) {
    return res.status(503).json({ error: 'AI engine API key not configured on server' });
  }

  try {
    const prompt = `Rewrite this resume bullet point using the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".
Role Context: ${roleContext || 'Software Engineer'}
Original Bullet: "${bullet}"
Return ONLY a JSON object: {"enhancedBullet": "..."}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/enhance-bullet:', error);
    return res.status(500).json({ error: error.message || 'Internal enhancement error' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  if (!ai) {
    return res.status(503).json({ error: 'AI engine API key not configured on server' });
  }

  try {
    const systemInstruction = `You are CareerPilot Telemetry AI, a knowledgeable career advisor.`;

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction },
    });

    const response = await chat.sendMessage({ message: prompt });
    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({ error: error.message || 'Internal chat error' });
  }
});

// Setup Vite middleware in dev mode or static file serving in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] CareerPilot running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
