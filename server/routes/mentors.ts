import express from 'express';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Mentor routes will be implemented here
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Mentors endpoint' });
});

export default router;