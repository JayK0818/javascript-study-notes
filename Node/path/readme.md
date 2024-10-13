# path

  Node.js路径处理模块

## path.sep

  平台的路径分隔符

## basename

  path.basename() method returns the last portion of a path.

```js
console.log('basename:', path.basename(__filename))
// index.js   返回当前的文件名
```

## dirname

  path.dirname() method returns the directory name of a path

```js
path.dirname(__filename)
path.dirname(__filename) === __dirname  // true
```

## path.extname

  The **path.extname** method returns the extension of the *path*.

```js
console.log('extname', path.extname('hello.txt')) //.txt
console.log(path.extname(__filename))   // .js
console.log(path.extname(__dirname))    // ''
```

## path.isAbsolute

  The **path.isAbsolute** method determines if *path* is an absolute path.

```js
console.log(path.isAbsolute('/hello.txt'))  // true
console.log(path.isAbsolute('./hello.txt')) // false
console.log(path.isAbsolute(''))  // false
console.log(path.isAbsolute('/')) // true
```

## path.join()

  The **path.join()** method joins all given path segments together using the platform-specific separator as a
  delimiter, then normalizes the resulting path.

```js
console.log(path.join('hello', 'world', 'hello.txt')) // hello/world/hello.txt
console.log(path.join('/', 'src', 'main.js'))   //    /src/main.js
console.log(path.join('./', 'src', 'main.js'))  //    src/main.js
```

## path.resolve()

  The **path.resolve()** method resolves a sequence of paths or path segments into an absolute path.

```js

```