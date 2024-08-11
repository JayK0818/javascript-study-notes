// 块作用域
/* try {
  var b = 10
  function foo() {
    console.log(a)
  }
  foo()
}catch(err) {
  var c = 20
  console.log('err', err) // a is not defined
}
console.log(c)  // 20
console.log(b)  // 10 */



// ------------- 函数优先 -----------
foo()

var foo;
function foo() {
  console.log(1)  // 1
}
foo = function() {
  console.log(2)
}



baz()
function baz() {
  console.log(1)
}
var baz = function() {
  console.log(2)
}
function baz() {
  console.log(3)
}

/**
 * 作用域
 * 静态作用域: 作用域在定义时就确定的
 * 动态作用域: 作用域在调用时决定的
*/
(function () {
  const v = 1
  function foo() { // 作用域在函数定义时就确定了
    console.log(v)
  }

  function bar() {
    const v = 2
    foo()
  }
  bar() // foo输出1
})();

(function () {
  var scope = 'global scope'
  function fn() {
    var scope = 'local scope'
    function f() {
      return scope
    }
    return f()
  }
  console.log(fn ())  // local scope
})();

(function () {
  var scope = 'global scope'
  function fn() {
    var scope = 'local scope'
    function f() {
      return scope
    }
    return f
  }
  console.log(fn()()) // local scope
})();

// ------------------- 执行上下文 ------------------------
(function () {
  var foo = function() {
    console.log(1)
  }
  foo()
  var foo = function () {
    console.log(2)
  }
  foo()
  // 分别执行 1 2
})();

(function () {
  function foo() {
    console.log(1)
  }
  foo()
  function foo() {
    console.log(2)
  }
  foo()
  // 分别输出 2 2
})();