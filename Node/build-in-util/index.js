const os = require('node:os');
const log = console.log;

(function () {
  log('os.tmpdir', os.tmpdir())
  log('os.endianness', os.endianness()) // CPU字节序
  log('os.hostname', os.hostname());  // 操作系统的主机名
  log('os.type', os.type());          // 操作系统名
  log('os.platform', os.platform());  // 编译时的操作系统名
  log('os.arch', os.arch());          // CPU架构
  log('os.release', os.release());
  log('os.uptime', os.uptime());
  log('os.totalmem', os.totalmem());
  log('os.freemem', os.freemem());
  log('os.cpus', os.cpus());
  /**
   * os.tmpdir /var/folders/kt/vrqg0gts6sb93999w0w_3vp40000gn/T
os.endianness LE
os.hostname jinkangdeAir
os.type Darwin
os.platform darwin
os.arch arm64
os.release 21.6.0
os.uptime 2512
os.totalmem 17179869184
os.freemem 137084928
os.cpus [
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 604340, nice: 0, sys: 318500, idle: 1589510, irq: 0 }
          },
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 582080, nice: 0, sys: 298360, idle: 1631410, irq: 0 }
          },
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 519980, nice: 0, sys: 274400, idle: 1717460, irq: 0 }
          },
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 493500, nice: 0, sys: 251810, idle: 1766540, irq: 0 }
          },
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 124160, nice: 0, sys: 36510, idle: 2351170, irq: 0 }
          },
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 89290, nice: 0, sys: 24130, idle: 2398410, irq: 0 }
          },
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 61250, nice: 0, sys: 14400, idle: 2436190, irq: 0 }
          },
          {
            model: 'Apple M1',
            speed: 2400,
            times: { user: 42430, nice: 0, sys: 9980, idle: 2459430, irq: 0 }
          }
        ]
   * 
  */
})();