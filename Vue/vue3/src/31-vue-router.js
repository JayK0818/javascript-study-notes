(function () {
  const app = createApp({
    setup() {
      
    }
  })
  const Home = {
    template: `<div>我是主页</div>`
  }
  const User = {
    template: `<div>我是用户页面</div>`
  }
  const Index = {
    template: `<div>Hello World</div>`
  }
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/user',
        component: User
      }
    ]
  })
  app.use(router)
  app.mount('#router-start-app')
})();