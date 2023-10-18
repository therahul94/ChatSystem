const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} =require('socket.io')
require('dotenv').config();

app.use(cors());
const server = http.createServer(app);

// establishing the connection --> setting the connection 
const io = new Server(server, {
    cors: {
        // It is okay to accept socket communication with this URL
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
// console.log("ghghghghg11", io);

io.on("connection", (socket)=>{
    // each user have some unique id 
    console.log(`User Connected: ${socket.id}`);
    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`user with ID: ${socket.id}, joined the room: ${data}`)
    });

    socket.on('send_message', (data)=> {
        socket.to(data.room).emit('receive_message', data);
    })
    socket.on('disconnect', ()=>{
        console.log("User Disconnected", socket.id);
    })
})

server.listen(process.env.PORT||8000, ()=>{
    console.log(`Server is connected...Running on port ${process.env.PORT}`)
})