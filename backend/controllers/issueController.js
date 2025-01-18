const createIssue = (req,res)=>{
    res.send('Issue Created');
};

const updateIssueById = (req,res)=>{
    res.send('Issue updated');
}

const deleteIssueById = (req,res)=>{
    res.send('Issue Deleted! ');
}

const getAllIssues = (req,res)=>{
    res.end('ALL ISSUES FETCHED');
}

const getIssueByID = (req,res)=>{
    res.end('ISSUE DETAIL FETCHED');
}


export {createIssue,updateIssueById,deleteIssueById,getAllIssues,getIssueByID};
