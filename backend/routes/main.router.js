import express from 'express';
const mainRouter = express.Router();
import userRouter from './user.router.js';
import repoRouter from './repo.router.js';
import issueRouter from './issue.router.js';

mainRouter.get('/',(req,res)=>{
    res.send('hi...');
});

mainRouter.use('/user',userRouter);
mainRouter.use('/repo',repoRouter);
mainRouter.use('/issue',issueRouter);

export {mainRouter};