const path = require('path')

console.log('basename:', path.basename(__filename))
// index.js
console.log('dirname:', path.basename(__dirname))
// path

// ---------- path.dirname()
console.log('dirname', path.dirname(__filename))
// /Users/jinkang/Desktop/javascript-study-notes/Node/path
console.log(__dirname === path.dirname(__filename)) // true

// --------------- extname ------------
console.log('extname', path.extname('hello.txt')) //.txt
console.log(path.extname(__filename))   // .js
console.log(path.extname(__dirname))    // ''


// ------------ isAbsolutePath -----------------
console.log(path.isAbsolute(__dirname))   // true
console.log(path.isAbsolute('/hello.txt'))  // true
console.log(path.isAbsolute('./hello.txt')) // false
console.log(path.isAbsolute(''))  // false
console.log(path.isAbsolute('/')) // true

// --------------- join -------------
console.log(path.join('hello', 'world', 'hello.txt')) // hello/world/hello.txt
console.log(path.join('/', 'src', 'main.js'))   //    /src/main.js
console.log(path.join('./', 'src', 'main.js'))  //    src/main.js
console.log(path.join('', 'a', 'main.js'))  // a/main.js
console.log(path.join('..', 'a', 'main.js'))  // ../a/main.js

// ------------- sep ----------
console.log(path.sep) //  /

// ---------- format -----------
console.log(path.parse('/a/b/c/hello.js'))
/*
{
  root: '/',
  dir: '/a/b/c',
  base: 'hello.js',
  ext: '.js',
  name: 'hello'
}
*/

console.log(path.parse(__dirname))
/*
{
  root: '/',
  dir: '/Users/jinkang/Desktop/javascript-study-notes/Node',
  base: 'path',
  ext: '',
  name: 'path'
}
*/

console.log(path.parse(__filename))
/**
 * {
      root: '/',
      dir: '/Users/jinkang/Desktop/javascript-study-notes/Node/path',
      base: 'index.js',
      ext: '.js',
      name: 'index'
    }
*/

// --------------- resolve --------------
console.log(path.resolve('..', 'hello', 'main.js')) //   /Users/jinkang/Desktop/javascript-study-notes/Node/hello/main.js
console.log(path.resolve('./', 'main.js'))  //      /Users/jinkang/Desktop/javascript-study-notes/Node/path/main.js
console.log(path.resolve()) // /Users/jinkang/Desktop/javascript-study-notes/Node/path
console.log(path.resolve('a', 'b', 'c'))