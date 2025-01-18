import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./userModel.js";

const RepoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    content: [
        {
            type: String
        }
    ],
    visibility: {
        type: Boolean
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    issues: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Issue'
        }
    ]
});

const Repository = mongoose.model('Repository', RepoSchema);
export default Repository;