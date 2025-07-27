import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all voters
router.get('/', async (req, res) => {
  const voters = await User.find({ role: 'voter' });
  res.json(voters);
});

// Verify voter (admin only)
router.put('/:id/verify', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const voter = await User.findByIdAndUpdate(req.params.id, { status: 'Verified' }, { new: true });
  res.json(voter);
});

export default router;
