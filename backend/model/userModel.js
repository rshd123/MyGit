import mongoose from "mongoose";
import { Schema } from "mongoose";
import Repository from "./repoModel.js";
import Issue from "./issueModel.js";
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    repositories: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref:'Repository'
        }
    ],

    followedUsers: [
        { 
            default: [],
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    ],

    starRepos: [
        { 
            default: [],
            type: Schema.Types.ObjectId,
            ref:'Repository'
        }
    ],

    

});


const User = mongoose.model("User", UserSchema);
export default User;