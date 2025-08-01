import { pool } from '../db.js';

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
