import express from 'express';

const router = express.Router();

router.get('/', getAllBuilds);
router.get('/:id', getBuildById);

export default router