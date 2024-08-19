// this指向调用它的值
(function () {
  const bar = {
    value: 1
  }
  function fn() {
    console.log(this.value) // 1
  }
  fn.call(bar)

  // 等同于
  const baz = {
    value: 'hello world',
    fn() {
      console.log(this.value) // 'hello world'
    }
  }
  baz.fn()
})();
  
// 给call传递参数， call是一个 一个传递的, apply是传递数组
(function () {
  const bar = {
    message: 'hello world!'
  }
  function fn() {
    console.log(this.message, arguments)
    return Array.from(arguments)
  }
  console.log(fn.call(bar, 1, 2, 3, 4, 5))
})();

// ----------- 传入 this 为 null 或者 undefined
(function () {
  function fn() {
    console.log('this:', this)
    console.log('null-undefined-value',this.value)
  }
  fn.call(null) // undefined
  fn.call(undefined)  // undefined
})();

  // --------------- 手写call --------------
  (function () {
    Function.prototype.my_call = function (context, ...args) {
      const fn = this
      context.fn = this
      const res = context.fn(...args)
      delete context.fn
      return res
    }
    const bar = {
      firstName: 'kyrie',
      lastName: 'irving'
    }
    function fn(...args) {
      const args_string = args.join(',')
      return this.firstName + '-' + this.lastName + '/' + args_string
    }
    console.log(fn.my_call(bar, 'hello', 'world'))
  })();


  // --------------- 手写apply ---------------
(function () {
  Function.prototype.my_apply = function (context, arr = []) {
    console.log('arguments111', arr)
    context.fn = this
    const res = context.fn(...arr)
    delete context.fn
    return res
  }
  function baz(name, age) {
    console.log(this.message, name, age) // hello world-apply!
  }
  const bar = {
    message: 'hello world-apply'
  }
  baz.my_apply(bar)
  baz.my_apply(bar, ['kyrie', '32'])
})();