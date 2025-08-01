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
