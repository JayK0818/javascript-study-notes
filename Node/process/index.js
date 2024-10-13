const fs = require('fs');
const path = require('path');

(function () {
  process.on('exit', function (code) {
    // 只会执行同步代码
    console.log('退出码:', code) // 0
  })
  process.on('beforeExit', (code) => {
    // 此处可执行异步代码
    console.log('退出之前:', code)
  })
  console.log('程序执行结束');
})();

// ----------- process属性 -----------------
(function () {
  // process.stdout   标准输出流
  console.log('stdout:', process.stdout)
  // process.stdin    标准输入流
  console.log('stdin', process.stdin)
  console.log('argv', process.argv); // 命令执行脚本时的各个参数
  // 第一个参数为node, 第二个参数问当前执行文件路径， 第三个参数为接受的参数
  /**
   * argv [
        '/usr/local/bin/node',
        '/Users/jinkang/Desktop/javascript-study-notes/Node/process/index.js',
        'a'
      ]
   * 
  */
  console.log('env:', process.env)
  console.log('version', process.version)
  console.log('pid:', process.pid)
  console.log('arch', process.arch)
  console.log('platform:', process.platform)
  // 执行当前脚本的Node二进制文件的绝对路径
  console.log('execPath:', process.execPath)
  // []
  console.log('execArgv:', process.execArgv)
  /**
   * version v20.17.0
      pid: 8759
      arch arm64
      platform: darwin
  */
})();

// ------------------ process 方法 ------------------------
(function () {
  console.log('cwd:', process.cwd())
  console.log('memoryUsage', process.memoryUsage())
  /**
   * 
   *  cwd: /Users/jinkang/Desktop/javascript-study-notes/Node/process
      memoryUsage {
        rss: 33374208, 常驻内存
        heapTotal: 4505600,
        heapUsed: 3868144,
        external: 1402314,
        arrayBuffers: 10515
      }
  */
  for (let i = 0; i < 10 * 1000000; i++) {
    // { user: 49665, system: 12768 }
  }
  
  // user: 用户态CPU时间 执行用户模式
  // system: 系统态CUP时间 执行内核模式
  console.log(process.cpuUsage())
  // { user: 41698, system: 11421 }
  console.log(process.uptime())
})();

// --------------- 标准流输出 -------------------
(function () {
  console.log = function (data) {
    process.stdout.write('----' + data + '-------\n')
  }
  console.log('hello')
  console.log('world')

  const readStream = fs.createReadStream('./app.js')
  readStream.pipe(
    process.stdout
  );

  process.stdin.pipe(process.stdout)
})();