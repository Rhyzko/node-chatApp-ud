const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = express.static(path.join(__dirname, '../public'));

app.use(publicPath);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from:'newUserConnected',
        text:'Welcome to chat!',
        createdAt: new Date().getDate()
    });

    socket.on('createMessage', (createdMessage) => {
        console.log('createMessage:', createdMessage);
        socket.emit('newMessage', {
            from: createdMessage.from,
            text: createdMessage.text,
            createdAt: new Date().getDate() 
        })
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});