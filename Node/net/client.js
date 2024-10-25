const net = require('node:net');

(function () {
  // net.connect() aliases to net.createConnection()
  const client = net.connect({
    port: 8080,
  }, () => {
    client.write('你好吗？')
    console.log('callback-readyState', client.readyState) // open
  })
  client.on('data', chunk => {
    console.log(client.localAddress, client.localFamily, client.localPort);
    console.log(chunk.toString(), client.remoteAddress, client.removeFamily, client.remotePort)
    // Hello World! ::1 undefined 8080
    client.end()
  });
  client.on('connect', () => {
    client.pause()
    console.log('----- client-connect----')
    console.log('connect-readyState', client.readyState) // open
  })
  client.on('ready', () => {
    console.log('------ client-ready---------')
    console.log('ready-readyState', client.readyState) // open
    client.resume()
  })
  client.on('end', () => {
    console.log('断开与服务器的连接')
    console.log(client.pending)
  })
});

(function () {
  const client = net.connect({
    port: 8080
  });
  client.on('connect', () => {
    console.log('client-connect')
    // TCP粘包
    client.write('hello')
    client.write('world')
    client.write('你好')
    client.write('世界');
    client.end() // 结束连接
  });
  client.on('data', (chunk) => {
    console.log('client-data:', chunk.toString())
  })
  client.on('end', () => {
    console.log('client-disconnected')
  })
})();