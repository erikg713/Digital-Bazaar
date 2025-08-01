import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, accessToken } = req.body;
  if (!username || !accessToken) return res.status(400).json({ error: 'Missing data' });

  // TODO: Verify accessToken with Pi API (optional / future)
  
  try {
    let user = await User.findOne({ username });
    if (!user) user = await User.create({ username });

    // Return user info or JWT token here
    res.json(user);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
