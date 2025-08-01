import { pool } from '../db.js';

export const piLogin = async (req, res) => {
  const { pi_uid, username } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (pi_uid, username)
       VALUES ($1, $2)
       ON CONFLICT (pi_uid) DO NOTHING
       RETURNING *`,
      [pi_uid, username]
    );
    const user = result.rows[0] || (await pool.query(`SELECT * FROM users WHERE pi_uid = $1`, [pi_uid])).rows[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Login error', details: err });
  }
};
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
