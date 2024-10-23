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
});

// ---------- open / end / close ---------------
(function () {
  const rs = fs.createReadStream(path.join(__dirname, 'readme.md'));
  rs.on('data', chunk => {
    console.log('chunk', chunk)
  })
  rs.on('end', () => {
    console.log('end')
  })
  rs.on('close', () => {
    console.log('close')
  })
  rs.on('open', () => {
    console.log('open')
  });
  // open ---> chunk ---> end ---> close
});

// ---------------- 可写流 ---------------
(function () {
  const rs = fs.createReadStream(path.join(__dirname, 'readme.md'), {
    highWaterMark: 30
  });
  rs.setEncoding('utf8')
  const ws = fs.createWriteStream(path.join(__dirname, 'rm.md'));

  console.log('readableLength:', rs.readableLength);
  console.log('readableHighWaterMark:', rs.readableHighWaterMark)
  console.log('readableFlowing', rs.readableFlowing);
  console.log('readableEncoding:', rs.readableEncoding);

  rs.on('close', () => {
    console.log('close')
  })
  rs.on('data', (chunk) => {
    console.log('chunk', chunk)
    setTimeout(() => {
      rs.pause();
    }, 5)
    setTimeout(() => {
      rs.resume()
    }, 300)
  })
  rs.on('end', () => {
    console.log('-----end')
    console.log('readableEnded', rs.readableEnded)
  });
  rs.on('pause', () => {
    console.log('------paused', rs.isPaused())
  });
  rs.on('resume', () => {
    console.log('-------resume')
  });

  //  ------- 可写流 --------
  ws.on('close', () => {
    console.log('ws-closed', ws.closed)
    console.log('writableHighWaterMark:', ws.writableHighWaterMark)
  });
  ws.on('finish', () => {
    console.log('ws-finished', ws.writableFinished)
  });
  ws.on('pipe', (chunk) => {
    console.log('hello', chunk)
    // ws.write(chunk)
  });
  rs.pipe(ws)
  ws.write('hello 你好', () => {
    console.log('你好, 我写完了')
  })
/*   ws.end('追加的内容', () => {
    console.log('ws-end', ws.writableEnded)
  }); */
});

// ------------ ws.write() --------------
(function () {
  const ws = fs.createWriteStream(path.join(__dirname, 'rm.md'), {
    highWaterMark: 3
  });
  let flag = ws.write('1')
  console.log('flag', flag);  // true
  flag = ws.write('2')
  console.log('flag', flag);  // true
  flag = ws.write('3')
  console.log('flag', flag);  // false
  ws.on('drain', () => {
    console.log('drain')
  });
});

// 背压机制
(function () {
  const rs = fs.createReadStream(path.join(__dirname, 'readme.md'), {
    highWaterMark: 5
  });
  const ws = fs.createWriteStream(path.join(__dirname, 'rm.md'), {
    highWaterMark: 3
  });

  let flag = true
  rs.on('data', (chunk) => {
    // 第一次调用write方法时将数据直接写入到文件中
    // 第二次调用write时将数据写入缓存中
    // flag = ws.write(chunk, () => {
    //   console.log('flag', flag, chunk.toString())
    // })
    // if (!flag) {
    //   rs.pause()
    // }
    ws.write(chunk)
  });
  ws.on('drain', () => {
    // console.log('--------drain------')
    // rs.resume()
  })
})();