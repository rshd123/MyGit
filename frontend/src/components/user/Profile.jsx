import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap.jsx";
import { useAuth } from "../../AuthContext.jsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import dotenv from 'dotenv';
dotenv.config();

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const { setCurrentUser } = useAuth();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    try {
        const fetchUserRepositories = async () => {
            const result = await axios.get(`http://localhost:3000/repo/fetch/${userId}`);
            const repositories = result.data.repositories;
            setRepos(repositories);
            // console.log(repositories);
        };
        fetchUserRepositories();
    } catch (err) {
        console.error('Error Fetching User Repositories' + err);
    }
  }, [repos]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      // console.log(userId);
      if (userId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_LINK}/user/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  },[]);
  

  const onDeleteClick = async (repoID) => {
    // console.log(reponame);
    const response = await axios.delete(`${import.meta.env.VITE_LINK}/repo/delete/${repoID}`);
    setRepos(repos.filter((repo) => repo._id !== repoID));
  
  }

  return (
    <>
      <Navbar />
      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          style={{
            backgroundColor: "transparent",
            color: "white",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          style={{
            backgroundColor: "transparent",
            color: "whitesmoke",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >

          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <div className="profile-page-wrapper">
        <div className="user-profile-section" >
          <div className="profile-image">
            <AccountCircleIcon style={{fontSize:'200px'}}/>
          </div>

          <div className="name" style={{paddingLeft:'20px',fontSize:'25px'}} >
            <h3 style={{textAlign:'center'}}>{userDetails.username}</h3>
            <h6><i>Email:</i> {userDetails.email}</h6>
          </div>
          <div className="btn">
            <div className="editUserProfile">
              <button 
                style={{borderRadius:'5px',fontSize:'17px'}}
                onClick={() => navigate('/profile/edit')}
              >Edit Profile</button>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                setCurrentUser(null);

                window.location.href = "/auth";
              }}
              style={{color:'red',fontSize:'17px',borderRadius:'5px'}}
              id="logout"
            >
            Logout
          </button>
         </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>

        <div className="userRepos">
          <b>Your Repositories:</b> 
          {repos.map((repo,idx)=>{
            return (
              <div key={idx} style={{width:'400px', border:'1px solid white', padding:'10px', margin:'10px', borderRadius:'10px'}}>  
                <p><b><i>Repository Name:</i></b> {repo.name}</p>
                <p><b><i>Description: </i></b>{repo.description}</p>
                <p><b><i>Visibility: </i></b>{repo.visibility===true ? "Public": "Private"}</p>
                <Button 
                  variant ="outlined" 
                  color="error"
                  onClick={()=>onDeleteClick(repo._id)}
                >Delete Repository !!</Button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;