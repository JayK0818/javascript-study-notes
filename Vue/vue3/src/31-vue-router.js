// vue-router 基础使用
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

// 动态路由
(function () {
  const app = createApp({
    setup() {
      const router = useRouter()
      const player_list = ref([
        {
          firstName: 'kyrie',
          lastName: 'irving',
          id: 1
        },
        {
          firstName: 'lebron',
          lastName: 'james',
          id: 2
        }
      ])
      const handle_jump = (player) => {
        console.log(player)
        router.push(`/player/${player.id}`)
      }
      return {
        player_list,
        handle_jump
      }
    }
  })
  const Player = {
    template: `<div>
      {{route.params.id}}
      <div>我是通过路由传递的参数: {{id}}</div>
      <router-view></router-view>
    </div>`,
    props: ['id'],
    setup() {
      const route = useRoute()
      const { params } = route
      console.log(params.id)
      // 监听参数变化
      watch(() => route.params.id, () => {
        console.log('hello')
      })
      onBeforeRouteUpdate(() => {
        // 更新前的路由id
        console.log('路由更新', route.params.id)
      })
      return {
        route
      }
    }
  }
  const Footer = {
    template: `<div>我将始终显示</div>`
  }
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/player/:id',
        component: Player,
        props: true,
        children: [
          {
            path: '',
            component: Footer
          }
        ]
      }
    ]
  })
  app.use(router)
  app.mount('#dynamic-param-router-app')
})();

// 路由守卫
(function () {
  const app = createApp({
  })
  const Home = {
    template: `<div>我是首页</div>`,
    beforeRouteEnter() {
      console.log('------------- beforeRouteEnter -------------')
    },
    beforeRouteLeave() {
      console.log('-------------- beforeRouteLeave -----------------')
    }
  }
  const About = {
    template: `<div>我是关于页面</div>`
  }
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Home,
        beforeEnter: (to, from) => {
          console.log('-------------beforeEnter---------') // 进入路由并且在不同路由进入时才会触发
        }
      },
      {
        path: '/about',
        component: About
      }
    ]
  })
  // 前置守卫
  router.beforeEach((to, from, next) => {
    console.log('------------ beforeEach -----------')
    console.log(to, from)
    next()
  })
  // 全局解析守卫
  router.beforeResolve(to => {
    console.log('------------ beforeResolve------------')
    console.log(to)
  })
  // 后置钩子, 不会接受next函数 也不会改变导航本身
  router.afterEach((to, from) => {
    console.log('--------------afterEach----------------')
    console.log(to, from)
  })
  app.use(router)
  app.mount('#router-guard-app')
})();