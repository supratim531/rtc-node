const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log(`User connected (ID): ${socket.id}`);

  socket.on('call', data => {
    socket.broadcast.emit('receive', data);
  });
});

const port = process.env.PORT || 8888;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World from Node.js'
  });
});
