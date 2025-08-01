import { pool } from '../db.js';
import asyncHandler from 'express-async-handler';
import Purchase from '../models/Purchase.js';
import Item from '../models/Item.js';

// @desc    Make a purchase
// @route   POST /api/purchase
// @access  Private
export const createPurchase = asyncHandler(async (req, res) => {
  const { itemId, quantity } = req.body;

  const item = await Item.findById(itemId);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  if (item.stock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  const totalPrice = item.price * quantity;

  const purchase = new Purchase({
    user: req.user._id,
    item: itemId,
    quantity,
    totalPrice,
  });

  // Reduce item stock
  item.stock -= quantity;

  await item.save();
  await purchase.save();

  res.status(201).json(purchase);
});

// @desc    Get purchase history for user
// @route   GET /api/purchase/history
// @access  Private
export const getPurchaseHistory = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({ user: req.user._id }).populate('item', 'name price');
  res.json(purchases);
});

export const startPurchase = async (req, res) => {
  const { buyer_id, item_id, pi_payment_id } = req.body;

  try {
    const existing = await pool.query(
      `SELECT * FROM purchases WHERE pi_payment_id = $1`, [pi_payment_id]
    );
    if (existing.rows.length > 0) return res.json(existing.rows[0]);

    const result = await pool.query(
      `INSERT INTO purchases (buyer_id, item_id, pi_payment_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [buyer_id, item_id, pi_payment_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Purchase start error', details: err });
  }
};

export const completePurchase = async (req, res) => {
  const { pi_payment_id, txid } = req.body;

  try {
    const result = await pool.query(
      `UPDATE purchases
       SET status = 'completed', txid = $2
       WHERE pi_payment_id = $1
       RETURNING *`,
      [pi_payment_id, txid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.json({ message: 'Payment completed', purchase: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Payment completion error', details: err });
  }
};
