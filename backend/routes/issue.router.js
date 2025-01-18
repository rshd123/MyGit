import express from 'express';
const issueRouter = express.Router();

import {createIssue,updateIssueById,deleteIssueById,getAllIssues,getIssueByID} from '../controllers/issueController.js'

issueRouter.post('/create',createIssue);

issueRouter.put('/update/:id',updateIssueById);

issueRouter.delete('/delete/:id',deleteIssueById);

issueRouter.get('/all',getAllIssues);

issueRouter.get('/:id',getIssueByID);

export default issueRouter;