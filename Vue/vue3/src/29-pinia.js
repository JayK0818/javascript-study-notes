(function () {
  const { defineStore, createPinia, storeToRefs } = window.Pinia
  const useCounterStore = defineStore('counter', {
    state: () => ({
      count: 0
    }),
    actions: {
      increment() {
        this.count += 1
      }
    }
  })
  // store中定义变量的另一种写法
  const useUserStore = defineStore('user', () => {
    const user = ref('kyrie')
    const handle_reverse_user = () => {
      user.value+= 'a'
    }
    return {
      user,
      handle_reverse_user
    }
  })
  // useStore
  const app = createApp({
    setup() {
      const store = useCounterStore()
      const count = computed(() => store.$state.count)
      const handle_click = () => {
        store.increment()
      }
      const handle_reset = () => { // 重置
        store.$reset()
      }
      const double_count = computed(() => store.count * 2)
      // { user, handle_reverse_user } = userStore 直接结构属性会失去响应式, 此处Kyrie 是一个普通字符串
      const userStore = useUserStore()
      const { handle_reverse_user } = userStore
      const { user } = storeToRefs(userStore)

      // 订阅状态
      store.$subscribe((mutation, state) => {
        console.log('mutation:', mutation) // direct / patch object / patch function
        console.log('state', state)
      })
      return {
        handle_click,
        double_count,
        count,
        user,
        handle_reverse_user,
        handle_reset
      }
    }
  })
  app.use(createPinia())
  app.mount('#pinia-app')
})();