import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, age, party } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role, age, party, registrationDate: new Date(), status: 'pending' });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ensure admin user exists (run once on server start)
(async () => {
  try {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin1234';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const adminUser = new User({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
        registrationDate: new Date(),
      });
      await adminUser.save();
      console.log('Default admin user created');
    }
  } catch (err) {
    console.error('Error creating default admin user:', err.message);
  }
})();

// Change admin password
router.post('/change-admin-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if (email !== 'admin@gmail.com') return res.status(403).json({ message: 'Forbidden' });
  const admin = await User.findOne({ email });
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  const valid = await bcrypt.compare(oldPassword, admin.password);
  if (!valid) return res.status(400).json({ message: 'Invalid current password' });
  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();
  res.json({ message: 'Password changed successfully' });
});

export default router;
