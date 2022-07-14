const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const connectDB = require('./config/db');
const fileupload = require("express-fileupload");
const app = express();

connectDB();

app.use(cors());
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

app.enable('trust proxy');

// Set public folder using built-in express.static middleware
app.use(express.static('public'));


// Set body parser middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize routes middleware
app.use('/api/users', require('./routes/users'));
app.use(fileupload());


// // Use express's default error handling middleware
// app.use((err, req, res, next) => {
//   if (res.headersSent) return next(err);
//   res.status(400).json({ err: err });
// });

// Start the server
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Set up socket.io
const io = socket(server);


io.on('connection', (socket) => {
 
  console.log(`Socket ${socket.id} connected.`);

  socket.on('add', data => io.socket.emit('add', data));
  socket.on('update', data => io.socket.emit('update', data));
  socket.on('delete', data => io.socket.emit('delete', data));

  socket.on('disconnect', () => {
   
    console.log(`Socket ${socket.id} disconnected.`);
   
  });
});