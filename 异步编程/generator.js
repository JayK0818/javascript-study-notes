// --------------- generator 基础使用 --------------
(function () {
  function* fun() {
    yield 1
    yield 2
    yield 3
  }
  const fn = fun()
  console.log(fn.next())
  console.log(fn.next())
  console.log(fn.next())
  /**
   *  { value: 1, done: false }
      { value: 2, done: false }
      { value: 3, done: false }
   * 
  */
})()
