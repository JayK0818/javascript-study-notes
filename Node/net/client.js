const net = require('node:net');

(function () {
  const client = net.connect({
    port: 8080,
  })
  client.on('data', chunk => {
    console.log(chunk.toString())
    client.end()
  });
  client.on('end', () => {
    console.log('断开与服务器的连接')
  })
})();