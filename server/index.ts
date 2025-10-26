// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import path from 'path';

// Route imports
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import businessRoutes from './routes/businesses';
import pitchRoutes from './routes/pitches';
import mentorRoutes from './routes/mentors';
import investorRoutes from './routes/investors';
import fundingRoutes from './routes/funding';
import aiRoutes from './routes/ai';
import chatRoutes from './routes/chat';
import gamificationRoutes from './routes/gamification';

// Middleware imports
import { authenticateToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { setupSocketHandlers } from './socket/handlers';

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/business-accelerator')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/businesses', authenticateToken, businessRoutes);
app.use('/api/pitches', authenticateToken, pitchRoutes);
app.use('/api/mentors', authenticateToken, mentorRoutes);
app.use('/api/investors', authenticateToken, investorRoutes);
app.use('/api/funding', authenticateToken, fundingRoutes);
app.use('/api/ai', authenticateToken, aiRoutes);
app.use('/api/chat', authenticateToken, chatRoutes);
app.use('/api/gamification', authenticateToken, gamificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Setup Socket.io handlers
setupSocketHandlers(io);

// Error handling middleware
app.use(errorHandler);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;