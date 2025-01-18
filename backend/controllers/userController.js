const getAllUsers = (req,res)=>{
    res.send('ALL USERS');
}

const signUp = (req,res)=>{
    res.send('SIGNUP PAGE');
}

const login = (req,res)=>{
    res.send('LOGIN PAGE');
}

const getUserProfile = (req,res)=>{
    res.send('PROFILE FETCHED');
}

const updateUserProfile = (req,res)=>{
    res.send('PROFILE UPDATED');

}

const deleteUserProfile = (req,res)=>{
    res.send('PROFILE DELETED');
}



export {getAllUsers, signUp, login, getUserProfile, updateUserProfile, deleteUserProfile} ;