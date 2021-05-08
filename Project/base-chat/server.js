/*REFERENCE: https://www.youtube.com/watch?v=rxzOqP9YwmM&list=LL1zZq3zJgIA_4RteZLzEvyw&index=2*/

const express = require('express')
const app = express()
const { PORT = 5000 } = process.env
var path = require('path')
app.use(express.static('static'))
const users = {}

const server = require("http").createServer(app)
const io = require('socket.io')(server)

server.listen(PORT)
console.log("Server is running")
app.get("/", (req, res,next) => {
  res.sendFile(__dirname + "/index.html")
})

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

