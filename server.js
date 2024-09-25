const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat.html', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
    console.log('Un usuario conectado');
    
    socket.on('chat message', function(data){
        console.log('Mensaje recibido:', data);
        socket.broadcast.emit('chat message', data);
    });

    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
});

http.listen(3000, function(){
    console.log('Servidor iniciado en el puerto http://localhost:3000');
});
