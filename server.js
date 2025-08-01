import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';       // or './routes/auth.js' — unify your naming
import itemRoutes from './routes/itemRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import userRoutes from './routes/user.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/purchase', purchaseRoutes);

// Global error handler (keep at the end)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


