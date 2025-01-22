import mongoose from "mongoose";
import Repository from "../model/repoModel.js";
import User from "../model/userModel.js";
import Issue from "../model/issueModel.js";

const createRepository = async (req, res) => {
    const { name, description, content, visibility, owner, issues } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: 'Repository name required...' });
        }
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ message: 'Invalid user ID...' });
        }

        const newRepo = new Repository({
            name,
            description,
            content,
            visibility,
            owner,
            issues
        });

        const result = await newRepo.save();

        res.status(201).json({ message: 'Repository successfully created...', repositoryID: result._id, ownerID: owner });


    } catch (err) {
        console.log('Error creating repository: ' + err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getAllRepositories = async (req, res) => {
    try {
        const result = await Repository.find({}).populate("owner").populate("issues");
        res.status(201).json(result);
    } catch (err) {
        console.error('Error Fetching Repositories');
        res.status(500).json({ message: 'Server Error' });
    }
}

const fetchRepositoryByID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Repository.findById(id).populate("owner").populate("issues");
        if (!result) {
            return res.status(404).json({ message: 'Repository not found' });
        }
        res.status(201).json(result);
    } catch (err) {
        console.error('Error Fetching Repository');
        res.status(500).json({ message: 'Server Error' });
    }
}

const fetchRepositoryByName = async (req, res) => {
    try {
        const name = req.params.name;
        const result = await Repository.find({ name }).populate("owner").populate("issues");
        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'Repository not found' });
        }
        res.status(201).json(result);
    } catch (err) {
        console.error('Error Fetching Repository' + err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const fetchRepositoriesForCurrentUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const repositories = await Repository.find({owner:userId});

        if (!repositories || repositories.length === 0) {
            return res.status(404).json({ error: 'User Repositories Not Found' });
        }

        res.status(201).json({ message: 'Repositories Found', repositories });
    } catch (err) {
        console.error('Error Fetching User Repository' + err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateRepositoryByID = async (req, res) => {
    const { content, description } = req.body;
    // const {content, description, name} = req.body;
    const id = req.params.id;
    try {

        // const check = await Repository.find({name});
        // if(check){
        //     res.status(400).json({message:'Repository Name already exists'})
        // }

        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({ error: 'Repository Not Found' });
        }
        repository.content.push(content);
        repository.description = description;
        const updatedRepository = await repository.save();

        return res.status(201).json({ message: 'Repository Updated', repository: updatedRepository });

    } catch (err) {
        console.error('Error Updating Repository: ' + err);
        res.status(500).json({ message: "Server Error" });
    }
}
const deleteRepositoryByID = async (req, res) => {
    const id = req.params.id;
    try {
        const repository = await Repository.findByIdAndDelete(id);
        res.status(401).json({ message: 'Repository Successfully deleted', Repository: repository.name });
    } catch (err) {
        console.error('Error Deleting Repository: ' + err);
        res.status(500).json({ message: "Server Error" });
    }
}


const toggleVisiblityByID = async (req, res) => {
    const id = req.params.id;
    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({ error: 'Repository Not Found' });
        }
        repository.visibility = !repository.visibility;

        const updatedRepository = await repository.save();
        return res.status(201).json({ message: 'Repository Visibility Updated', repository: updatedRepository });

    } catch (err) {
        console.error('Error Updating visibility: ' + err);
        res.status(500).json({ message: "Server Error" });
    }
}


export {
    createRepository,
    getAllRepositories,
    fetchRepositoriesForCurrentUser,
    fetchRepositoryByID,
    fetchRepositoryByName,
    updateRepositoryByID,
    toggleVisiblityByID,
    deleteRepositoryByID
};