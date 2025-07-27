import express from 'express';
import Election from '../models/Election.js';
import Candidate from '../models/Candidate.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all elections
router.get('/', async (req, res) => {
  const elections = await Election.find().populate('candidates voters');
  res.json(elections);
});

// Create election (admin only)
router.post('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const election = new Election(req.body);
  await election.save();
  res.status(201).json(election);
});

// Delete election (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  await Election.findByIdAndDelete(req.params.id);
  res.json({ message: 'Election deleted' });
});

export default router;
