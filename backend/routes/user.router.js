import express from 'express';
const userRouter = express.Router();
import {getAllUsers, signUp, login, getUserProfile, updateUserProfile, deleteUserProfile} from '../controllers/userController.js';


userRouter.get('/getallusers',getAllUsers);

userRouter.post('/signup',signUp);

userRouter.post('/login',login);

userRouter.get('/getuserprofile',getUserProfile);

userRouter.put('/updateuserprofile',updateUserProfile);

userRouter.delete('/deleteprofile',deleteUserProfile);

export default userRouter;