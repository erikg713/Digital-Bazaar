import express from 'express';
import { purchaseItem } from '../controllers/purchaseController.js';
const router = express.Router();

router.post('/:itemId', purchaseItem);
export default router;
import express from 'express';
import { startPurchase, completePurchase } from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/start', startPurchase); // Called during onReadyForServerApproval
router.post('/complete', completePurchase); // Called during onReadyForServerCompletion

export default router;
