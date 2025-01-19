import express from 'express';
const userRouter = express.Router();
import {getAllUsers, signUp, login, getUserProfile, updateUserProfile, deleteUserProfile} from '../controllers/userController.js';


userRouter.post('/signup',signUp);

userRouter.post('/login',login);

userRouter.get('/allUsers',getAllUsers);

userRouter.get('/:id',getUserProfile);

userRouter.put('/update/:id',updateUserProfile);

userRouter.delete('/delete/:id',deleteUserProfile);

export default userRouter;