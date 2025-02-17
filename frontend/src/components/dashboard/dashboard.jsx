import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar.jsx";
export default function Dashboard() {
    const [repos, setRepos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepos, setSuggestedRepos] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        try {
            const fetchUserRepositories = async () => {
                const result = await axios.get(`http://localhost:3000/repo/fetch/${userId}`);
                const repositories = result.data.repositories;
                setRepos(repositories);
                // console.log(repositories);
            };

            const fetchSuggestedRepositories = async () => {
                const result = await axios.get(`http://localhost:3000/repo/all`);
                const repositories = result.data;
                setSuggestedRepos(repositories);
                // console.log(repositories);
            };

            fetchSuggestedRepositories();
            fetchUserRepositories();
        } catch (err) {
            console.error('Error Fetching User Repositories' + err);
        }
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setSearchResults(repos);
        } else {
            let filteredRepos = repos.filter(repo => {
                return repo.name.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setSearchResults(filteredRepos);
        }
    }, [searchQuery, repos]);


    return (
        <>
        <Navbar />
            <section id="dashboard">
                <aside>
                    <h3>Suggested Repositories</h3>
                    {suggestedRepos.map((repo,idx)=>{
                        return (<div key={idx} style={{border: '1px solid white', borderRadius:'10px', paddingLeft:'5px', margin:'10px'}}>
                            <p><b>Repository name: </b>{repo.name}</p>
                            <p><b>Description: </b>{repo.description}</p>
                        </div>);
                    })}
                </aside>
                <main>
                    <h1>Your Repositories</h1>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Search Repository"
                            onChange={(e)=>setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                    </div>
                    {searchResults.map((repo,idx)=>{
                        return (<div key={idx}>
                            <p><b>Repository name: </b>{repo.name}</p>
                        </div>);
                    })}
                </main>
                <aside>
                    <h3>Upcoming Events</h3>
                    <ul>
                        <li>
                            <p>Tech Conference-Jan 26'</p>
                        </li>
                        <li>
                            <p>React Summit - Jan 26'</p>
                        </li>
                        <li>
                            <p>Developer Meetup - Jan 26'</p>
                        </li>
                    </ul>
                </aside>
            </section>
        </>
    );
}