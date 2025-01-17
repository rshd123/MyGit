import express from 'express';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import initRepo from './controllers/init.js';
import addRepo from './controllers/add.js';
import commitRepo from './controllers/commit.js';
import pullRepo from './controllers/pull.js';
import pushRepo from './controllers/push.js';
import revertRepo from './controllers/revert.js';

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
    console.log('app is listening');
})

yargs(hideBin(process.argv))
    .command('init', 'Initialise git repository', {}, initRepo)

    .command(
        'add <file>', 
        'Add a file in repository', 
        (yargs) => {
            yargs.positional("file", {
                describe: "File to add to the staging area",
                type: "String",
            });
        }, 
        (argv)=>{
            addRepo(argv.file);  // argv->returns all parameters passed in commandcd 
        }
    )

    .command(
        'commit <message>', 
        'commit the staged files', 
        (yargs)=>{
            yargs.positional('message',{
                describe:'commit message',
                type:"String",
            });
        }, 
        (argv)=>{
            commitRepo(argv.message);
        }
    )

    .command('push', 'Push commits to S3', {}, pushRepo)

    .command('pull', 'Pull commits from S3', {}, pullRepo)

    .command(
        'revert <commitID>', 
        'Initialise git repository', 
        (yargs)=>{
            yargs.positional('commitID',{
                describe:'Commit-ID to rever',
                type:"String",
            }); 
        },
        revertRepo
    ).demandCommand(1, "You need atleast one command").help().argv
