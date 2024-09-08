(function () {
  // 设置render
  new Vue({
    render(h) {
      return h('h2', '我是通过render函数创建的')
    }
  }).$mount('#template-render-app #render-app')
})();

(function () {
  // 设置template 模版
  new Vue({
    template: `<div>我是通过template模板创建的</div>`
  })
  .$mount('#template-render-app #template-app')
})();

(function () {
  // 同时设置render 和 template模版
  new Vue({
    template: `<div>我设置了template模版</div>`,
    render(h) {
      return h('h6', '我也设置了render函数选项')
    }
  })
  .$mount('#template-render-app #render-with-template-app')
})();