const EventEmitter = require('node:events');
const fs = require('node:fs');
const path = require('node:path');

(function () {
  const emitter = new EventEmitter()

  emitter.on('update', (a, b) => {
    console.log('update fired')
    console.log('arguments:', a, b)
    console.log(emitter)
    /**
     * EventEmitter {
        _events: [Object: null prototype] { update: [Function (anonymous)] },
        _eventsCount: 1,
        _maxListeners: undefined,
        [Symbol(shapeMode)]: false,
        [Symbol(kCapture)]: false
      }
    */
  })
  emitter.emit('update')
  emitter.emit('update')
  emitter.emit('update') // 执行三次


  // ------- 传递参数 ---------
  const a = emitter.emit('update', 'hello', 'world')
  console.log('a', a) // true
});

// ----------------- 执行异步模式 -----------------
(function () {
  const emitter = new EventEmitter();
  emitter.on('update', () => {
    process.nextTick(() => {
      console.log('process.nextTick')
    });
    setImmediate(() => {
      console.log('setImmediate')
    });
    setTimeout(() => {
      console.log('setTimeout')
    }, 1000)
  })
  emitter.emit('update')
  /**
   * process.nextTick
      setImmediate
      setTimeout  1s后输出
   * 
  */
});

// ------------- 只执行一次 ---------------
(function () {
  const emitter = new EventEmitter()
  let m = 0
  emitter.once('event', () => {
    m += 1
    console.log('m:', m)  // 1
  })
  emitter.emit('event')
  emitter.emit('event')
  emitter.on('error', (err) => {
    console.log('whoops! there was an error!')
  })
  emitter.emit('error', new Error('whoops!!!'))
});

// ----------------- newListener, removeListener ----------------
(function () {
  const emitter = new EventEmitter();
  emitter.once('newListener', (event, listener) => {
    if (event === 'update') {
      console.log(listener.toString())
      emitter.on('update', listener)
    }
  })
  console.log('eventNames:', emitter.eventNames())
  emitter.once('removeListener', (event, listener) => {
    console.log('removeListener')
  })
  emitter.on('update', () => {
    console.log('A')
  })
  emitter.emit('update')  // 输出两次 A

  emitter.off('update', () => {
    console.log('remove')
  })
});

// --------------事件队列 ---------------
(function () {
  setImmediate(() => {
    console.log('setImmediate1')
  })
  setTimeout(() => {
    console.log('setTimeout')
  });
  Promise.resolve()
    .then(() => {
      console.log('promise')
    });
  console.log('start')
  process.nextTick(() => {
    console.log('nextTick');
  })
  setImmediate(() => {
    console.log('setImmediate2')
  })
  console.log('end')
  // start - end - nextTick - promise - setTimeout - setImmediate1 setImmediate2
});

// ----------- setTimeout / setImmediate --------------
(function () {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  setImmediate(() => {
    console.log('setImmediate');
  });
  // 执行顺序 不一致
});

// ------------ setTimeout 与 setImmediate 在异步回调函数 里 --------------
(function () {
  fs.readFile(path.resolve(__dirname, 'readme.md'), () => {
    setTimeout(() => {
      console.log('setTimeout')
    }, 0);
    setImmediate(() => {
      console.log('setImmediate')
    })
  });
  //  先输出 setImmediate, 后输出 setTimeout.
})();