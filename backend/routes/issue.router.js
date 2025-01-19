import express from 'express';
const issueRouter = express.Router();

import {createIssue,updateIssueById,deleteIssueById,getAllIssues,getIssueByID} from '../controllers/issueController.js'

issueRouter.post('/:repoId/create',createIssue);

issueRouter.put('/:repoId/update/:id',updateIssueById);

issueRouter.delete('/:repoId/delete/:id',deleteIssueById);

issueRouter.get('/:repoId/all',getAllIssues);

issueRouter.get('/:repoId/:id',getIssueByID);

export default issueRouter;