const EventEmitter = require('node:events');

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
})();

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
})();

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
})();