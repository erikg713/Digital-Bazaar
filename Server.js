import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';

import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/purchase', purchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
