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

repoRouter.get('/id/:id',fetchRepositoryByID);

repoRouter.get('/name/:name',fetchRepositoryByName);

repoRouter.put('/update/:id',updateRepositoryByID);

repoRouter.delete('/delete/:id',deleteRepositoryByID);

repoRouter.patch('/visibility/:id',toggleVisiblityByID);

repoRouter.get('/fetch/:userId',fetchRepositoriesForCurrentUser);



export default repoRouter;