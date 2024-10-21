const http = require('node:http')
const { AsyncLocalStorage, AsyncResource  } = require('node:async_hooks');

(function () {
  const localStorage = new AsyncLocalStorage();
  function logId (msg) {
    const id = localStorage.getStore()
    console.log(`id----- ${id == undefined ? 0 : id} - ${msg}`);
  }
  let idx = 0
  http.createServer((req, res) => {
    localStorage.run(++idx, () => {
      logId('start')
      setImmediate(() => {
        logId('finish')
        res.end('hello world');
      })
    })
  }).listen(3337, () => {
    console.log('app starting');
  })
})();