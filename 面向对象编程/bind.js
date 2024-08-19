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
    const fn = this
    return function () {
      const new_args = [...args, ...arguments]
      const res = fn.call(context, ...new_args)
      return res
    }
  }
  const obj = {
    firstName: 'kyrie'
  }
  function fn (lastName, age) {
    return this.firstName + '-' + lastName + age
  }
  const bindFn = fn.bind(obj, 'irving')
  console.log(bindFn(32)) // kyrie-irving32
})();

// --------------- bin返回的函数当作构造函数使用 --------------------