# Stream

  A stream is an abstract interface for working with streaming data in Node.js. The *node:stream* module
  provides an API for implementing the stream interface.

  streams can be readable, writable or both. All streams are instances of EventEmitter.

1. Writable: streams to which data can be written (fs.createWriteStream())
  expose methods such as *write()* and *end()* that are used to write data onto the stream.

2. Readable: streams from which data can be read (fs.createReadStream());
  use the *EventEmitter* API for notifying application code when code is available to be read off the stream.

3. Duplex: streams that are both Readable and Writable

4. Transform: Duplex streams that can modify or transform the data as it is written and read.

  The *stream/promises* API provides an alternative set of asynchronous utility functions for streams that return
  *Promise* objects rather than using callbacks.

  Both *Writable* and *Readable* streams will store data in an internal buffer.

  The amount of data potentially buffered depends on the **highWaterMark** option passed into the stream's constructor.

  Data is buffered in Readable streams when the implementation call *stream.push(chunk)*. If the consumer of the Stream dose not call *stream.read()*, the data will sit in the internal queue until it is consumed.

  Data is buffered in *Writable* streams when the *wrieable.write(chunk)* method is called repeatedly. While the total size of the internal write buffer is below the threshold set by *highWaterMark*, calls to writable.write() will return true. Once the size of the internal buffer reaches or exceeds the *highWaterMark*, *false* will be returned.

```js
const stream = require('node:stream/promises') // 引入promise版本的 stream

// 一个stream使用方式 (demo 来自node官网)
const server = http.createServer(function (req, res) {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    body += chunk;
  })
  req.on('end', () => {
    try {
      console.log('data', body); // firstName=kyrie&lastName=irving
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
```

## Readable strems

  Readable streams are an abstraction for a source from which data is consumed.

  Readable streams effectively operate in one of two modes: flowing and paused. All readable streams begin in
  paused mode but can be switched to flowing mode in one of the following ways:

- Adding a 'data' event handler.
- Calling the *stream.resume()* method
- Calling the *stream.pipe()* method to send the data to a writable.

```js
const rr = fs.createReadStream(path.join(__dirname, 'readme.md'));
rr.on('readable', () => {
  console.log('readable')
  rr.read()
});
rr.on('end', () => {
  console.log('end')
})
```

  **readable.pipe()** **readable.resume()** 或者 **readable.read()** 方式会导致 'data' 事件触发。

  The **readable** event is emitted when there is data available to be read from the stream. up to the configured high
  water mark

  In some cases, attaching a listener for the 'readable' event will cause some amount of data to be read into an
  internal buffer.

  In general, the **reabable.pipe()** and 'data' event mechanisms are easier to understand than the 'readable' event.

```js
const rr = fs.createReadStream(path.join(__dirname, 'readme.md'), {
  highWaterMark: 10 * 1024
});
rr.on('readable', () => {
  console.log('readable')
  const result = rr.read();
  console.log('result:', result)
});
rr.setEncoding('utf8');
rr.on('data', (chunk) => {
  console.log('chunk', chunk)
})
rr.on('end', () => {
  console.log('end')
})
```

  The **readable.pipe()** method returns a reference to the destination stream making it possible to set up chains of
  piped streams;

```js
const fs = require('node:fs');
const readable = fs.createReadStream(path.join(__dirname, 'hello.txt'));
const writable = fs.createWriteStream(path.join(__dirname, 'copy.txt'));

readable.pipe(writable)


const fs = require('node:fs');
const zlib = require('node:zlib');
const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w); 
```

  readable.setEncoding(encoding) sets the character encoding for data read from the *Readable* stream.
  By default, no encoding is assigned and stream data will be returned as *Buffer* objects. Setting an encoding causes
  the stream data to be returned as strings of the specified encoding rather than as *Buffer* objects.

## API from stream implementers

  Declare a new JavaScript class that extends one of the four basic stream classes (strem.Writable, stream.Readable,
  stream.Duplex or stream.Transform).

```js
const { Writable } = require('node:stream')
class MyWritable extends Writable {
  construtor() {
    super()
  }
  // ...
}
```

[API-for-stream implementers](https://nodejs.org/docs/latest/api/stream.html#api-for-stream-implementers)
