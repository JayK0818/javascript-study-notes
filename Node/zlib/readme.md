# Zlib

  The *node:zlib* module provides compression functionality implemented using Gzip, Deflate/Inflate...。

```js
const zlib = require('node:zlib')
```
  deflate是一种无损数据压缩算法, 基于哈夫曼编码和字典压缩技术。核心思想是通过消除冗余信息和利用重复出现的模式来减小数据的大小.
  inflate算法是一种无损数据解压缩算法, 用于将由deflate算法压缩的数据进行恢复。

1. zlib.createDeflate()
2. zlib.createGunzip()
3. zlib.createGzip()
4. zlib.createInflate()

5. zlib.deflate(buffer, options, callback)
6. zlib.deflateSync(buffer, options)
  compress a chunk of data;

7. zlib.gunzip()
8. zlib.gunzipSync()
  decompress a chunk of data with Gunzip

9. zlib.gzip()
10. zlib.gzipSync()
  compress a chunk of data with Gzip

11. zlib.inflate()
12. zlib.inflateSync()
  Decompress a chunk of data with inflate

```js
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
});
```