import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID){
    const repoPath = path.resolve(process.cwd(),'.myGit');
    const commitsPath = path.join(repoPath, 'commits');

    try {
        const commitDir  = path.join(commitsPath,commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, '..');

        for(let file of files){
            await copyFile(
                path.join(commitDir, file), // initial file destination
                path.join(parentDir,file) //final file destination
            );
        }

        console.log('Successfully reverted...');
    } catch (err) {
        console.log('Error reverting: '+ err);
    }
}

//module.exports = {initRepo}; // Common JS

export default revertRepo;