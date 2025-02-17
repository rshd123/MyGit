import React,{useEffect} from "react";
import {useNavigate, useRoutes } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard.jsx";
import Profile from "./components/user/Profile.jsx";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/Signup.jsx";
import NewRepo from "./components/repo/NewRepo.jsx";
import EditProfile from "./components/user/EditProfile.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function ProjectRoutes(){

    const { currentUser,setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdfromLocalStorage = localStorage.getItem('userId');
        if(!currentUser && userIdfromLocalStorage){
            setCurrentUser(userIdfromLocalStorage);
        }
        if(!userIdfromLocalStorage && !["/auth","signup"].includes(window.location.pathname)){ 
            navigate('/signup');
        }

        if(userIdfromLocalStorage){
            navigate('/');
        }
    },[currentUser,setCurrentUser]);

    let elements = useRoutes([
        {
            path:'/',
            element: <Dashboard />
        },
        {
            path:'/auth',
            element: <Login />
        },
        {
            path:'/signup',
            element: <SignUp />
        },
        {
            path:'/profile',
            element: <Profile />
        },
        {
            path:'/repo/create',
            element:<NewRepo />
        },
        {
            path:'/profile/edit',
            element:<EditProfile/>
        }
    ]);

    return elements;
    
}

