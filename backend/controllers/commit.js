import path from 'path';
import FS from 'fs';
const fs = FS.promises;
import {v4} from 'uuid';

async function commitRepo(message){
    const repoPath = path.resolve(process.cwd(),'.myGit');
    const stagedpath = path.join(repoPath,'staging');
    const commitPath = path.join(repoPath,'commits');

    try {
        const commitID = v4();
        const commitDir = path.join(commitPath, commitID);
        await fs.mkdir(commitDir,{ recursive:true });

        const files = await fs.readdir(stagedpath);

        for(let file of files){
            await fs.copyFile( // move file from one folder to another folder ;
                path.join(stagedpath, file), // initial file destination ;
                path.join(commitDir, file) // final file destination ;
            );
        }

        await fs.writeFile(
            path.join(commitDir,'commit.JSON'),  
            JSON.stringify({message: message, data: new Date().toISOString()})
        );

        console.log(`commitID: ${commitID} successfully commited..`);
    } catch (err) { 
        console.error("Commit error: "+err);
    }
}

//module.exports = {initRepo}; // Common JS

export default commitRepo;  