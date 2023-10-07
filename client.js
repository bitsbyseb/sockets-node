'use-strict';
import {stdin,stdout} from 'node:process';
import { argv } from 'node:process';
import * as net from 'node:net';
import readline from 'node:readline';
const rl = readline.createInterface({
    input:stdin,
    output:stdout
});

const socket = new net.Socket();
const host = argv[2];
const port = argv[3];

if (argv.length < 3) {
    console.error("FATAL ERROR, last argument not found");
    process.exit(1);
}

socket.connect(port,host,()=> {
    console.log(`connected to ${host}:${port}`);
});

socket.on('error',(err)=> {
    throw err;
});

setTimeout(() => {
    rl.question('Send a username: \n',(x)=> {
        socket.write(x);    
    });
}, 500);

rl.on('line',(line) => {
    socket.write(line);
})

socket.on('data',(x)=> {
    console.log(x.toString('utf-8'));
});

socket.on('close',()=> {
    process.exit(1);
})