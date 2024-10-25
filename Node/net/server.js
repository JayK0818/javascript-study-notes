const net = require('node:net');

(function () {
  const server = net.createServer(socket => {
    socket.on('end', () => {
      console.log('------socket-end-----')
    });
    socket.on('close', () => {
      console.log('--------socket-close--------')
    });
    socket.on('data', (chunk) => {
      console.log('socket-chunk', chunk.toString())
      // socket.write(Buffer.from('socket/' + chunk.toString()))
    });
    socket.on('error', (err) => {
      console.log('socket-error', err)
    });
    console.log('socket-address:', socket.address())
    // Sends data on the socket. The second parameter specifies the encoding in the case of a string. It defaults to UTF8 encoding.
      socket.write('Hello World!!!')
      socket.end()
  });
  server.on('listening', () => {
    console.log('-------- start listening ------')
  });
  server.on('error', (err) => {
    console.log('-------error---------', err)
    if (err.code === 'EADDRINUSE') {
      console.log('端口被占用')
    }
  });
  server.on('connection', () => {
    console.log('------- connection ---------')
  });
  server.on('close', () => {
    console.log('-------- close -------')
  })
  server.listen(8080, () => {
    console.log(server.listening) // true 
    console.log(server.address())
    console.log('server is listening');
  })
})();