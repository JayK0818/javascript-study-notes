const inject_app = createApp({
  provide() {
    return {
      message: this.message,
      counter: computed(() => this.counter)
    }
  },
  setup () {
    const message = ref('Inject message')
    const counter = ref(0)
    setInterval(() => {
      counter.value += 1
      message.value += 'aaa'
    }, 1000)
    return {
      message,
      counter
    }
  }
})

// inject
inject_app.component('child-component', {
  template: `<div>Hello!!! ---- {{inject_message}} {{counter}}</div>`,
  inject: {
    localMessage: {
      from: 'message'
    },
    count: {
      from: 'count',
      default: 10
    },
    counter: {
      from: 'counter'
    }
  },
  created() {
    // count 是一个变量, counter是一个响应式变量
    console.log('------------------', this.localMessage, this.count, this.counter)
  },
  data() {
    return {
      inject_message: this.localMessage
    }
  }
})

inject_app.mount('#inject-app')