// ----------------- buffer ---------------
console.log(Buffer.alloc(10))
console.log(Buffer.alloc(10, 1));
/**
 *  <Buffer 00 00 00 00 00 00 00 00 00 00>
    <Buffer 01 01 01 01 01 01 01 01 01 01>
 * 
*/
// ---------------- Buffer.from -----------------
(function () {
  const f = Buffer.from('hello world')
  console.log(f, f.toString()) // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64> hello world

  const s1 = Buffer.from('你好世界')
  console.log(s1, s1.toString())

  const s2 = Buffer.from('你好世界', 'utf8')
  console.log(s2, s2.toString())

  const array_from = Buffer.from([1, 2, '你好', '世界'], 'utf8')
  console.log('array_from', array_from) // <Buffer 00 00>
})();

// ------------ binary-to-text encodings------------
(function () {
  const base64 = Buffer.from('hello world', 'base64')
  const hex = Buffer.from('hello world', 'hex')

  console.log(base64, hex)
  // <Buffer 85 e9 65 a3 0a 2b 95> <Buffer >

  console.log(base64.toString(), hex.toString())
})();

// ---------------- alloc ---------------
(function () {
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
  console.log('a', a) // <Buffer 62 62 62 62 62 62 62 62 62 62>
})();


// -------------- TypedArray ------------------
(function () {
  const buffer = Buffer.from([1, 2, 3, 4])
  const unit_32_array = new Uint32Array(buffer)
  console.log(unit_32_array); // Uint32Array(4) [ 1, 2, 3, 4 ]
})();

// ------------------ iteration -----------------
(function () {
  const buf = Buffer.from([1, 2, 3])
  for (const b of buf) {
    console.log('iteration:', b)
    // 1
    // 2
    // 3
  }
})();

// ------------------ Buffer.from([]) -------------------
(function () {
  const b = Buffer.from([0x62, 0x63, 0x64, 0x65])
  console.log(b)

  console.log(Buffer.from('中国'))  // <Buffer e4 b8 ad e5 9b bd>
  const c = Buffer.from([0xe4, 0xb8, 0xad, 0xe5, 0x9b, 0xbd])
  console.log(c, c.toString())  // <Buffer e4 b8 ad e5 9b bd> 中国
})();


(function () {
  console.log(Buffer.poolSize)  // 8192
  console.log(Buffer.isBuffer('hello world')) // false
  console.log(Buffer.isBuffer(Buffer.from('hello world')))  // true
  console.log(Buffer.isEncoding('utf8'))  // true
  console.log(Buffer.isEncoding('utf-8')) // true
  console.log(Buffer.isEncoding('abc'))   // false
  console.log(Buffer.isEncoding(''))      // false

  const buffer = Buffer.from('hello world')
  console.log(buffer.buffer)
  /*
    ArrayBuffer {
    [Uint8Contents]: <2f 00 00 00 00 00 00 00 68 65 6c 6c 6f 20 77 6f 72 6c 64 00 00 00 00 00 e4 bd a0 e5 a5 bd e4 b8 96 e7 95 8c 00 00 00 00 e4 bd a0 e5 a5 bd e4 b8 96 e7 95 8c 00 00 00 00 01 02 00 00 00 00 00 00 85 e9 65 a3 0a 2b 95 00 01 02 03 04 00 00 00 00 01 02 03 00 00 00 00 00 62 63 64 65 00 00 00 00 e4 b8 ad e5 ... 8092 more bytes>,
    byteLength: 8192
  }
  */
  console.log('buffer-length:', buffer.length)  // 11
})();

// --------------------- write --------------
(function () {
  const buffer = Buffer.alloc(40)
  buffer.write('hello world')
  buffer.write('你好世界', 20)

  console.log(buffer)
  // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 00 00 00 00 00 00 00 00 00 e4 bd a0 e5 a5 bd e4 b8 96 e7 95 8c 00 00 00 00 00 00 00 00>
})();

// ---------------- indexof --------------
(function () {
  const buffer = Buffer.from('this is a buffer')
  console.log(buffer.indexOf('this')) // 0
  console.log(buffer.indexOf('is'))   // 2
  console.log(buffer.indexOf('hello'))  // -1
})();

// -------------- from --------------
(function () {
  const buf1 = Buffer.from('hello')
  const buf2 = Buffer.from(buf1)
  console.log(buf1, buf2, buf1 === buf2)
  // <Buffer 68 65 6c 6c 6f> <Buffer 68 65 6c 6c 6f> false
})();

// ------------------ concat --------------
(function () {
  const buf1 = Buffer.from('中')
  const buf2 = Buffer.from('国')
  const buf3 = Buffer.from('万')
  const buf4 = Buffer.from('岁')
  const new_buffer = Buffer.concat([buf1, buf2, buf3, buf4])
  console.log(new_buffer.toString()) // 中国万岁
})();