import express from 'express';
//importing controllers and middleware

const router = express.Router();

router.get('/', getAllCategories);
router.route('/topics/:topic').get(getAllTopics).post(createTopic);
router.get('/topics/:topic/:id', getTopicById);

export default router

//i will need middleware for authentication authMiddleware for creating a topic