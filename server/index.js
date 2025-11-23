import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Configure based on your needs
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit AI requests
  message: 'Too many AI requests, please slow down.'
});

app.use('/api/', limiter);

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

// Admin login
app.post('/api/auth/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // In production, fetch from database
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || await bcrypt.hash('admin123', 10);

    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: 'admin' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Client login
app.post('/api/auth/client/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // In production, fetch from Supabase with hashed password
    // For now, using environment variable
    const validUsername = process.env.CLIENT_USERNAME || 'skyline';
    const validPasswordHash = process.env.CLIENT_PASSWORD_HASH || await bcrypt.hash('password123', 10);

    if (username !== validUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, validPasswordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Mock client data - in production, fetch from database
    const clientData = {
      id: 'cl_1',
      username: validUsername,
      name: 'Vikram Malhotra',
      company: 'Skyline Properties',
      project: 'WhatsApp Lead Bot v2',
      status: 'Active',
      renewalDate: 'Dec 31, 2025'
    };

    const token = jwt.sign(
      { username, role: 'client', clientId: clientData.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: 'client', client: clientData });
  } catch (error) {
    console.error('Client login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ============================================================================
// AI ENDPOINTS
// ============================================================================

// Generate social media content
app.post('/api/ai/generate-content', aiLimiter, async (req, res) => {
  try {
    const { prompt, platform } = req.body;

    if (!prompt || !platform) {
      return res.status(400).json({ error: 'Prompt and platform are required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const enhancedPrompt = `Generate a ${platform} post about: ${prompt}. 
    Make it engaging, professional, and suitable for ${platform}. 
    Include relevant hashtags and emojis where appropriate.`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ content: text });
  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Generate image (mock - integrate with actual image generation API)
app.post('/api/ai/generate-image', aiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Mock response - integrate with DALL-E, Midjourney, or Stable Diffusion
    // For now, return a placeholder
    const mockImageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(prompt)}`;

    res.json({ imageUrl: mockImageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

// Chat with AI
app.post('/api/ai/chat', aiLimiter, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Build context from history
    let contextPrompt = `You are Aryantra AI Assistant, a helpful AI that assists with automation and business queries. 
    Be professional, concise, and helpful.\n\n`;
    
    if (history.length > 0) {
      contextPrompt += 'Previous conversation:\n';
      history.slice(-5).forEach(msg => {
        contextPrompt += `${msg.role}: ${msg.content}\n`;
      });
    }
    
    contextPrompt += `\nUser: ${message}\nAssistant:`;

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// ============================================================================
// BOOKING ENDPOINTS (Protected)
// ============================================================================

app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, company, type, date, time } = req.body;

    // Validate input
    if (!name || !email || !type || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Generate meeting link for online meetings
    const meetLink = type === 'Online' 
      ? `meet.aryantra.com/${generateRandomString(3)}-${generateRandomString(4)}-${generateRandomString(3)}`
      : undefined;

    const booking = {
      id: `bk_${Date.now()}`,
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: sanitizeInput(company || ''),
      type,
      date,
      time,
      status: 'Pending',
      meetLink,
      createdAt: new Date().toISOString()
    };

    // In production, save to Supabase
    // await supabase.from('bookings').insert([booking]);

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    // In production, fetch from Supabase
    // const { data } = await supabase.from('bookings').select('*');
    
    res.json({ bookings: [] }); // Return empty for now
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// ============================================================================
// APPLICATION ENDPOINTS
// ============================================================================

app.post('/api/applications', async (req, res) => {
  try {
    const { name, email, role, experience, cvName } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const application = {
      id: `ap_${Date.now()}`,
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      role: sanitizeInput(role),
      experience: sanitizeInput(experience || ''),
      cvName: sanitizeInput(cvName || ''),
      status: 'New',
      appliedAt: new Date().toISOString()
    };

    // In production, save to Supabase
    res.status(201).json(application);
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 500); // Limit length
}

function generateRandomString(length) {
  return Math.random().toString(36).substring(2, 2 + length);
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Aryantra API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

export default app;
