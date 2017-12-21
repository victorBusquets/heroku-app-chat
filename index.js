let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 
io.on('connect', (socket) => {
    socket.broadcast.emit('user-connect');

    socket.on('disconnect', () => {
        io.emit('disconnect');   
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