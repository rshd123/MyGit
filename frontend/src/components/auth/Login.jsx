import React ,{useEffect,useState}from "react";
import { useAuth } from "../../AuthContext.jsx";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

export default function Login() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [username,setUsername] = useState("");
    const {setCurrentUser} = useAuth();
    useEffect(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setCurrentUser(null);
    },[setCurrentUser]);

    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_LINK}/user/login`,{
                username,
                password
            });

            localStorage.setItem("token",res.data.token);;
            localStorage.setItem("userId",res.data.userId);

            setCurrentUser(res.data.userId);
            setLoading(true);

            window.location.href = "/";
            console.log(res);
        } catch (err) {
            setLoading(false);
            alert('Login Failed');
            console.log("Error Loging in: "+err);
        }
    }
    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img className="logo-login" src={logo} alt="Logo" />
            </div>

            <div className="login-box-wrapper">
                <div className="login-heading">
                    <Box sx={{ padding: 1 }}>
                        <PageHeader>
                            <PageHeader.TitleArea variant="large">
                                <PageHeader.Title>Sign In</PageHeader.Title>
                            </PageHeader.TitleArea>
                        </PageHeader>
                    </Box>
                </div>
                <div className="login-box">
                    <div>
                        <label className="label">Username</label>
                        <input
                            autoComplete="off"
                            name="Email"
                            id="Email"
                            className="input"
                            type="email"
                           onChange={(e)=>setUsername(e.target.value)}
                           value={username}
                        />
                    </div>
                    <div className="div">
                        <label className="label">Password</label>
                        <input
                            autoComplete="off"
                            name="Password"
                            id="Password"
                            className="input"
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <Button
                        variant="primary"
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </div>
                <div className="pass-box">
                    <p>
                        New to GitHub? <Link to="/signup">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}