const fs = require('fs')
const path = require('path')

const fs_promise = require('node:fs/promises');

// --------------- 同步版本 -------------
(function () {
  const data = fs.readFileSync(path.join(__dirname, 'data.txt'));
  console.log('fs.readFileSync', data)
});

// ---------- promise 版本 ----------
(function () {
  fs_promise.readFile(path.join(__dirname, 'data.txt'))
    .then(res => {
      console.log('fs-promise', res)
    })
});

// ----------- 异步版本 ------------
(function () {
  fs.readFile(path.join(__dirname, 'data.txt'), (err, data) => {
    console.log('async', data)
  })
});
/*
<Buffer e5 ba 8a e5 89 8d e6 98 8e e6 9c 88 e5 85 89 2c e7 96 91 e6 98 af e5 9c b0 e4 b8 8a e9 9c 9c e3 80 82 e4 b8 be e5 a4 b4 e6 9c 9b e6 98 8e e6 9c 88 2c ... 18 more bytes>
fs-promise <Buffer e5 ba 8a e5 89 8d e6 98 8e e6 9c 88 e5 85 89 2c e7 96 91 e6 98 af e5 9c b0 e4 b8 8a e9 9c 9c e3 80 82 e4 b8 be e5 a4 b4 e6 9c 9b e6 98 8e e6 9c 88 2c ... 18 more bytes>
*/

// --------- 访问权限 -----------
(function () {
  // console.log(fs_promise.constants)
  const test = async () => {
    try {
      const res = await fs_promise.access(path.join(__dirname, 'data.txt'))
      console.log(res)
    } catch (err) {
    }
/*     try {
      const res = await fs_promise.access(path.join(__dirname, 'data1.txt'))
      console.log(res)
    } catch (err) {
      console.log('access-err', err)
    } */
  }
  test()
});

// -------------- appendFile ----------------
(function () {
  // 此文件路径已存在。
  fs_promise.appendFile(path.join(__dirname, 'data.txt'), ('大唐 李白'))
    .then(res => {
      console.log('appendFile success')
    })
    .catch(err => {
      console.log(err)
    });
  
  // 文件路径不存在
  fs_promise.appendFile(path.join(__dirname, 'hello.txt'), ('hello world'))
    .then(res => {
      // fs_promise.unlink(path.join(__dirname, 'hello.txt'))
      console.log('appendFile success')
    })
    .catch(err => {
      console.log(err)
  })
});

// ------------------ copyFile ---------------
(function () {
  fs_promise.copyFile(
    path.join(__dirname, 'data.txt'),
    path.join(__dirname, 'hello.txt')
  );
/*   try {
    fs_promise.cp(
      path.join(__dirname, 'src'),
      path.join(__dirname, 'copies')
    )
  } catch (err) {
    console.log('err', err)
  } */
});

// -------------- mkdir --------------
(function () {
  // fs_promise.mkdir(path.join(__dirname, 'src'))
});

// ------------- readdir ------------
(function () {
  const read = async () => {
    const files = await fs_promise.readdir(path.join(__dirname))
    console.log(files)
    for (const file of files) {
      console.log('file:', file)
    }
    /**
     * 
     * file: data.txt
      file: hello.txt
      file: index.js
      file: readme.md
    */
  }
  read()
});

// -------------- readFile --------------
(function () {
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
});

// --------------- writeFile ----------------
(function () {
  const file_path = path.join(__dirname, 'hello.txt')
  // fs_promise.writeFile(file_path, Buffer.from('hello world'))
  fs_promise.writeFile(file_path, '你好世界', {
    encoding: 'utf8'
  })
});

// --------------- 删除文件 -------------
(function () {
  const file_path = path.join(__dirname, 'hello.txt')
  fs_promise.unlink(file_path)
});

// ---------- stat ---------------
(function () {
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
});

// ------------- 标识符 -----------------
(function () {
  const file_path = path.join(__dirname, 'message.txt')
  fs_promise.writeFile(file_path, 'hello world!!!', {
    encoding: 'utf8',
    flag: 'a'
  })
});

// --------------- open / close -------------
(function () {
  const open_file = async () => {
    const file_path = path.join(__dirname, 'data.txt');
    try {
      const handler = await fs_promise.open(file_path, 'r')
      console.log('handler', handler)
      /**
       * handler FileHandle {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          close: [Function: close],
          [Symbol(shapeMode)]: false,
          [Symbol(kCapture)]: false,
          [Symbol(kHandle)]: FileHandle {},
          [Symbol(kFd)]: 16,
          [Symbol(kRefs)]: 1,
          [Symbol(kClosePromise)]: null
        }
       * 
      */
      console.log('fd:', handler.fd)
      console.log('打开成功')
      await handler.close()
      console.log('关闭成功')
    } catch (err) {
      console.log('打开失败')
    }
  }
  open_file()
});

// ------------------- read / write -------------------
(function () {
  // --------- fileHandler read ------------
  // Reads data from the file and stores that in the given buffer.
  const buffer = Buffer.alloc(20)
  const file_path = path.join(__dirname, 'message.txt')
  const read = async () => {
    const handler = await fs_promise.open(file_path, 'r')
    const res = await handler.read(buffer, 0, 10, 2)
    console.log(buffer.toString()) // llo world!
  }
  const write = async () => {
    // write string to the file
    const handler = await fs_promise.open(path.join(__dirname, 'data.txt'), 'a')
    await handler.write(buffer.toString(), 0, {
      encoding: 'utf8'
    })
  }
  read()
  write()
});

// ------------ 创建多层级文件夹 --------------
(function () {
  fs_promise.mkdir(path.join(__dirname, 'a/b/c/c'), {
    recursive: true // 递归的创建文件夹
  })
    .then(res => {
      console.log('创建成功')
    })
    .catch((err) => {
    console.log(err)
  })
});

// ---------------- 删除多层级文件夹 ---------------
(function () {
  fs.rm(path.join(__dirname, 'a'), {
    recursive: true
  })
});

// ----------- 重命名 --------------
(function () {
  fs.rename(
    path.join(__dirname, 'message.txt'),
    path.join(__dirname, 'msg.txt'),
    (err, data) => {
      console.log('文件名更改成功', data)
    }
  )
});

// -------------- 文件可读流 ---------------
