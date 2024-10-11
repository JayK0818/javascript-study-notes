# 模块化

  复杂程序 -- 拆分成不同具有原子功能的模块
  单一模块内部的方法 应该是私有的, 向外部提供定义好的方法以及属性等

1. 全局模式

```js
// 全局污染
window.fn1 = function() {
}
window.fn2 = function () {
}
```

2. namespace

```js
const module_a = {
  message: 'hello world'
}
// 缺点: 外部可以修改内部属性
module_a.message = '你好 世界'
```

3. IIFE

```js
(function () {
  const a = 'hello world'
  function fn () {
    return a
  }
})();

// IIFE增强模式
(function () {
  // ...
})(window, lodash, Jquery)

// 不同模块引入顺序不能颠倒
```

4. CommonJS

  模块同步加载执行
  4.1 代码都是在模块内部执行
  4.2 模块如果加载多次, 只在第一次加载的时候执行
  4.3 同步加载
  4.4 输出值的复制

5. browserify

**require('modules')** in the browser
Use a node-style *require()* to organize your browser code

[Browserify](https://www.npmmirror.com/package/browserify)

6. AMD/CMD
  async module definition
  AMD: 依赖前置
  CMD: 就近依赖

  commonjs + AMD

7. ESM

  Commonjs 输出值的复制, ESM输出值的引用
  Commonjs 是运行时加载, ESM是编译时输出

8. UMD

  universal module definition
  所有格式打包
```js
(function () {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    console.log('commonjs')
  } else if (typeof define === 'function' && define.amd) {
    // amd (require.js)
  } else {
    // ...
  }
})()
```
# 包管理工具


# Installing yo and some generators

```shell
npm install -g yo
```
  Generators are npm packages named generator-XYZ.
  for example To install the webapp generator:

```shell
npm install -g generator-webapp
```

  We will use generator-webapp in our examples below ,Replace webapp with the name of your generator
  for the same result.

```js
yo webapp
```

  Easily access a generator's home page by running:

```js
npm home generator-webapp
```

  Yo else provide the following commands:

```shell
yo --help // access the full help screen
yo --generators // list every installed generators
yo --version  // get the version
```

## 接收用户输入

```js
prompting() {
  return this.prompt([
    {
      type:'input',
      name:'name',
      message:'Your project name',
      default: this.appname
    }
  ]).then(answers => {
    this.answers = answers
  })
}
```

  plop

## 项目规范约定

1. 代码相关: js/ts/style 编码规范
2. 命名与单词拼写规范
3. git提交规范

  stylelint
  cspell
  commitlint
  husky
  markdownlint
  prettier

[husky](https://typicode.github.io/husky/zh/get-started.html)

[style-lint](https://stylelint.io/user-guide/get-started/)

[commit-lint](https://commitlint.js.org/guides/getting-started.html)

[lint-staged](https://putridparrot.com/blog/category/lint-staged/)

## CI/CD

  阿里云效
