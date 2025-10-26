import express from 'express';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Pitch routes will be implemented here
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Pitches endpoint' });
});

export default router;