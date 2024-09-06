// 指令
(function () {
  new Vue({
    data() {
      return {
        count: 0
      }
    },
    directives: {
      focus: {
        inserted: function (el, binding, vnode) {
          console.log('inserted:', el, binding, vnode)
          el.focus()
        },
        bind() {
          console.log('bind')
        },
        update(el) {
          console.log('update', el)
        }
      },
      change_color (el) {
        el.style.backgroundColor = 'skyblue';
      }
    },
    methods: {
      handle_click() {
        this.count += 1
      }
    }
  }).$mount('#directive-app')
})();