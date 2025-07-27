import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: String,
  age: Number,
  votes: { type: Number, default: 0 },
  status: { type: String, default: 'pending' },
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
});

export default mongoose.model('Candidate', candidateSchema);
