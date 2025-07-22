import express from 'express';
//importing controllers and middleware

const router = express.Router();

router.get('/:type', getItems);
router.get('/:type/:id', getItemById);

export default router