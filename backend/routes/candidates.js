import express from 'express';
import Candidate from '../models/Candidate.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all candidates
router.get('/', async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

// Add candidate (self-registration, status always 'pending')
router.post('/', async (req, res) => {
  try {
    const candidateData = { ...req.body, status: 'pending' };
    const candidate = new Candidate(candidateData);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Approve candidate (admin only)
router.post('/:id/approve', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const candidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    { status: 'approved' },
    { new: true }
  );
  if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
  res.json(candidate);
});

// Remove candidate (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ message: 'Candidate deleted' });
});

export default router;
