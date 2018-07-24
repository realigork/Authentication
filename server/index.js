const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); // parse incoming requests (to json)
const morgan = require('morgan'); // logging framework
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.port || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on ', port);