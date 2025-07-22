import express from 'express';
//importing controllers and middleware

const router = express.Router();

router.route('/builds/:buildId').get(getCommentsByBuild).post(createCommentForBuild);
router.route('/forums/:topicId').get(getCommentsByTopic).post(createCommentForTopic);
router.route('/:commentId').put(updateComment).delete(deleteComment);

export default router

//i will need middleware for authentication authMiddleware for creating, updating, deleting comments