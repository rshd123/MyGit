import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [repos, setRepos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepos, setSuggestedRepos] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        try {
            const fetchUserRepositories = async () => {
                const result = await axios.get(`http://localhost:3000/repo/all`);
                // const repositories = result.data.repositories;
                const repositories = result.data;
                console.log(repositories);
            };

            fetchUserRepositories();
        } catch (err) {
            console.error('Error Fetching User Repositories'+err);
        }

        
    }, []);

    // useEffect(()=>{
    //     try {
    //         const fetchRepositories = async () => {
    //             const result = await axios.get(`http://localhost:3000/repo/all`);
    //             const repositories = result.data.repositories;
    //             console.log(repositories);
    //         };
    //     } catch (err) {
    //         console.error('Error Fetching Repositories'+err);
    //     }

    //     fetchRepositories();
    // },[]);
    return (
        <div>
            Dashboard
        </div>
    );
}