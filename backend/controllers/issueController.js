import mongoose from "mongoose";
import Repository from "../model/repoModel.js";
import User from "../model/userModel.js";
import Issue from "../model/issueModel.js";

const createIssue = async (req, res) => {
    try {
        const { title, description } = req.body;
        const repoId = req.params.repoId;

        const newIssue = new Issue({
            title,
            description,
            repository: repoId
        });

        const issue = await newIssue.save();
        res.status(201).json(issue);
    } catch (err) {
        console.error('Error creating new Issue: ', +err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateIssueById = async (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(id, { title, description, status }, { new: true });
        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(201).json({ message: 'Issue updated successfully', issue: updatedIssue });
    } catch (err) {
        console.log();
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteIssueById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedIssue = await Issue.findByIdAndDelete(id);
        if (!deletedIssue) {
            return res.status(404).json({ message: 'Issue not Found' });
        }
        res.status(201).json({ message: 'Issue deleted successfully' });

    } catch (err) {
        console.log();
        res.status(500).json({ message: 'Server Error' });
    }
}

const getAllIssues = async (req, res) => {
    const repoId = req.params.repoId;
    try {

        const issues = await Issue.find({ repository: repoId });
        if(!issues){
            res.status(404).json({message:'Issue not found'});
        }
        res.status(200).json({message:'Issues fetched'});

    } catch (err) {
        console.log();
        res.status(500).json({ message: 'Server Error' });
    }
}

const getIssueByID = async (req, res) => {
    const id = req.params.id;
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not Found' });
        }
        res.status(201).json({ message: 'Issue fetched successfully' });

    } catch (err) {
        console.error('Error Fetching issue: '+err);
        res.status(500).json({ message: 'Server Error' });
    }
}


export { createIssue, updateIssueById, deleteIssueById, getAllIssues, getIssueByID };
