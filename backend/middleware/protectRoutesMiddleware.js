import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/user/items', authenticateJWT, async (req, res) => {
  // req.user contains { id, username } from JWT
  const userId = req.user.id;

  // Fetch user items logic here, e.g.:
  // const items = await Item.find({ ownerId: userId });

  res.json({ items: [] }); // Replace with real data
});
