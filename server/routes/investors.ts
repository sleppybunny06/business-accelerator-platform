import express from 'express';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Investor routes will be implemented here
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Investors endpoint' });
});

export default router;