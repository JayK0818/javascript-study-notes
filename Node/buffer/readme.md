# Buffer
  
  The Buffer class is a global type of dealing with binary data directly.

  Buffer objects are used to represent a fixed-length sequence of bytes.

  The **Buffer** class is a subclass of JavaScript's **Unit8Array** class and extends it with methods that cover
  additional use cases.

  实现Node.js平台下的二进制数据操作
  不占据V8堆内存大小的内存空间 对应于V8堆内存之外的一块原始内存。

```js
console.log(Buffer.poolSize)  // 8192
console.log(Buffer.isBuffer('hello world')) // false
console.log(Buffer.isBuffer(Buffer.from('hello world')))  // true
console.log(Buffer.isEncoding('utf8'))  // true
console.log(Buffer.isEncoding('utf-8')) // true
console.log(Buffer.isEncoding('abc'))   // false
console.log(Buffer.isEncoding(''))      // false
```

  buffer[index]: index operator can be used to get and set the octet at position index in buffer
  buffer.buffer: underlying ArrayBuffer object based on which this Buffer object is created

## Buffer.from

```js
const f = Buffer.from('hello world')
console.log(f, f.toString()) // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64> hello world

const s = Buffer.from('你好世界', 'utf8')
console.log(s.toString())   // 你好世界

/**
 * Buffer.from(array) Allocates a new Buffer using an array of bytes in the range 0-255.
*/
console.log(Buffer.from('中国'))  // <Buffer e4 b8 ad e5 9b bd>
const c = Buffer.from([0xe4, 0xb8, 0xad, 0xe5, 0x9b, 0xbd])
console.log(c, c.toString())  // <Buffer e4 b8 ad e5 9b bd> 中国

// 如果传递一个buffer, 根据传入的buffer返回一个新的buffer
// Copies the passed buffer data onto a new Buffer instance
const buf1 = Buffer.from('hello')
const buf2 = Buffer.from(buf1)
console.log(buf1, buf2, buf1 === buf2)
// <Buffer 68 65 6c 6c 6f> <Buffer 68 65 6c 6c 6f> false
```

  Node.js 目前支持的字符编码
  ascii
  utf8 alias utf-8, 默认的编码格式.
  binary

  binary-to-text encodings.
  base64
  hex

## Buffer.alloc

  返回一个指定大小的Buffer实例, 默认填满0

```js
const a = Buffer.alloc(10)
const b = Buffer.alloc(10, 'a')
console.log(a, b)
/**
 * <Buffer 00 00 00 00 00 00 00 00 00 00>
 * <Buffer 61 61 61 61 61 61 61 61 61 61>
*/
console.log(a.toString(), b.toString())
// '' aaaaaaaaaa

a.fill('b')
console.log(a) // <Buffer 62 62 62 62 62 62 62 62 62 62>
```

## TypedArrays

  Buffer instances are also JavaScript **Unit8Array** and **TypedArray** instances. All TypedArray methods are available
  on **Buffer**s.

```js
const buffer = Buffer.from([1, 2, 3, 4])
const unit_32_array = new Uint32Array(buffer)
console.log(unit_32_array); // Uint32Array(4) [ 1, 2, 3, 4 ]
```

## Iteration

  Buffer instances can be iterated over using **for...of** syntax

```js
const buf = Buffer.from([1, 2, 3])
for (const b of buf) {
  console.log('iteration:', b)
  // 1
  // 2
  // 3
}
```

## buffer.write

  写入Node缓冲区

  buffer.write(string, offset, length, encoding)
  string: 写入的字符串
  offset: 开始写入的索引值
  length: 写入的字节数
  encoding: 使用的编码

```js
const buffer = Buffer.alloc(40)
buffer.write('hello world')
buffer.write('你好世界', 20)

console.log(buffer)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 00 00 00 00 00 00 00 00 00 e4 bd a0 e5 a5 bd e4 b8 96 e7 95 8c 00 00 00 00 00 00 00 00>
```

## buffer.indexOf

```js
const buffer = Buffer.from('this is a buffer')
console.log(buffer.indexOf('this')) // 0
console.log(buffer.indexOf('is'))   // 2
console.log(buffer.indexOf('hello'))  // -1
```

## buffer.concat

```js
const buf1 = Buffer.from('中')
const buf2 = Buffer.from('国')
const buf3 = Buffer.from('万')
const buf4 = Buffer.from('岁')
const new_buffer = Buffer.concat([buf1, buf2, buf3, buf4])
console.log(new_buffer.toString()) // 中国万岁
```
