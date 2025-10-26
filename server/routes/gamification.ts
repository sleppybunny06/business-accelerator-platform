import express from 'express';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Gamification routes will be implemented here
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Gamification endpoint' });
});

export default router;