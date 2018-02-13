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
        from:'Admin',
        text:'Welcome to the chat App',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (createdMessage) => {
        console.log('createMessage:', createdMessage);
        // io.emit('newMessage', {
        //     from: createdMessage.from,
        //     text: createdMessage.text,
        //     createdAt: new Date().getTime()
        // });

        socket.broadcast.emit('createMessage', {
            from: createdMessage.from,
            text: createdMessage.text,
            createdAt: new Date().getTime()
        });
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});