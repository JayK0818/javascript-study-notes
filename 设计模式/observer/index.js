/**
 * @description 观察者模式 定义对象间的一种一对多的依赖关系, 当一个对象的状态发生改变时, 所有依赖于它的对象
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
pub_sub.fire('run', 'hello runing');
  // run: [ 'hello runing' ]

// ------------------------ 观察者模式 ------------------
// 事件发布与事件订阅相互依赖, 观察者有一个update方法, Dep会调用观察者的update方法
  // 而发布订阅模式 有一个事件中心, 发布者并不知道有谁订阅了这个事件
(function () {
  class Dep {
    constructor() {
      this.subs = [] // 记录所有订阅者
    }
    addSub(sub) {
      // 对象要有updatw方法
      if (sub && typeof sub.update === 'function') {
        this.subs.push(sub)
      }
    }
    notify() {
      this.subs.forEach(sub => {
        sub.update()
      })    
    }
  }

  class Watcher {
    update() {
      console.log('update')
    }
  }
  const dep = new Dep()

  const w_1 = new Watcher()
  const w_2 = new Watcher()

  dep.addSub(w_1)
  dep.addSub(w_2)

  dep.notify()
})();