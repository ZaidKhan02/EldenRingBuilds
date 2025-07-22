import express from 'express';

const router = express.Router();

router.route('/register').get(getAllUsers).post(createUser);
router.post('/login', loginUser);
router.route('/:id').get(getUserById);//.delete(deleteUser); if i delete account, all of its builds need to be deleted too

export default router

