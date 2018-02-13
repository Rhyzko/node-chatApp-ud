var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'me@me.com',
        text: 'Hey, lets talk' 
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log(JSON.stringify(message));
});