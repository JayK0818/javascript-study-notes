(function () {
  const player = {
    name: 'kyrie irving',
    age: 32,
    fullName: {
      firstName: 'kyrie',
      lastName: 'irving'
    },
    skill: []
  }

  const defineReactive = (target, key, value) => {
    // 深度监听
    observer(value)
    Object.defineProperty(target, key, {
      get () {
        return value
      },
      set (v) {
        if (v !== value) {
          // 如果给对象再次赋值为一个对象
          observer(v)
          value = v
          console.log('数据更新')
        }
      }
    })
  }

  // 监听数组属性更新
  const arrayPrototype = Object.call(Array.prototype);
  ['pop', 'push', 'shift', 'unshift', 'splice'].forEach(arrayMethod => {
    arrayPrototype[arrayMethod] = function() {
      const args = [...arguments]
      Array.prototype[arrayMethod].call(this, ...args)
      console.log('视图更新')
      for (const item of args) {
        observer(item)
      }
    }
  })

  function observer (data) {
    if (typeof data !== 'object' || data === null) return data
    if (Array.isArray(data)) {
      data.__proto__ = arrayPrototype
    }
    for (const key in data) {
      if (!Object.hasOwnProperty.call(data, key)) continue;
       (data, key, data[key])
      // 先取出value, 然后get函数里 不能使用data[key] 返回, 否则会造成爆栈
  /*     let value = data[key]
      Object.defineProperty(data, key, {
        get () {
          return value
        },
        set (v) {
          console.log(v)
          value = v
        }
      }) */
    }
  }
  observer(player)

  player.age = 30
  // player.fullName.firstName = 'Kyrie'
  // player.fullName.lastName = 'Irving'

  /* player.skill.push('hello')
  player.skill.pop() */
  player.skill.push('hello')

  player.skill.push({
    message: 'hello world'
  })

  player.skill[1]['message'] = '1234'
  player.skill[1]['message'] = '45432'

  const obj = {
    msg: 'hello world',
    message: '你好 生活'
  }
  with(obj) {
    console.log(msg, message)
  }
})();


// 实现一个mini-vue
(function () {
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
      this.walk(val) // 如果val是对象的话也转换为响应式
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log('get-val', val)
          return val
        },
        set(newValue) {
          if (newValue !== val) {
            val = newValue
            console.log('更新了', val)
          }
        }
      })
    }
  }
  const obj = {
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
  console.log('count:', obj.count) // 11
  class MiniVue {
    constructor(options) {
      this.$options = options ?? {}
      const { data = {}, el } = options ?? {}
      this.$data = data
      this.$el = typeof el === 'string' ? document.querySelector(el) : (typeof el === 'object' ? el : null)
      this._proxy(data)
      new Observer(this.$data)
    }
    _proxy(data) {
      Object.keys(data).forEach(key => {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true, // writable, value / getter, setter 不能同时设置
          get() {
            return data[key]
          },
          set(newValue) {
            if (newValue === this[key]) {
              return
            }
            this[key] = newValue
            console.log('我更新了')
          }
        })
      })
    }
  }
  // 编译器
  class Compiler {
    constructor(vm, el) {
      this.vm = vm
      this.el = el
      this.compile(el)
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
        this.textUpdater(node, val)
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
  const vm = new MiniVue({
    data: {
      message: 'hello world',
      count: 10,
      player: {
        firstName: 'kyrie',
        lastName: 'irving'
      },
      msg: '我是input框默认值'
    }
  })
  console.log('vm', vm)
  const compiler = new Compiler(vm, document.querySelector('#mini-vue-app'))
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