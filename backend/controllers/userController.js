import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
import mongodb from 'mongodb';
// var ObjectId = mongodb.ObjectId;

const signUp = async (req, res) => {
    let { username, email, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'user already exists!' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = new User({
            username,
            email,
            password: hashedPassword,
            repositories: [],
            followedUsers: [],
            starRepos: []
        });
        await newUser.save();
        const result = await User.findOne({ username });

        const { JWT_SECRET_KEY } = process.env;

        const token = jwt.sign({ id: result._id }, JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.status(201).json({ token, userId: result._id, message: 'User logged in Successfully' });


    } catch (err) {
        console.error('Error Signing Up: ' + err)
        res.status(500).json({ message: 'Server error!' });
    }

}

const login = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Incomplete Username or Password' });
    }

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const { JWT_SECRET_KEY } = process.env;
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.status(201).json({ token, userId: user._id, message: 'User logged in Successfully' });
    } catch (err) {
        console.error('Logging in error: ' + err);
        res.status(500).json({ message: 'Server error!' });
    }

}

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({});
        res.status(201).json(users);

    } catch (err) {
        console.log('Error fetching all Users: ' + err);
        res.status(500).json({ message: 'Server error!' });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userID = req.params.id;
        // const id = new ObjectId(userID);
        const user = await User.findById(userID);
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        res.status(201).json(user);

    } catch (err) {
        console.error('Error fetching User Profile: ' + err);
        res.status(500).json({ message: 'Server error!' });

    }

}

const updateUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: 'user not found' });
        }
        const { email, password } = req.body;

        let updateField = { email };    
        if (password) {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            updateField.password = hashedPassword;
        }
        await User.findByIdAndUpdate(id, updateField, { new: true });
        return res.status(201).json({message:'User Profile Updated successfully...'});
    } catch (err) {
        console.error('Error updating User Profile: ' + err);
        return res.status(500).json({ message: 'Server error! ' });
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        await User.findByIdAndDelete(id);
        res.status(201).json({message:'Profile Deleted Successfully'});

    } catch (err) {
        console.error('Error deleting Profile: '+err);
        res.status(500).json({message:'Server Error! '});
    }
}   

export { getAllUsers, signUp, login, getUserProfile, updateUserProfile, deleteUserProfile };