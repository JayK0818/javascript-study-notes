const http = require('node:http');
const stream = require('node:stream/promises');
const path = require('path');
const fs = require('node:fs');

(function () {
  const server = http.createServer(function (req, res) {
    let body = '';
    // req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
    })
    req.on('end', () => {
      try {
        console.log('data', body);
        res.write('success')
        res.end()
      } catch (err) {
        console.log('err', err)
      }
    })
  });
  server.listen(3337, () => {
    console.log('app starting at port 3337');
  })
});

// --------------- readStream -------------
(function () {
  const read = async () => {
    const rs = fs.createReadStream(path.join(__dirname, 'readme.md'))
    rs.pipe(process.stdout)
    // process.stdout 可写流
  };
  read()
});

// --------- readable event -------------
(function () {
  const rr = fs.createReadStream(path.join(__dirname, 'readme.md'));
  rr.on('readable', () => {
    console.log('readable')
    const result = rr.read();
    console.log('result:', result)
  });
  rr.on('data', (chunk) => {
    console.log('chunk', chunk)
  })
  rr.on('end', () => {
    console.log('end')
  })
});

// -------------- resume() --------------
(function () {
  const rr = fs.createReadStream(path.join(__dirname, 'readme.md'), {
    highWaterMark: 300
  });
  rr.on('data', chunk => {
    console.log(`received ${chunk.length} bytes of data`);
    rr.pause();
    setTimeout(() => {
      rr.resume();
    }, 1000);
  })
  rr.read()
});

// --------------- 写入流 ----------------
(function () {
  const readStream = fs.createReadStream(path.join(__dirname, 'readme.md'));
  const writeStream = fs.createWriteStream(path.join(__dirname, 'copy.md'));
  readStream.on('data', (chunk) => {
    writeStream.write(chunk)
  });
  readStream.on('end', () => {
    console.log('end...')
  })
  // readStream.pipe(writeStream)
})();