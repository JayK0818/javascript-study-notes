const slot_app = createApp({
  setup (props, context) {
    console.log(props, context)
    const message = ref('你好 生活')
    const visible = ref(false)
    return {
      visible,
      message
    }
  }
})

slot_app.component('fancy-button', {
  template: `<button class='primary'><slot>Hello World</slot></button>`
})

slot_app.component('layout-component', {
  template: `<div class='layout-container'>
    <header><slot name='header'></slot></header>
    <main><slot name='main'></slot></main>
    <footer><slot name='footer'></slot></footer>
  </div>`
})


// 作用域插槽
slot_app.component('greet-component', {
  template: `<div>作用域插槽: <slot :message='message' :count='count'></slot></div>`,
  setup () {
    const message = ref('hello world')
    const count = ref(0)
    return {
      message,
      count
    }
  }
})

slot_app.component('data-slot', {
  template: `<div><slot :players='players'></slot></div>`,
  props: {
    count: [Number]
  },
  setup (props) {
    console.log('props', props.count)
    const players = ['kyrie', 'lebron', 'davis']
    return {
      players
    }
  }
})


// 具名插槽作用域
slot_app.component('name-data-slot', {
  template: `<div>
    <slot name='header'></slot>
    <slot name='footer' :message='message'></slot>
  </div>`,
  setup () {
    const message = ref('我是底部信息')
    return {
      message
    }
  }
})
slot_app.mount('#slot-app')