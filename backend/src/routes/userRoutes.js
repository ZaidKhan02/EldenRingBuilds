import express from 'express';
import { getAllUsers, createUser, loginUser, getUserById, deleteUser } from '../controllers/userController.js';
//importing controllers and middleware

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.route('/:id').get(getUserById).delete(deleteUser); //if i delete account, all of its builds need to be deleted too

export default router

