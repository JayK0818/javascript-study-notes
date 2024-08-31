const watchApp = createApp({
  data() {
    return {
      singer: {
        firstName: 'jay',
        lastName: 'chou'
      }
    }
  },
  watch: {
    'singer.firstName'(newValue, oldValue) {
    },
/*     singer(n, o) {
      console.log(n, o)
    } */
    singer: {
      handler(n, o) {
        // 只要没有替换对象本身， n和o相同
        console.log(n, o)
      },
      deep: true,
      immediate: true
    }
  },
  setup () {
    const question = ref('')
    const answer = ref('Questions usually contain a question mark. ;-)')
    watch(question, (newValue, oldValue) => {
      if (!newValue) return
      if (!newValue.includes('?')) return
      getAnswer()
    })
    const getAnswer = () => {
      answer.value = 'Thinking...'
      fetch('https://yesno.wtf/api').then(res => res.json())
      .then(res => {
        console.log(res)
      }).catch(() => {
        answer.value = 'Error! could not reach The API'
      })
    }
    // 监听对象属性
    const player = ref({
      firstName: 'kyrie',
      lastName: 'irving'
    })
    watch(player, (n, o) => {
      console.log(n, o)
    })
    return {
      question,
      answer,
      player
    }
  }
})

watchApp.mount('#watch-app');

// watch 监听多个值
(function () {
  const app = createApp({
    setup() {
      const state = reactive({
        count: 1,
        double_count: 2
      })
      const handle_click = () => {
        state.count += 1
        state.double_count = state.count * 2
      }
      watch([() => state.count, () => state.double_count], ([count, double_count], [prev_count, prev_double_count]) => {
        console.log('current:', count, double_count)
        console.log('prev', prev_count, prev_double_count)
      })
      return {
        state,
        handle_click
      }
    }
  });
  app.mount('#watch-multiple-value-app')
})();