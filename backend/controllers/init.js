import FS from 'fs';
import path from 'path';

const fs = FS.promises;

//keeping function asynch cuz, storing files can be time consuming;
async function initRepo(){
    const repoPath = path.resolve(process.cwd(), '.myGit');
    const commitsPath = path.join(repoPath,"commits");

    try{
        await fs.mkdir(repoPath, { recursive:true }); /* recursive -> to make nested folders if required*/
        await fs.mkdir(commitsPath, { recursive:true })
        await fs.writeFile(
            path.join(repoPath,' config.JSON'),
            JSON.stringify({bucket:process.env.S3_BUCKET})
        );
        console.log('repo is initializzed');
    }catch(err){
        console.error("Error in initializing repository: "+err);
    }
}

//module.exports = {initRepo}; // Common JS

export default initRepo;