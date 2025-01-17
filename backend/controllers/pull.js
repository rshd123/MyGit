import { S3_BUCKET,s3 } from "../config/aws-config.js";
import path from 'path';
import FS from 'fs';
import { ListObjectsV2Command,GetObjectCommand } from "@aws-sdk/client-s3";
const fs = FS.promises;

async function pullRepo(){
    const repoPath = path.resolve(process.cwd(),'.myGit');
    const commitsPath = path.join(repoPath,'commits');

    try {

        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: 'commits/'
        });

        const data = await s3.send(command);

        for(const object of data.Contents){
            const key = object.Key;
            const commitDir = path.join(commitsPath, path.dirname(key).split('/').pop());
            await fs.mkdir(commitDir, {recursive:true});

            const getObjectCommand = new GetObjectCommand( {
                Bucket: S3_BUCKET,
                Key: key,
            });

            const response = await s3.send(getObjectCommand);
                // Convert stream to buffer for writing to a file
            const chunks = [];
            for await (const chunk of response.Body) {
                chunks.push(chunk);
            }
            const fileContent = Buffer.concat(chunks);
            // Write file content to the local file system
            await fs.writeFile(path.join(repoPath, key), fileContent);
        }
        console.log('Pull commits pulled from S3 successfully...');
    } catch (err) {
        console.error('Pull Error: '+ err);
    }
}

//module.exports = {initRepo}; // Common JS

export default pullRepo;    