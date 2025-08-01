import express from 'express';
import { uploadItem, getItems } from '../controllers/itemController.js';
const router = express.Router();

router.post('/', uploadItem);
router.get('/', getItems);
export default router;
