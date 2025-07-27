import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  startDate: Date,
  endDate: Date,
  positions: [{ title: String, description: String }],
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, default: 'upcoming' },
});

export default mongoose.model('Election', electionSchema);
