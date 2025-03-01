import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {useNavigate} from "react-router-dom";
// import dotenv from 'dotenv';
// dotenv.config();

export default function NewRepo() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value); 
    }

    const onVisibilityChange = (e) => {
        setVisibility(e.target.value);
    };

    const CreateRepo = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_LINK}/repo/create`, {
                name: title,
                description: description,
                owner:localStorage.getItem('userId'),
                visibility: visibility === "public" ? true : false,
            });
            navigate("/");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="newRepo">
            <div className="span">
                <b>Enter Repository Title: </b>
            </div>
            <TextField
                variant="outlined"
                type="text"
                onChange={onTitleChange}
                value={title}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "white", 
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

            <div className="span">
                <b>Enter Repository Description: </b>
            </div>
            <TextField
                variant="outlined"
                type="text"
                multiline
                style={{ width: "25%" }}
                maxRows={4}
                onChange={onDescriptionChange}
                value={description}
                sx={{
                    "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "white", 
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
                    "& .MuiOutlinedInput-input": {
                    color: "white", 
                    },
                    "& .MuiOutlinedInput-root textarea": {
                    color: "white",
                    },
                }}
                />
            <div className="visibility">
                <FormControl component="fieldset" style={{ marginTop: "10px" }}>
                    <FormLabel component="legend" style={{color:'white'}}>Visibility</FormLabel>
                    <RadioGroup row value={visibility} onChange={onVisibilityChange}>
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div style={{ marginTop: "20px" }}>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "white",
                    color: "black",
                }}
                onClick={CreateRepo}
            >Create Repository</Button>
            </div>

        </div>
    );
}
