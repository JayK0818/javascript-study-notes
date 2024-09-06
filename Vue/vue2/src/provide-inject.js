(function () {
// provide 和 inject 使用方式
  // 没法注入响应式的值
  const Child = {
    template: `<div>
      <div>字组件 - {{count}} -{{message}}</div>
      <div>{{player.firstName}}-{{player.lastName}}-{{player.age}}</div>
    </div>`,
    inject: ['count', 'message', 'player']
  }

  new Vue({
    el: '#provide-inject-app',
    data() {
      return {
        count: 0,
        player: {
          firstName: 'kyrie',
          lastName: 'irving',
          age: 30
        }
      }
    },
/*  provide: {
      count: this.count,
      message: 'hello world',
    }, */
    provide() { // 通过函数传递一个响应式对象, 对象的属性是可以监听的
      return {
        count: this.count,
        player: this.player,
        message: 'hello world'
      }
    },
    components: {
      Child
    },
    methods: {
      handle_click() {
        this.count += 1
      },
      handle_age_increment() {
        this.player.age += 1
      }
    }
  })
})();