const fs = require('fs');
const path = require('path');

(function () {
  process.on('exit', function (code) {
    console.log('退出码:', code) // 0
  })
  console.log('程序执行结束');
})();

// ----------- process属性 -----------------
(function () {
  console.log('stdout:', process.stdout)
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
  /**
   * 
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