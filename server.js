var express = require('express');
var app = express();
var http = require('http');
var socketIo = require('socket.io')
var jquery = require('jquery');
var port = process.env.PORT || 8080;

var server = http.createServer(app);
var io = socketIo.listen(server);
app.listen(port);
//server.listen(8080);

app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

var line_history = [];

io.on('connection', function(socket) {
    for (var i in line_history) {
        socket.emit('draw_line', {line: line_history[i]});
    }
    socket.on('draw_line', function(data){
        line_history.push(data.line);
        io.emit('draw_line', {line: data.line});
    });
});


