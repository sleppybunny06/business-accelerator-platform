import express from 'express';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Funding routes will be implemented here
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Funding endpoint' });
});

export default router;