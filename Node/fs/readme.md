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
