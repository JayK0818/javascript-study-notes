const net = require('node:net');

(function () {
  const server = net.createServer(connection => {
    console.log('connection start')
    connection.on('end', () => {
      console.log('close')
    })
    connection.write('Hello World!');
  });
  server.listen(8080, () => {
    console.log('server is listening');
  })
})();