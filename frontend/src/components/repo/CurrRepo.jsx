import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar.jsx";
import { useNavigate, useParams } from "react-router-dom";
// import dotenv from 'dotenv';
// dotenv.config();
import { Button } from "@mui/material";

export default function CurrRepo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reponame, setRepoName] = useState();
    const [issues, setIssues] = useState([]);
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState(false);

    const Repo = async () => {
        try {
            const repo = await axios.get(`${import.meta.env.VITE_LINK}/repo/id/${id}`);
            setRepoName(repo.data.name);
            setDescription(repo.data.description);
            setVisibility(repo.data.visibility);
        } catch (err) {
            console.error('Error Fetching Repository' + err);
        }
    }
    Repo();

    async function fetchIssues() {
        try {
            const issue = await axios.get(`${import.meta.env.VITE_LINK}/issue/${id}/all`);
            // console.log(issue);
            setIssues(issue.data);
        } catch (err) {
            console.error(err);
        }
    }
    fetchIssues();

    const onCreateIssue = () => {
        navigate(`/repo/${id}/issue/create`);
    };

    const onDeleteIssue = async (issueId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_LINK}/issue/${id}/delete/${issueId}`);
            res.status === 201 && navigate(`/repo/id/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="currentRepo">
                <div>
                    <div>
                        <h2>Repository Name: <i>{reponame}</i></h2>
                    </div>
                    <div>
                        <h3>Description: <i>{description}</i></h3>
                    </div>
                    <div>
                        {visibility === true ? 'Public' : 'Private'}
                    </div>
                    <button className="transparent-button" onClick = {onCreateIssue}> Create New issue</button>

                </div>
                <div className="issues">

                    {
                    issues.length !== 0 && 
                    <>
                        <h3>Issues:</h3>
                        {issues.map((issue) => {
                            return (
                                <div key={issue._id} style={{ border: '1px solid white', padding: '5px', margin: '10px', borderRadius: '10px' }}>
                                    <h4>Issue name: {issue.title}</h4>
                                    <p>Description: {issue.description}</p>
                                    <Button 
                                    variant ="outlined" 
                                    color="success"
                                    onClick={()=>onDeleteIssue(issue._id)}
                                    >Issue Resolved!</Button>
                                </div>
                            );
                        })}
                    </>
                    }
                </div>
            </div>
        </div>
    );
}