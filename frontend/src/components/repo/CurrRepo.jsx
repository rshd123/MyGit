import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function CurrRepo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reponame, setRepoName] = useState();
    const [issues, setIssues] = useState([]);
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState(false);

    const Repo = async () => {
        try {
            const repo = await axios.get(`http://localhost:3000/repo/id/${id}`);
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
            const issue = await axios.get(`http://localhost:3000/issue/${id}/all`);
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