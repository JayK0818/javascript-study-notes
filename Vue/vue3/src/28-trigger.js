(function () {
  const app = createApp({
    mounted() {
      console.log('mounted', this)
    },
    setup() {
      const instance = getCurrentInstance()
      const count = ref(0)
      const name = ref('hello')
      const double_count = computed(() => count.value * 2)
      const handle_click = () => {
        count.value += 1
      }
      onRenderTracked((e) => {
        console.log(Date.now())
        console.log('render-tracked', e)
      })
      onRenderTriggered((e) => {
        console.log('render-triggered', e)
      })
      onMounted(() => {
        console.log(Date.now())
      })
      console.log('instance', instance)
      const { axios } = instance.appContext.config.globalProperties
      axios()
      // 获取全局注册的属性
      return {
        count,
        double_count,
        handle_click
      }
    }
  })
  // 先定义好属性, 然后再挂载app
  app.config.globalProperties.axios = function () {
    console.log('hello axios')
  }
  app.mount('#trigger-app')
})();