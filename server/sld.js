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

io.on('connection', socket => {
    console.log(socket.id)


    socket.on('disconnect', () => {
        
    })
});



instrument(io, {auth: false});
server.listen(8000, () =>{
    console.log('Server is running, everything is fine.')
})