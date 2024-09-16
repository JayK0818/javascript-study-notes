(function () {
  const vm = new Vue({
    el: '#array-observer-app',
    data() {
      return {
        list: [1, 2, 3]
      }
    }
  })
  setTimeout(() => {
    vm.list.push(123)
    vm.list[0] = 100  // 无法更新视图
    vm.list.length = 0  // 无法更新视图
  }, 1000 * 2)
})();