import express from 'express';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Chat routes will be implemented here
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Chat endpoint' });
});

export default router;