const { instrument } = require('@socket.io/admin-ui');
const express = require('express');
const app = express();
const http = require('http');
const socket = require('socket.io');

const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        credentials: true,
        methods: ['GET', 'POST'],
    }
});

let users = [];
const messages = {
    general: [],
};
io.on('connection', socket => {
    socket.on('join server', (username) => {
        const user = {
            username,
            id: socket.id,
        };
        users.push(user);
        io.emit('new user', users);
        console.log(users);

    });

    socket.on('join room', (roomName, cb) => {
        socket.join(roomName);
        // cb(messages[roomName]);
    });

    socket.on('send message', ({content, to, sender, chatName, isChannel, time}) => {
        if(isChannel){
            const load = {
                content,
                chatName,
                sender,
                time,
            };
            console.log(load)
            socket.to(to).emit('new message', load);
        }else{
            const load = {
                content,
                chatName: sender,
                sender,
                time,
            };
            socket.to(to).emit('new message', load);
        }

        // if(messages[chatName]){
        //     messages[chatName].push({
        //         sender,
        //         content,
        //     });
        // }
    });

    socket.on('delete room', (roomName) => {
        socket.in(roomName).socketsLeave(roomName);
        console.log(chatName);
    });

    socket.on('disconnect', () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit('new user', users);
    })
})

instrument(io, {auth: false});
server.listen(8000, () =>{
    console.log('Server is running, everything is fine.')
})
