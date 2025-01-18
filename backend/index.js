import express from 'express';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import cors from 'cors';
const PORT = 3000;
const app = express();
import bodyParser from 'body-parser'
import http from 'http';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {MONGO_URL} = process.env;

import initRepo from './controllers/init.js';
import addRepo from './controllers/add.js';
import commitRepo from './controllers/commit.js';
import pullRepo from './controllers/pull.js';
import pushRepo from './controllers/push.js';
import revertRepo from './controllers/revert.js';

import { Server } from 'socket.io';
import { Socket } from 'dgram';

yargs(hideBin(process.argv))
    .command('start','start server',{},startServer())
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
        (argv)=>{
            revertRepo(argv.commitID);
        }
    ).demandCommand(1, "You need atleast one command").help().argv


function startServer(){

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cors({origin:"*"}));

    async function connecttoDB(MONGO_URL) {
        await mongoose.connect(MONGO_URL); //return Promise
    }
    connecttoDB(MONGO_URL)
        .then(()=>{
            console.log('connected to DB');
        })
        .catch((err)=>{
            console.log('could not connect to DB');
        })

    app.get('/',(req,res)=>{
        res.send('HELLO');
    })

    const httpServer = http.createServer(app);
    const io = new Server(httpServer,{
        cors:{
            origin:"*",
            methods:['GET','POST'],
        },
    });
    
    const user = 'test';

    io.on('connection', (socket)=>{
        socket.on('joinRoom',(userID)=>{
            user = userID;
            console.log('======');
            console.log(user);
            console.log('======')
        });
    });

    const db = mongoose.connection;

    db.once('open',async ()=>{
        console.log('CRUD operations');
    });

    httpServer.listen(PORT,()=>{
        console.log('SERVER IS LISTENING...');
    })

}