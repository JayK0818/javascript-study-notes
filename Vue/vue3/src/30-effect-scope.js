(function () {
  const app = createApp({
    setup() {
      const count = ref(0)
      const handle_click = () => {
        count.value += 1
      }
      const scope = effectScope()
      scope.run(() => { // 捕获其中所创建的响应式副作用, 捕获到的副作用可以一起处理。 (计算属性和侦听器)
        const double = computed(() => count.value * 2)
        watch(double, (v) => {
          console.log('watch-count', v)
        })
        watchEffect(() => {
          console.log('watchEffect', double.value)
        })
      })
      // scope.stop()

      // current scope
      const current_scope = getCurrentScope()
      console.log('current_scope', current_scope)
      return {
        handle_click,
        count
      }
    }
  });
  app.mount('#effect-scope-app')
})();