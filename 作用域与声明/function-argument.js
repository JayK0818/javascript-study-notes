// ---------- JS的函数参数是按照值传递的 ---------------
// 基本类型是存储在栈 中, 引用类型指向堆中真实的值
(function () {
  var value = 1

  function fn (v) {
    v = 2
    console.log(v)  // 2
  }
  fn(value)
  console.log(value)  // 1
})(); 

(function () {
  const players = ['kyrie']

  function add_player(list = []) {
    list.push('durant')
    console.log('list:', list)  // ['kyrie', 'durant']
  }
  add_player(players)
  console.log(players)  // ['kyrie', 'durant']
})();

(function () {
  let o = {
    value: 1
  }
  function fn(o) {
    o = 2
    console.log('更改后的参数:',o) // 2
  }
  console.log('原始参数:',o) // { value: 1 }
  fn()
})();