import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';  // example JWT auth middleware

const router = express.Router();

// GET /api/user/profile - Protected route
router.get('/profile', protect, getUserProfile);

// PUT /api/user/profile - Protected route
router.put('/profile', protect, updateUserProfile);

export default router;
