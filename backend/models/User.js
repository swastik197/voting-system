import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'candidate', 'voter'], required: true },
  age: Number,
  party: String, // for candidates
  registrationDate: Date, // for voters
  status: { type: String, default: 'pending' },
});

export default mongoose.model('User', userSchema);
