import express from 'express';
//importing controllers and middleware

const router = express.Router();

router.post('/', createBuild);
router.route('/:id').put(updateBuild).delete(deleteBuild);

export default router

//i will need middleware for authentication authMiddleware for creating, updating, and deleting build