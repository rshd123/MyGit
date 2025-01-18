import express from 'express';
const repoRouter = express.Router();
import {
    createRepository,
    getAllRepositories,
    fetchRepositoriesForCurrentUser,
    fetchRepositoryByID,
    fetchRepositoryByName,
    updateRepositoryByID,
    toggleVisiblityByID,
    deleteRepositoryByID
} from '../controllers/repoController.js';

repoRouter.post('/create',createRepository);

repoRouter.get('/all',getAllRepositories);

repoRouter.get('/:userID',fetchRepositoriesForCurrentUser);

repoRouter.get('/:id',fetchRepositoryByID);

repoRouter.get('/:name',fetchRepositoryByName);

repoRouter.put('/update/:id',updateRepositoryByID);

repoRouter.patch('/togglevisibility',toggleVisiblityByID);

repoRouter.delete('/delete/:id',deleteRepositoryByID);

export default repoRouter;