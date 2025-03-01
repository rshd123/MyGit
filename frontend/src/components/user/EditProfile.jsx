import React,{useState} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import dotenv from 'dotenv';
dotenv.config();

export default function EditProfile(){

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onUpdate = async ()=>{
        try {
            const reponse = await axios.put(`${process.env.LINK}/user/update/${localStorage.getItem("userId")}`,{
                email:email,
                password:password,
            })
            navigate('/profile');
            console.log(reponse);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="editProfile">
            <div className="emailUpdate">
                <i>Update Email : </i>
                <TextField
                    label="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value = {email}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "white", 
                                border:' 2px solid white',
                            },
                            "&:hover fieldset": {
                                borderColor: "white", 
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "white",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "white", 
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                        },
                        input: {
                            color: "white", 
                        },
                    }}
                />
            </div>
            <div className="passUpdate">
                <i>Update Password : </i>
                    <TextField
                        onChange = {(e)=>setPassword(e.target.value)}
                        value = {password}
                        label="Password"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white", 
                                    border:' 2px solid white',
                                },
                                "&:hover fieldset": {
                                    borderColor: "white", 
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "white", 
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "white",
                            },
                            input: {
                                color: "white", 
                            },
                        }}
                    />
            </div>
            <Button
                variant="outlined"
                sx={{
                    backgroundColor: "black",
                    color: "white",
                    marginTop:"20px",
                    marginLeft:"100px"
                }}
                onClick={onUpdate}
            >Update</Button>
        </div>
    );
};