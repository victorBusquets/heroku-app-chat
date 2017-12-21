let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let usersConnected = 0;
 
io.on('connect', (socket) => {
    usersConnected++;

    io.emit('user-connect', usersConnected);
    
    socket.on('disconnect', () => {
        usersConnected--;
        socket.broadcast.emit('user-disconnect', usersConnected);   
    });
  
    socket.on('add-message', (message) => {
        socket.broadcast.emit('message', message);    
    });

    socket.on('execute-action', (action) => {
        socket.broadcast.emit('action-listened', action);
    });

    socket.on('execute-double-action', (action) => {
        socket.broadcast.emit('action-double-listened', action);
    });
    
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});

app.get( '*', function(req,res){
    res.status(200).send("Servidor listo :D!")
});