const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const postsRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/posts/', postsRouter);

server.get('/', (req, res) => {
  res.send('Get / for posts API');
})

server.listen(4000, () => {
  console.log('\n ***** Listening on Port 4000 ***** \n');
})