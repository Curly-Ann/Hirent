import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';
import userController from '../controllers/userController.js';
import { validateUser } from '../validators/userValidator.js';   

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', validateUser, userController.createUser);

export default router;