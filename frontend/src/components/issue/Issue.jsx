import React,{useState} from "react";
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import dotenv from 'dotenv';
dotenv.config();

export default function NewIssue(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const navigate = useNavigate();
    const {id} = useParams();

    const onCreateIssue = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_LINK}/${id}/create`,{
                title:title,
                description:description
            });
            res.status === 201 && navigate(`/repo/id/${id}`);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Navbar />
            <h1>Create New Issue</h1>
            <input type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <input type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
            <button onClick={onCreateIssue}>Create Issue</button>
        </div>
    );
}