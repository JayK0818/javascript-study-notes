// --------- extend ----------
(function () {
  const Profile = Vue.extend({
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
    }
  })
  console.log('--------------- Profile ---------------')
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
      <div>{{count}}</div>
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
    computed: {
      triple() {
        return this.count * 3
      }
    }
  }).$mount('#extend-app')
  console.log('profile', profile)
})();