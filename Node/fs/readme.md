# fs

  The **node:fs** module enables interacting with the file system.

  fd 是操作系统分配给被打开文件的标识
  r: 可读
  w: 可写
  s: 同步
  a: 追加操作

  Node.js文件系统模块中的方法均有同步和异步版本。

  The **fs/promises** API provides asynchronous file system methods that return promises.

```js
// --------------- 同步版本 -------------
(function () {
  const data = fs.readFileSync(path.join(__dirname, 'data.txt'));
  console.log('fs.readFileSync', data)
})();

// ---------- promise 版本 ----------
(function () {
  fs_promise.readFile(path.join(__dirname, 'data.txt'))
    .then(res => {
      console.log('fs-promise', res)
    })
})();

fs.readFile(path.join(__dirname, 'data.txt'), (err, data) => {
  console.log('async', data)
})
```

## access

  Test user's permissions for the file or directory specified by **path**

  Using **fsPromise.access()** to check for the accessibility of a file before calling **fsPromise.open()** is not recommended.

```js
import { access, constants } from 'node:fs/promises';

try {
  await access('/etc/passwd', constants.R_OK | constants.W_OK);
  console.log('can access');
} catch {
  console.error('cannot access');
} 
```

## appendFile(path, data, options)

  Asynchronously append data to a file, creating the file if it does not yet exist.

  data can be string of buffer

```js
// 路径不存在时会创建 一个文件写入数据
fs_promise.appendFile(path.join(__dirname, 'data.txt'), ('大唐 李白'))
  .then(res => {
    console.log('appendFile success')
  })
  .catch(err => {
  console.log(err)
})
```

## copyFile(src, destination)

  Asynchronously copies **src** to **dest**. **dest** is overwritten if it already exists.

```js
fs_promise.copyFile(
  path.join(__dirname, 'data.txt'),
  path.join(__dirname, 'hello.txt')
)
```

  fsPromises.cp(src, dest) Asynchronously copies the entire directory structure from **src** to **dest**.
  including subdirectories an files.

## mkdir

  creates a directory

```js
fs_promise.mkdir(path.join(__dirname, 'src'))
```

## readdir(path, options)

  Reads the contents of a directory

  options:
    encoding 'utf8'
    recursive: boolean

```js
const read = async () => {
  const files = await fs_promise.readdir(path.join(__dirname))
  console.log(files)
  for (const file of files) {
    console.log('file:', file)
  }
  /**
   * 
   *  file: data.txt
      file: hello.txt
      file: index.js
      file: readme.md
  */
}
read()
```

## readFile(path, options)

  阅读一个文件的全部内容

  If no encoding is specified, the data is returned as a Buffer object. Otherwise the data will be a string.

```js
const file_path = path.join(__dirname, 'data.txt')
// 传递encoding
fs_promise.readFile(file_path, {
  encoding: 'utf-8'
})
  .then(res => {
    console.log(res)
    // 床前明月光,疑是地上霜。举头望明月,低头思故乡！
  })
// 未传递encoding
fs_promise.readFile(file_path)
  .then(res => {
    console.log(res)
    // <Buffer e5 ba 8a e5 89 8d e6 98 880 82 e4...>
  })
```

## writeFile(file, data, options)

  Asynchronously writes data to a file, replacing the file if it already exists.
  data can be a string, a buffer...
  The encoding option is ignored if **data** is buffer.

```js
const file_path = path.join(__dirname, 'hello.txt')
// 写入buffer
fs_promise.writeFile(file_path, Buffer.from('hello world'))

// 写入字符串
fs_promise.writeFile(file_path, '你好世界', {
  encoding: 'utf8'
})
```

## unlink(path)

  删除文件

```js
const file_path = path.join(__dirname, 'hello.txt')
fs_promise.unlink(file_path)
```

## fs.rm(path, options, callback)

  Asynchronously removes files and directories

```js
fs.rm(path.join(__dirname, 'a'), {
  recursive: true
})
```

## fs.stat(path)

```js
const file_path = path.join(__dirname, 'data.txt')
fs_promise.stat(file_path)
  .then(res => {
    console.log('stat:', res)
    console.log('isFile', res.isFile()) // true
    console.log('isDirectory', res.isDirectory()) // false
  })
/**
 * stat: Stats {
    dev: 16777233,
    mode: 33188,
    nlink: 1,
    uid: 501,
    gid: 20,
    rdev: 0,
    blksize: 4096,
    ino: 21709338,
    size: 406,
    blocks: 8,
    atimeMs: 1728911478655.9202,
    mtimeMs: 1728911477429.0437,
    ctimeMs: 1728911477429.0437,
    birthtimeMs: 1728824307589.6729,
    atime: 2024-10-14T13:11:18.656Z,
    mtime: 2024-10-14T13:11:17.429Z,
    ctime: 2024-10-14T13:11:17.429Z,
    birthtime: 2024-10-13T12:58:27.590Z
  }
  * 
*/
```

## fs.rename(oldPath, newPath, callback)

  Asynchronously rename file at **oldPath** to the pathname provided as **newPath**.

```js
fs.rename(
  path.join(__dirname, 'message.txt'),
  path.join(__dirname, 'msg.txt'),
  (err, data) => {
    console.log('文件名更改成功', data)
  }
)
```

## fs.createReadStream(path, options)

  options:
    flags
    encoding: default null.
    mode: default 0o666
    start
    end
    highWaterMark default 64 * 1024

## fs.createWriteStream(path, options)

[marked](https://www.npmmirror.com/package/marked)

[file-system-flags](https://nodejs.org/docs/latest/api/fs.html#file-system-flags)
