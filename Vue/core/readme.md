# Vue2

  package.json

  main: commonjs规范入口
  module: esm规范入口

## util

  Vue2中的工具函数

```js
// 是否为undefined
const isUndefined = (v) => v === undefined || v === null

// 是否非undefined
const isDefined = (v) => v !== undefined && v !== null

// 是否为简单类型
const isPrimitive = (v) => {
  return typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean' ||
    typeof v === 'symbol'
}

// 是否为对象
const isObject = (v) => {
  return v !== null && typeof v === 'object'
}

// 获取数据的类型
const toRawType = v => Object.prototype.toString.call(v).slice(8, -1)

// 是否为 对象 不包括数据
const isPlainObject = (v) => Object.prototype.toString.call(v) === '[object Object]'

// 是否是一个合法的数组下标
const isValidArrayIndex = (v) => {
  const n = parseFloat(String(v))
  // 正整数, 并且是有限的
  return n >= 0 && Math.floor(n) === n && isFinite(n)
}

//是否为Promise
const isPromise = (v) => {
  return isDefined(v) && typeof v.then === 'function'
    && typeof v.catch === 'function'
}

// toArray (将一个类数组转换为数组)
const toArray = (list = [], start = 0) => {
  // start 表示从第几项开始转换
  let i = list.length - start
  const ret = new Array(i)
  while(i--) { //i-- 返回值还是 i
    // 此处 i 已经-1
    ret[i] = list[i + start]
  }
  return ret
}

// extend (合并另一个对象上的属性)
const extend = (to, from) => {
  for (const key in from) {
    to[key] = from[key]
  }
  return to
}

// 确保函数只执行一次
function once(fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

// 处理驼峰写法, 将 is-published 转换为 isPublished
const camelizeRE = /-(\w)/g // \w匹配任何字母 数字 下划线
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
```
[String.prototype.replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

## initGlobalAPI

```js
unction initGlobalAPI (Vue) {
  // Vue的全局配置
  const configDef = {}
  configDef.get = () => config
  Object.defineProperty(Vue, 'config', configDef)

  // 暴露一些工具函数
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
// 静态方法
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
  // 初始化一个options空对象
    Vue.options = Object.create(null)
  // components, filters, directives (vue的组件,指令和管道 初始化为一个空对象)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  Vue.options._base = Vue
  // 内置组件 keep-alive
  extend(Vue.options.components, builtInComponents)
  // 初始化插件系统
  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
```

## initUse

```js
// 使用插件的方式
Vue.use(plugin, {
  a: true,
  b: false,
  // ...
})

Vue.use = function (plugin: Function | Object) {
  // 存储已经注册过的插件
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  if (installedPlugins.indexOf(plugin) > -1) {
    // 防止插件重复注册
    return this
  }
  // 获取初插件之前的剩余参数
  const args = toArray(arguments, 1)
  args.unshift(this) // 将Vue作为第一个参数添加进数组, 方便后续传递给插件使用
  if (typeof plugin.install === 'function') {
    // 插件要么是一个包含install方法的对象, 或者是一个方法可以直接调用
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  // 将插件添加至已经注册的插件
  installedPlugins.push(plugin)
  return this
}
```

## initMixin

```js
function initMixin (Vue: GlobalAPI) {
  // 此处为全局混入
  Vue.mixin = function (mixin: Object) {
    // 在initGlobalAPI时注册了options对象, 对象包含components, directives等
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}

// 确保所有的props都序列化为一个对象 （props只能接受数组 或者对象的形式 )
function normalizeProps (options: Object, vm: ?Component) {
  const props = options.props
  if (!props) return
  const res = {}
  let i, val, name
  if (Array.isArray(props)) {
    // 如果props是数组的话, 数组每项必须是字符串 ['title', 'likes', 'isPublished']
    i = props.length
    while (i--) {
      val = props[i] // val为传递的字段
      if (typeof val === 'string') {
        name = camelize(val) // 将字段处理为小写驼峰写法
        res[name] = { type: null } // 该字段的类型, 后续用来校验参数是否合法
      }
    }
  } else if (isPlainObject(props)) {
    // 如果传递的props是一个对象
    /**
     * {
     *    title: String,
          isPublished: Boolean,
     * }
     {
        title: {
          type: String,
          required: true
        },
        isPublished: {
          type: Boolean,
          required: true
        }
     }
     * 
    */
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  }
  options.props = res
}

/**
 * 处理provide-inject, 转换成基于对象的形式
*/
function normalizeInject (options: Object, vm: ?Component) {
  const inject = options.inject
  if (!inject) return
  // 将接受到的inject重置为一个空对象
  const normalized = options.inject = {}
  if (Array.isArray(inject)) {
    // 如果是一个数组, 例如：   inject: ['foo'] 
    for (let i = 0; i < inject.length; i++) {
      /**
       * {
       *   foo: {
       *    from: 'foo' 
       *   }
       * }
      */
      normalized[inject[i]] = { from: inject[i] }
    }
  } else if (isPlainObject(inject)) {
    // 如果是一个对象
    /**
   *     foo: {
          from: 'bar',
          default: () => [1, 2, 3]
        }
        foo: {
          from: 'bar',
          default: 'foo'
        }
     * 
    */
    for (const key in inject) {
      const val = inject[key]
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val) // 如果没有设置来源, 则使用当前的字段名作为 from, 否则直接覆盖from
        : { from: val }
    }
  }
}

// 处理指令
/**
 * directives: {
 *  focus: { // 第一种使用方式
 *    bind (el, binding, vnode) {},
 *    update (el, binding, vnode) {}
 *  },
  * change_color (el) { 第二种使用方式
      el.style.backgroundColor = 'skyblue';
    }
 * }
 * 
*/
function normalizeDirectives (options: Object) {
  const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        // 将函数式转换为一个对象的形式, 绑定和更新时的行为一致
        dirs[key] = { bind: def, update: def }
      }
    }
  }
}

// 合并options (mixin 中合并props)
function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```