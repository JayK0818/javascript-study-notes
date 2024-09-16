// 实现一个mini-vue
(function () {
  // 监听者模式
  class Dep {
    constructor() {
      this.subs = []
    }
    addSub(sub) {
      if (sub && sub.update) {
        this.subs.push(sub)
      }
    }
    notify() {
      this.subs.forEach(sub => {
        console.log('执行了吗')
        sub.update()
      })
    }
  }
  // wacher
  class Watcher {
    constructor(vm, key, cb) {
      this.vm = vm
      this.key = key
      this.cb = cb
      Dep.target = this
      this.oldValue = vm[key]
      Dep.target = null
    }
    update() {
      const newValue = this.vm[this.key]
      this.cb(newValue)
    }
  }
  class Observer {
    constructor(data) {
      this.walk(data)
    }
    walk(data) {
      if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(key => {
          this.defineReactive(data, key, data[key])
        })
      }
    }
    defineReactive(data, key, val) {
      let _this = this
      const dep = new Dep()
      this.walk(val) // 如果val是对象的话也转换为响应式
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
          Dep.target && dep.addSub(Dep.target)
          console.log('我会执行吗')
          return val
        },
        set(newValue) {
          if (newValue === val) {
            return
          }
          val = newValue
          _this.walk(newValue)
          dep.notify()
        }
      })
    }
  }
/*   const obj = {
    message: 'hello world',
    count: 10,
    player: {
      firstName: 'kyrie',
      lastName: 'irving'
    }
  }
  const observer = new Observer(obj);
  console.log('observer:', obj)
  obj.count += 1
  console.log('count:', obj.count) // 11 */

  class MiniVue {
    constructor(options) {
      this.$options = options ?? {}
      this.$data = options.data
      this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : (typeof options.el === 'object' ? options.el : null)
      this._proxy(this.$data)
      new Observer(this.$data)
      new Compiler(this)
    }
    _proxy(data) { // 将对象注入到实例
      Object.keys(data).forEach(key => {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true, // writable, value / getter, setter 不能同时设置
          get() {
            console.log('我会执行吗')
            return data[key]
          },
          set(newValue) {
            if (newValue === data[key]) {
              return
            }
            data[key] = newValue
            console.log('我更新了')
          }
        })
      })
    }
  }
  // 编译器
  class Compiler {
    constructor(vm) {
      this.vm = vm
      this.compile(vm.$el)
    }
    // 编译html
    compile(root) {
      const childNodes = Array.from(root.childNodes ?? [])
      childNodes.forEach(node => {
        switch (node.nodeType) {
          case 3:
            this.compileText(node)
            break
          case 1:
            this.compileElement(node)
            break
        }
        if (node.childNodes && node.childNodes.length) {
          this.compile(node)
        }
      })
    }
    // 是不是指令
    isDirective(attrName) {
      return attrName.startsWith('v-')
    }
    // 编译文本
    compileText(node) {
      const reg = /\{\{(.+?)\}\}/
      const content = node.textContent
      const res = content.match(reg)
      if (res) {
        // 匹配成功
        const key = res[1].trim()
        const val = this.vm[key]
        node.textContent = val
        console.log('执行了')
        new Watcher(this.vm, key, (newValue) => {
          node.textContent = newValue
        })
      }
    }
    compileElement(node) {
      const attrs = Array.from(node.attributes ?? [])
      attrs.forEach(attr => {
        const attrName = attr.name
        if (this.isDirective(attrName)) {
          const directiveValue = attr.value
          const type = attrName.slice(2)
          const val = this.vm[directiveValue]
          switch (type) {
            case 'text':
              this.textUpdater(node, val)
              break
            case 'model':
              this.modelUpdated(node, val)
              break
          }
        }
      })
    }
    textUpdater(node, val) {
      node.textContent = val
    }
    modelUpdated(node, val) {
      node.value = val
    }
  }
  var vm = new MiniVue({
    data: {
      message: 'hello world',
      count: 10,
      player: {
        firstName: 'kyrie',
        lastName: 'irving'
      }, 
      msg: '我是input框默认值'
    },
    el: document.querySelector('#mini-vue-app')
  })
  console.log(vm)
  console.log('vm-message:', vm.message)
  setTimeout(() => {
    vm.message = 'xxx'
  }, 3000)
  /**
   * vm MiniVue {
      '$options': { data: { message: 'hello world', count: 10 } },
      '$data': { message: 'hello world', count: 10 },
      '$el': null,
      message: [Getter/Setter],
      count: [Getter/Setter]
    }
   * 
  */
})();