const zlib = require('node:zlib');
const { pipeline } = require('node:stream');
const fs = require('node:fs');
const http = require('node:http');

const path = require('node:path');
const gzip = zlib.createGzip();
// ----------------- stream 压缩图片 ----------------------
(function () {
/*   const source = createReadStream(path.join(__dirname, 'images/iu.jpg'));
  const destination = createWriteStream(path.join(__dirname, 'images/iu.gz'));
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log('gzip success')
    }
  }) */
});

// -------------- 压缩目录 ----------------
(function () {
  // TODO: 压缩失败
  const source = createReadStream(path.join(__dirname, '../path'));
  const destination = createWriteStream(path.join(__dirname, 'compress.zip'));
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log('gzip success')
    }
  })
});

// ----------------- zlib上的方法 -----------------------
(function () {
  const buffer = Buffer.from('hello world');
  const deflate_buffer = zlib.deflateSync(buffer);
  const inflate_buffer = zlib.inflateSync(deflate_buffer);
  const gzip_buffer = zlib.gzipSync(buffer);
  const gunzip_buffer = zlib.gunzipSync(gzip_buffer);

  console.log('---inflate/deflate----', inflate_buffer, deflate_buffer);
  console.log('deflate.toString', deflate_buffer.toString())  // 乱码
  console.log('inflate.toString', inflate_buffer.toString())  // hello world
  console.log('----gzip/gunzip----', gzip_buffer, gunzip_buffer);
  console.log('gunzip.toString', gunzip_buffer.toString()); // hello world
  console.log('gzip.toString', gzip_buffer.toString())  // 乱码

  zlib.gzip(buffer, (err, data) => {
    zlib.gunzip(data, (err, str) => {
      console.log(str, str.toString())
      // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64> hello world
    })
  })
})();