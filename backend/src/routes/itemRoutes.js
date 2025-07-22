import express from 'express';

const router = express.Router();

router.get('/:type', getItems);
router.get('/:type:id', getItemById);

export default router