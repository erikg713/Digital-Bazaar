import express from 'express';
import { getItems, getItemById } from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);

export default router;

const router = express.Router();

router.post('/', uploadItem);
router.get('/', getItems);
export default router;
// backend/routes/itemRoutes.js
import express from 'express';
import * as itemController from '../controllers/itemController.js';

const router = express.Router();

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.post('/', itemController.postItem);

export default router;
