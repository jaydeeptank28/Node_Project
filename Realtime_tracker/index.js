const express = require('express');
const app = express();

const http = require('http');

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

const path = require('path');

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

io.on('connection', function (socket) {
    //connection
    socket.on("send-location", (data) => {
        io.emit("recieve-location", { id: socket.id, ...data })
    })

    //disconnection
    socket.on("disconnect", () => {
        io.emit("user-disconnect", socket.id)
    })

});

app.get('/', (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("Server running");

})