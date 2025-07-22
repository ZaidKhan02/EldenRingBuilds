import express from 'express';
//importing controllers and middleware

const router = express.Router();

router.get('/', getAllBuilds);
router.get('/:id', getBuildById);

export default router