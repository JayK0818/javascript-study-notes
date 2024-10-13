const fs = require('fs')
const path = require('path')

const fs_promise = require('node:fs/promises');

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

// ----------- 异步版本 ------------
(function () {
  fs.readFile(path.join(__dirname, 'data.txt'), (err, data) => {
    console.log('async', data)
  })
})();
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
})();

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
})();

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
})();

// -------------- mkdir --------------
(function () {
  // fs_promise.mkdir(path.join(__dirname, 'src'))
})();

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
})();