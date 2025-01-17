import path from 'path';
import FS from 'fs';
const fs = FS.promises;

import { s3,S3_BUCKET } from '../config/aws-config.js';
import { Upload } from '@aws-sdk/lib-storage';

async function pushRepo(){
    const repoPath = path.resolve(process.cwd(),'.myGit');
    const commitsPath = path.join(repoPath,'commits'); 

    try {
        const commitDirs = await fs.readdir(commitsPath);
        for(let commitDir of commitDirs){
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);

            for(let file of files){
                const filePath = path.join(commitPath,file);
                const filecontent = await fs.readFile(filePath);
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: filecontent,
                };
                const upload = new Upload({
                    client: s3,
                    params: params,
                });

                upload.on('httpUploadProgress', (progress) => {
                    console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
                });

                await upload.done();
            }
        }

        console.log('All commits pushed to S3...');

    } catch (err) {
        console.error("Error pushing to S3: "+err);
    }
}

//module.exports = {initRepo}; // Common JS
export default pushRepo;