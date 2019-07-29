const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("messages", msg => {
        console.log(msg);
        io.emit("messages", msg);
    });
});

server.listen(port, () => console.log("server running on port:" + port));
