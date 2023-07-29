const fs = require('fs');
const cors = require('cors');
const express = require('express');
const productRouter = require('./router/productRouter');

// let buffer = [];
const app = express();

const corsOptions = {
  origin: '*'
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use('/api/product', productRouter);

// test api
const auth = (req, res, next) => {
  if (req.query.admin === 'true') {
    next();
  } else {
    res.json({
      message: 'To see the home page auth is required'
    });
  }
}

app.get('/', auth, (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

// port
const port = process.env.PORT || 8888;

// socket
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', data => {
    socket.join(data.room);
  });

  socket.on('send', data => {
    console.log(data);
  });

  // calling section
  // socket.emit('me', socket.id);

  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('callEnded');
  // });

  // socket.on('callUser', data => {
  //   io.to(data.to).emit('callUser', {
  //     signal: data.signal,
  //     from: data.from,
  //     name: data.name,
  //   });
  // });

  // socket.on('answerCall', data => {
  //   io.to(data.to).emit('callAccepted', data.signal);
  // });

  // new calling section
  socket.on('call', data => {
    // console.log(data);
    // console.log(data.sound);
    // buffer.push(data.sound);
    // console.log(buffer.length);
    // fs.promises.appendFile('demo.webm', data.sound);
    socket.broadcast.emit('receive', data);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

// server
// http.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
