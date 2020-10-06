const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const fs = require("fs");

server.listen(process.env.PORT || 3000, ()=> {
    console.log("server running ...");
});

let listUser = [];
app.get("/", (req,res) => {
    res.send("<h1>hello</h1>");
})

io.sockets.on('connection', (socket) => {
    console.log('co ng ket noi');
    
    // socket.on('user_login', (user_name) => {
    //     if (listUser.indexOf(user_name)>-1){
    //         return;
    //     }
    //     listUser.push(user_name);
    //     socket.user = user_name;
    // });

    // co the test case nay
    socket.on('send_message', (message) => {
        console.log(message);
        io.sockets.emit('receive_message', message);
    })

    // co the test case nay 
    socket.on('radio', function(blob) {
        console.log(blob);
        // can choose to broadcast it to whoever you want
        socket.broadcast.emit('voice', blob);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})