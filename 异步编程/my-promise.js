//--------------- 手写promise ----------------
/**
 * 初始化状态:
 *  1. status pending
 *  2. result 初始值
 *  3. 接受 resolve 和 reject 两个函数作为参数
 *  4. resolve接受一个参数作为值, reject接受异常作为参数
 *  5. 状态凝固了不可修改
 *  6. then链式调用
 *  7. 栈 异步调用
*/
class MyPromise {
  constructor(executor) {
    // 初始化状态
    this.initialState()
    this.bindExecutor()
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
    this.fulfilled_cbs = []
    this.rejected_cbs = []
  }
  initialState() {
    this.status = 'pending'
    this.result = null
  }
  bindExecutor() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  resolve(value) {
    // console.log('this', this) // 不绑定this的话, 此时this 为undefined
    if (this.status !== 'pending') {
      return
    }
    this.result = value
    this.status = 'fulfilled'
  }
  reject(reason) {
    if (this.status !== 'pending') {
      return
    }
    this.result = reason
    this.status = 'rejected'
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => reason;
    console.log('then中的this:', this)
    if (this.status === 'fulfilled') {
      onFulfilled(this.result)
    }
    if (this.status === 'rejected') {
      onRejected(this.result)
    }
    if (this.status === 'pending') {
      console.log('有异步操作')
    }
  }
}

(function () {
  const p1 = new MyPromise(function (resolve) {
    resolve('hello')
  })
  p1.resolve()
  console.log('p1:', p1)
  /**
   * p1: MyPromise {
      status: 'fulfilled',
      result: 'hello',
      resolve: [Function: bound resolve],
      reject: [Function: bound reject]
    }
   * 
  */
  const p2 = new MyPromise(function (resolve, reject) {
    reject('fail')
  })
  console.log('p2:', p2)
  /**
   * p2: MyPromise {
      status: 'rejected',
      result: 'fail',
      resolve: [Function: bound resolve],
      reject: [Function: bound reject]
    }
   * 
  */
  
  // p3
  const p3 = new MyPromise(function (resolve, reject) {
    resolve(123)
  })
    .then(res => {
      console.log('p3', res)
    })
  const p4 = new MyPromise(function (resolve, reject) {
    reject('something went wrong!')
  }).then(() => {}, err => {
    console.log('p4', err)
  })
});

// --------------- 包含异步操作 --------------
(function () {
  const p1 = new MyPromise(resolve => {
    setTimeout(() => {
      console.log('hello setTimeout')
    }, 2000)
  }).then(res => {
    console.log('res是什么:', res)
  })
  console.log(p1)
})();

// ---------------- class中的this ---------------
/* (function () {
  class Point {
    constructor() {
      this.x = 0
      this.y = 0
      // this.message = this.message.bind(this)
    }
    say() {
      console.log('我执行了吗?')
    }
    message() {
      console.log(this.x, this.y)
      this.say()
    }
  }
  const point = new Point()
  console.log(point, point.message())
})(); */
