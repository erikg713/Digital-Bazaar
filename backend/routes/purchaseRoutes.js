import express from 'express';
import { purchaseItem } from '../controllers/purchaseController.js';
import express from 'express';
import { createPurchase, getPurchaseHistory } from '../controllers/purchaseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPurchase);
router.get('/history', protect, getPurchaseHistory);

export default router;

const router = express.Router();

router.post('/:itemId', purchaseItem);
export default router;
import express from 'express';
import { startPurchase, completePurchase } from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/start', startPurchase); // Called during onReadyForServerApproval
router.post('/complete', completePurchase); // Called during onReadyForServerCompletion

export default router;
