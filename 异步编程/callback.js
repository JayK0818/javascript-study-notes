// -------------- 回调函数处理异步 -------------
(function () {
  function loading_data(callback) {
    setTimeout(() => {
      const data = { message: 'hello world' }
      callback(data)
    }, 2000)
  }
  loading_data(function (arg) {
    console.log('arg:', arg)
    // { message: 'hello world' }
  })
})();