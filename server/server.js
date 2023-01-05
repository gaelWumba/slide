const { instrument } = require('@socket.io/admin-ui');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        credentials: true,
        methods: ['GET', 'POST'],
    }
});


const allMyUsers = [];
let myCurrentRoom;

io.on('connection', (socket) => {
    socket.on("join_room", room => {
        allMyUsers.push(socket);

        const myArray = Array.from(io.sockets.adapter.rooms);
      
        socket.leave(room);
        socket.join(room);
        myCurrentRoom = room;

        console.log(`joined ${myCurrentRoom} as ${socket.id}`);
    });

    socket.on('send_msg', (data) => {
        if(myCurrentRoom === undefined){
            myCurrentRoom = 'default';
        }
        data.userId = socket.id;
        console.log(data);
        io.sockets.to(myCurrentRoom).emit('receive_msg', data);
    });

})

instrument(io, {auth: false});

httpServer.listen(8000, () =>{
    console.log('Server is running, everything is fine.')
})