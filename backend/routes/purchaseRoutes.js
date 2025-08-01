import express from 'express';
import { purchaseItem } from '../controllers/purchaseController.js';
const router = express.Router();

router.post('/:itemId', purchaseItem);
export default router;
