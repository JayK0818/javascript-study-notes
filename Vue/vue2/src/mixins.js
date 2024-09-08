(function () {
  // 定义每个选项的混入策略
/*   Vue.config.optionMergeStrategies.methods = function (toVal, fromVal) {
    console.log('自定义混入策略:',toVal, fromVal)
    return toVal
  } */
  Vue.mixin({
    data() {
      return {
        msg: '我是来自全局混入的msg'
      }
    },
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
        message: 'hello',
        msg: '你好吗?'
      }
    },
    mounted() {
      console.log(this.message, this.props, this.$options)
    }
  })
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
        msg: '你好世界',
        count: 10
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
    },
    methods: {
      handle_increment() {
        this.count += 1
      }
    }
  }).$mount('#mixin-app')
  console.log(Vue)
})();