const server = require('./server.js');
require('dotenv').config();

const port = process.env.PORT || 4000;

server.listen(4000, () => {
  console.log(`\n ***** Listening on Port ${port} ***** \n`);
})