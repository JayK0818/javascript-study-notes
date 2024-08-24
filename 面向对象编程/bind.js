(function () {
  const obj = {
    name: 'kyrie'
  }
  function fn() {
    return this.name
  }
  const bindFn = fn.bind(obj)
  console.log(bindFn())   // 'kyrie'
})();


// ------------- 手写bind -----------------
(function () {
  Function.prototype.my_bind = function (context, ...args) {
    if (typeof this !== 'function') {
      throw new Error(`${this} is not a function`)
    }
    const fn = this
/*     return function () {
      const new_args = [...args, ...arguments]
      const res = fn.call(context, ...new_args)
      return res
    } */
    // BindFn得继承来自 fn中构造函数中的属性
    const BindFn = function () {
      console.log('----arguments-----', arguments)
      const new_args = [...args, ...arguments]
      fn.call(this, ...new_args) // 继承构造函数内部的属性
      const res = fn.call(fn instanceof BindFn ? fn : context, ...new_args)
      return res
    }
    // 此时只能继承来自原型上的属性
    Object.setPrototypeOf(BindFn.prototype, fn.prototype)
    return BindFn
  }
  const obj = {
    firstName: 'kyrie'
  }
  function player(lastName, age, team) {
    this.name = 'fn'
    this.team = team
    return this.firstName + '-' + lastName + age
  }
  player.prototype.message = 'hello, 我是原型上的message'
/*   const bindFn = fn.my_bind(obj, 'irving')
  console.log('my-bind-fn', bindFn(32)) // kyrie-irving32 */

  // 通过new调用
  const bindFn = player.my_bind(obj, 'irving')
  const object = new bindFn(300, '小牛')
  console.log(object.team, object.name, object.message, JSON.stringify(object))
  /**
   * const FnBound = function () {
   *    return _this.apply(this instance of FnBound ? this : context, )
   * }
   * Object.setPrototypeOf(FnBound.prototype, this.prototype)
   * FnBound.prototype = this.prototype
  */
})();

// --------------- bin返回的函数当作构造函数使用 --------------------
(function () {
  const foo = {
    value: 1
  }
  function bar(name, age) {
    this.habit = 'hello habit'
    console.log('value:', this.value)   // undefined
    console.log('name, age', name, age) // 张三, 18
  }
  bar.prototype.friend = 'xiaoming'
  const bindBar = bar.bind(foo, '张三')
  const obj = new bindBar(18)
  console.log(obj, obj.habit, obj.friend)
  // hello habit,  xiaoming
})();