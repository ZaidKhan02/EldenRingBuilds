import express from 'express';

const router = express.Router();

router.get('/', getAllCategories);
router.route('/topics/:topic').get(getAllTopics).post(createTopic);
router.get('/topics/:topic/:id', getTopicById);

export default router

//i will need middleware for authentication authMiddleware for creating a topic