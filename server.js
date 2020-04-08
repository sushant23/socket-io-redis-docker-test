const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const app = express()
const port = 3000
const server = http.createServer(app)
const io = socketIO(server)
const redis = require('socket.io-redis');
const pmId = process.env.pm_id;
console.log("pm id", pmId)
io.adapter(redis({ host: 'localhost', port: 6379 }));


io.on('connection', function (socket) {
    const clientIp = socket.request.connection.remoteAddress

    socket.on('join_room', (roomName) => {
        console.log(['join room', clientIp, roomName])
        socket.join(roomName)
    })
    socket.on('exit_room', (roomName) => {
        console.log(['exit room', clientIp, roomName])
        socket.leave(roomName)
    })
    console.log(['Client connected socket.io', clientIp])
    socket.on('disconnect', function () {
        console.log(['Client disconnected socket.io', clientIp])
    })
})

let count = 0;

let count2 = 0

setInterval(() => {
    if (pmId == 1) {
        io.to('room1').emit("event", { count })
    }
    count++
}, 5000)

setInterval(() => {
    if (pmId == 2) {
        io.to('room2').emit("event", { count2 })
    }
    count2++
}, 5000)

// app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))