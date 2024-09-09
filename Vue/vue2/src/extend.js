// --------- extend ----------
(function () {
  const Profile = Vue.extend({ // extendOptions
    template: `<div><div class='super-container'></div></div>`,
    data() {
      return {
        message: 'super',
        count: 1
      }
    },
    computed: {
      double() {
        return this.count * 2
      }
    },
    watch: { // wacher更新是合并为一个数组
      count() {
        console.log('Super-watch-updated')
      }
    },
  })
  console.log('--------------- Profile ---------------', Profile.options)
  // 当前Profile的'全局'组件
  Profile.component('loading', {
    template: `<div style='color: red;'>Loading...</div>`
  })
  Profile.directive('focus', function (el) {
    el.focus()
  })
  Profile.directive('red', function (el) {
    el.style.color = 'red'
  })
  // 如果 调用expend时传递了 template, 则使用父类的， 否则使用自身接受的template选项
  // data选项会合并
  const profile = new Profile({
    template: `<div class='sub-container'>
      {{message}} - {{msg}}
      <button @click='handle_click'>{{count}}</button>
      <div>double: {{double}}</div>
      <div>triple: {{triple}}</div>
      <loading></loading>
      <input type='text' v-focus>
      <div v-red>hello, I am red</div>
    </div>`,
    data() {
      return {
        msg: 'sub'
      }
    },
    watch: {
      count() {
        console.log('profile-watch-updated')
      }
    },
    computed: {
      triple() {
        return this.count * 3
      }
    },
    methods: {
      handle_click() {
        this.count += 1
      }
    }
  }).$mount('#extend-app')
  console.log('profile', profile)
})();

// ----------------- extend -----------------
// vue中extend的类似实现
(function () {
  const extend = (to, from) => {
    for (const key in from) {
      to[key] = from[key]
    }
    return to
  }
  function Phone() {
    this.cid += 1
  }
  Phone.options = {
    message: 'hello Super Constructor'
  }
  function initExtend(Ctor) {
    let cid = 0
    Ctor.cid = 0
    Ctor.extend = function (extendOptions) {
      const Super = this
      const SuperId = Super.cid
      const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
      if (cachedCtors[SuperId]) {
        console.log('缓存了吗', cachedCtos[SuperId])
        return cachedCtors[SuperId]
      }
      const Sub = function VueComponent(options) {
        console.log('-----options------', options)
      }
      Sub.prototype = Object.create(Super.prototype)
      Sub.prototype.constructor = Sub
      Sub.cid = cid++
      Sub.options = extend(Super.options, extendOptions)
      Sub['super'] = Super
      cachedCtors[SuperId] = Sub
      return Sub
    }
  }
  initExtend(Phone)
  new Phone()
  new Phone()
  const XiaoMi = Phone.extend({
    name: 'xiaomi'
  })
  const xiaomi_white = new XiaoMi({
    color: 'white'
  })
  const xiaomi_black = new XiaoMi({
    color: 'black'
  })
  const HuaWei = Phone.extend({
    name: 'huawei'
  })
  const huawei_white = new HuaWei({
    color: 'white'
  })
  const huawei_black = new HuaWei({
    color: 'black'
  })
  console.log(xiaomi_white, xiaomi_black)
  console.log(huawei_white, huawei_black)
})();