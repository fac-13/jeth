const http = require('http');
const router = require('./router');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 7000;

const server = http.createServer(router);

server.listen(port, () => {
  console.log(`Server running on: http://${host}:${port}`);
});
