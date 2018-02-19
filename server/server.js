const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = express.static(path.join(__dirname, '../public'));

app.use(publicPath);

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (createdMessage, callback) => {
        console.log('createMessage:', createdMessage);
        io.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text));
        callback('This is from the server.');
        // socket.broadcast.emit('createMessage', {
        //     from: createdMessage.from,
        //     text: createdMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});