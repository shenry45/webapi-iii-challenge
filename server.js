const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const postsRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());
server.use(logger);
server.use(helmet());
server.use(cors());
server.use('/posts/', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// CUSTOM MIDDLEWARE
function logger(req, res, next) {
  console.log(`${req.method} for ${req.url}`);
  next();
}

module.exports = server;
