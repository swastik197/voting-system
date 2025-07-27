import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Vote', voteSchema);
