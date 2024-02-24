/**
 * @description 观察者模式 定义对象间的一种一对多的依赖关系, 当一个对象的状态发生改变时, 所有以来于它的对象
 * 都将得到通知和更新
*/
class Subject {
  constructor() {
    this._observers = []
  }
  subscribe(...observers) {
    this._observers.push(...observers)
  }
  unsubscribe(observer) {
    this._observers = this._observers.filter(cb => cb != observer)
  }
  fire(data) {
    this._observers.forEach(cb => {
      cb(data)
    })
  }
}
const subject = new Subject()

function say() {
  console.log('say:', ...arguments)
}
function watch() {
  console.log('watch', ...arguments)
}

subject.subscribe(say, watch)
subject.fire('触发了发布订阅模式!')

/**
 * say: 触发了发布订阅模式!
   watch 触发了发布订阅模式!
*/

// ------------------------------------------
class PubSub {
  constructor() {
    this.map = {}
  }
  subscribe(key, cb) {
    this.map[key] = this.map[key] ?? []
    this.map[key].push(cb)
  }
  unsubscribe(key) {
    this.map[key] = []
  }
  fire(key, data) {
    const listeners = this.map[key] || []
    listeners.forEach(cb => {
      cb(data)
    })
  }
}
const pub_sub = new PubSub()

const walk = (...args) => {
  console.log('walk', args)
}
const run = (...args) => {
  console.log('run:', args)
}
pub_sub.subscribe('walk', walk)
pub_sub.subscribe('run', run)

pub_sub.fire('walk', 'walk...')
// walk [ 'walk...' ]
pub_sub.fire('run', 'hello runing')
// run: [ 'hello runing' ]