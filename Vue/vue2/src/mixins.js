(function () {
  Vue.mixin({
    created() {
      console.log('mixin-created',)
    },
    props: {
      title: {
        type: String,
      },
    }
  })
    // 全局混入
  const vm = new Vue({
    el: '#global-mixin-app',
    data() {
      return {
        message: 'hello'
      }
    },
    mounted() {
      console.log(this.message, this.props, this.$options)
    }
  })
  console.log(vm, '原型', vm.__proto__)
})();

// 合并mixins中的选项
(function () {
  const mixin = {
    data() {
      return {
        message: 'hello world',
        count: 1
      }
    },
    beforeCreate() {
      console.log('------mixin-beforeCreate------')
    },
    created() {
      console.log('------mixin ceated------')
    },
    beforeMount() {
      console.log('------mixin beforeMount------')
    },
    mounted() {
      console.log('------mixin mounted------')
    }
  }
  const Player = {
    template: `<div>我是球员页面</div>`,
    mixins: [mixin]
  }
  // 先执行mixin中的生命周期钩子函数, 然后执行实例中的钩子
  new Vue({
    data() {
      return {
        message: 'hello',
        msg: '你好世界'
      }
    },
    mixins: [mixin],
    components: {
      Player
    },
    beforeCreate() {
      console.log('------vm-beforeCreate------')
    },
    created() {
      console.log('------vm ceated------')
    },
    beforeMount() {
      console.log('------vm beforeMount------')
    },
    mounted() {
      console.log('------vm mounted------')
    }
  }).$mount('#mixin-app')
  console.log(Vue)
})();