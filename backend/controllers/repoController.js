const createRepository = (req,res)=>{
    res.send('RESPOSITORY CREATED');
}

const getAllRepositories = (req,res)=>{
    res.send('ALL REPOSITORIES FETCHED');
}

const fetchRepositoryByID = (req,res)=>{
    res.send('REPOSITORY FETCHED');
}

const fetchRepositoryByName = (req,res)=>{
    res.send('RESPOSITORY CREATED');
}

const fetchRepositoriesForCurrentUser = (req,res)=>{
    res.send('RESPOSITORIES FOR LOGGEDIN USER FETCHED');
}

const updateRepositoryByID = (req,res)=>{
    res.send('REPOSITORY UPDATED');
}

const toggleVisiblityByID = (req,res)=>{
    res.send('VISIBILITY TOGGLED');
}

const deleteRepositoryByID = (req,res)=>{
    res.send('REPOSITORY DELETED');
}

export {
    createRepository,
    getAllRepositories,
    fetchRepositoriesForCurrentUser,
    fetchRepositoryByID,
    fetchRepositoryByName,
    updateRepositoryByID,
    toggleVisiblityByID,
    deleteRepositoryByID
};