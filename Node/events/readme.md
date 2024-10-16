# Events

  Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called

  1. fs.ReadStream emits an event when the file is opended
  2. a stream emits an event whenever data is available to be read.
  3. As a best practice, listeners should always be added for the 'error' events.
  
  All objects that emit events are instances of the *EventEmitter* class.

```js
const EventEmitter = reqire('node:events')

const emitter = new EventEmitter()
emitter.on('event', () => {
  console.log('event occurred')
});

emitter.emit('event')

//传递参数
emitter.on('event', 'hello', 'world')

// 只执行一次
let m = 0
emitter.once('event', () => {
  m += 1
  console.log('m:', m)  // 1
})
emitter.emit('event')
emitter.emit('event')

// add an error event
emitter.on('error', (err) => {
  console.log('whoops! there was an error!')
})
emitter.emit('error', new Error('whoops!!!'))

// ----------- 部分源码 ----------------
if (existing === undefined) {
  events[type] = listener
  ++target._eventsCount;
} else {
  if (typeof existing === 'function') {
    existing = events[type] = prepend ? [listener, existing] : [existing, listener];
  } else if (prepend) {
    existing.unshift(listener)
  } else {
    existing.push(listener)
  }
}
```

## Asynchronous

  The *EventEmitter* calls all listeners synchronously in the order in which they were registered.
  Switch to an asynchronous mode of operation using the *setImmediate()* or *process.nextTick()*

```js
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
```
