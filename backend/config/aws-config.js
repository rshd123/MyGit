// import AWS from 'aws-sdk';

// AWS.config.update({region:"ap-south-1"});

// const s3 = new AWS.S3();
// const S3_BUCKET = 'mygitprojectbucket';

// export {s3, S3_BUCKET};
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();
const {ACCESSKEYID, SECRETACCESSKEY} = process.env;

const REGION = 'ap-south-1'; 
const S3_BUCKET = 'mygitprojectbucket'; 

const s3 = new S3Client({ 
    region: REGION,
    credentials: { // not required for v2, but required for v3
        accessKeyId: ACCESSKEYID,
        secretAccessKey: SECRETACCESSKEY,
    },
 });

export { s3, S3_BUCKET };


