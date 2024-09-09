# Vue2

  package.json

  main: commonjs规范入口
  module: esm规范入口

## instance

```js
// 定义vue构造函数以及实例相关属性的位置
function Vue (options) {
  // 判断是否通过new 调用
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) { //... }
  this._init(options)
}
initMixin(Vue) // 注册_int方法, 初始化vm
stateMixin(Vue) // 注册 $data, $proxy $set $delete $watch
eventsMixin(Vue) // $on $off $emit
lifecycleMixin(Vue) // 生命周期相关方法
renderMixin(Vue)  // $nextTick, _render
```

### initMixin

  在Vue.prototype上定义一个_init()方法, 接受调用`new Vue({})` 时传递的参数
```ts
// 处理构造函数上定义的一些options属性 如components, filters等
function resolveConstructorOptions (Ctor: Class<Component>) {
/*  子类的options 合并了父类上的options和 extendOptions
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    ) */
  let options = Ctor.options // 当前类接受的options
  if (Ctor.super) { // 在Vue.extend方法中定义了 Sub['super'] = Super， 对父类构造函数的引用
    /**
     * Vue.extend中 记录了父类的options
     * Sub.superOptions = Super.options
     * Sub.extendOptions = extendOptions (extendOptions 为调用Vue.extend时传递的options)
    */
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) { // Todo: 不理解这里的应用场景
      Ctor.superOptions = superOptions // 父类的options修改了, 重新更新当前子类对父类options的引用
      const modifiedOptions = resolveModifiedOptions(Ctor)
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions) // 并且将修改的options累加到当前的options中
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

let uid = 0
function initMixin (Vue: Class<Component>) {
  // 原型上定义_init方法
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++
    vm._isVue = true // 设置一个标识符避免将vue实例响应式处理
    // merge options
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      // 实例上挂载一个 $options选项, 将在Vue构造函数上的定义的属性和当前实例接受的属性合并
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    vm._self = vm
    initLifecycle(vm) // 初始化生命周期相关变量初始化， 一些标志位的定义
    initEvents(vm)  // 初始化事件相关
/**
 * function initEvents (vm: Component) {
      vm._events = Object.create(null)
      vm._hasHookEvent = false
      const listeners = vm.$options._parentListeners
      if (listeners) {
        updateComponentListeners(vm, listeners)
      }
    }
 * 
*/
    initRender(vm)  // 
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

// state相关的初始化 (state, methods, computed, watch)
function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  // propsData只限于使用new 创建的实例
  const props = vm._props = {}
  const keys = vm.$options._propKeys = [] // 存储props 键名
  // ...
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    // ...
    defineReactive(props, key, value)
    if (!(key in vm)) { // TODO:...
      proxy(vm, `_props`, key)
    }
  }
}

function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        // methods 需要是一个函数
      }
      if (props && hasOwn(props, key)) {
        // 方法名不能和接受的props字段冲突
      }
      if ((key in vm) && isReserved(key)) { // 不建议使用$ 或者 _开头
        /**
         * function isReserved (str: string): boolean {
            const c = (str + '').charCodeAt(0)
            return c === 0x24 || c === 0x5F
          }
         * 
        */
      }
    }
    // 将函数修改this指向, 指向当前实例
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}

function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
  }
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```

## mount

  实例挂载
```js
// 可能接受的是一个 选择器 或者一个Element对象
function query (el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      return document.createElement('div')
    }
    return selected
  } else {
    return el // element对象直接返回
  }
}
// 此处的$mount 在runtime/index 下定义的
const mount = Vue.prototype.$mount
// 重新原型上定义的挂载方法 （entry-runtime-with-compiler.js)
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)
  // 开发环境下的警告, 不要使用 body 或者html挂载实例
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }
  const options = this.$options
  if (!options.render) { // 如果没有render函数
    let template = options.template
    // ...
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template,
        // ...
      )
      // 将模版编译为render函数
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el, hydrating)
}
```

## util

  Vue2中的工具函数

```js
// 是否在浏览器上
const inBrowser = typeof window !== 'undefined'

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

// 将一个逗号分隔的字符串 转换为一个map, 并返回一个函数, 用来判断某个字符是否存在与这个map
function makeMap (str: string, expectsLowerCase?: boolean): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
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
export const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

// 校验是否为内置的函数
function isNative (Ctor: any) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

// 是否支持symbol
const hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

// 判断某个属性是否存在于指定的对象上
const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

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

## initAssetRegisters

```js
// 注册全局的 component/filter/directive 静态方法
const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
function initAssetRegisters (Vue: GlobalAPI) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string, // 全局组件, 指令和管道的名称
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id] // 在此之前已经在options各定义了一个空对象, 如果此前注册过相同组件或者指定等, 返回之前已经定义过的,(防止重复定义) 否则就是undefined
      } else {
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
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
  // 获取除插件之后传递的剩余参数
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
// components/filters/directives的合并策略
function mergeAssets (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    return extend(res, childVal)
  } else {
    return res
  }
}
ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})

// 递归合并mixin的data中的数据
function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal
  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from) // 获取某个对象上的属性列表
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) { // 没有的属性才设置到对象上
      set(to, key, fromVal)
    } else if (
      // 如果值是一个对象并且 不是同一个对象 再深度遍历合并
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}

// 合并mixin中的hoo, 转换为一个数组
function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
  return res
    ? dedupeHooks(res)
    : res
}
function dedupeHooks (hooks) { // 过滤掉重复的生命周期函数
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}
// 生命周期的函数的合并策略, 每个生命周期函数会合并为一个数组
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

// 默认的合并策略
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
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
      // 遍历字组件选项中的mixins对象, 合并到当前组件选项
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
  // 根据每个字段的混入/合并策略, 将当前组件与mixin中的每个选项下的数据合并
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

## initExtend

```js
export function initExtend (Vue: GlobalAPI) {
  Vue.cid = 0
  let cid = 1
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    const Sub = function VueComponent (options) {
      this._init(options)
    }
    // 构造函数的原型 指向父类构造函数的原型
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    // 合并options 所有的选项
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }
    // 允许子类继续 使用父类的静态方法
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // 子类有自身作用域的 components, directives 和管道
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup （这句不是很理解)
    if (name) {
      Sub.options.components[name] = Sub
    }
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)
    // cache constructor
    cachedCtors[SuperId] = Sub // 缓存当前改造过后的构造函数
    return Sub
  }
}
```

## 运行时

  platform/web/runtime/index

```ts
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
// 此处注册了两个全局指令, v-model / v-show
extend(Vue.options.directives, platformDirectives)
// 此处注册了两个全局组件 transition / transition-group
extend(Vue.options.components, platformComponents)

// 为false的属性值
const isFalsyAttrValue = (val: any): boolean => {
  return val == null || val === false
}
const isBooleanAttr = makeMap('allowfullscreen,async,autofocus') // ...... 

// 接受value值的标签
const acceptValue = makeMap('input,textarea,option,select,progress')
const mustUseProp = (tag: string, type: ?string, attr: string): boolean => {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}

const isReservedAttr = makeMap('style,class')

// isHTMLTag, isSVG 枚举了所有的标签, 
const isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
 // ...
)
const isReservedTag = (tag: string): ?boolean => {
  return isHTMLTag(tag) || isSVG(tag)
}
// input 的 type属性
const isTextInputType = makeMap('text,number,password,search,email,tel,url')

Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
// ...

Vue.prototype.__patch__ = inBrowser ? patch : noop
// ...
```