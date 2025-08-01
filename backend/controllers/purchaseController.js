import { pool } from '../db.js';

export const purchaseItem = async (req, res) => {
  const { itemId } = req.params;
  const { buyer_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO purchases (buyer_id, item_id)
       VALUES ($1, $2)
       RETURNING *`,
      [buyer_id, itemId]
    );
    res.json({ message: 'Purchase recorded. Awaiting Pi payment.', purchase: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Purchase failed', details: err });
  }
};
