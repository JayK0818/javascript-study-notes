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