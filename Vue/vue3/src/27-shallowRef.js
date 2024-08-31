const app = createApp({
  setup() {
    // 与ref不同, 浅层ref的内部值将会原样存储和暴露， 并且不会被深层递归地转为响应式。只有对.value的访问是响应式的
    const playerList = shallowRef([
      { firstName: 'kyrie', lastName: 'irving' }
    ])
    const singerList = ref([
      { firstName: 'jay', lastName: 'chou' }
    ])
    const handle_click = () => {
      // 通过shallowRef定义的变量, 数组中每一项是一个普通对象
      console.log('playerList', playerList.value, playerList.value[0])
      console.log(singerList.value, singerList.value[0])
    }
    return {
      handle_click
    }
  }
})

app.mount('#shallowRef-app')