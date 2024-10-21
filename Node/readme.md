# Node.js

## Install

   We strongly recommend using a Node version manager like **nvm** to install Node.js and npm. We do not recommend using
   a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause
   permissions errors when you run npm packages globally.

```shell
node -v
npm -v
```

   Natives modules ---> Node C/C++ Bindings -----> v8 libuv dns http parser zlib(compression) ...

   单线程 异步非阻塞IO 配合事件回调通知(主线程是单线程)

```js
const http = require('http')
const sleep = (time) => {
   const t = Date.now() + time * 1000
   while (Date.now() < t) {}
   return
}

sleep(10)   // 需要等待此函数执行完毕
const server = http.createServer((req, res) => {
   // ...
})
server.listen(3000, () => {
})
```

   应用场景：
   IO密集型高并发请求
   实时聊天

   v8: 执行js代码
   Libuv: 事件循环,事件队列,异步IO

1. APM(应用监控 Application Performance Management) 包括 Agent(上报数据)/Monitor(收集数据)/Dashboard(展示数据)
   概念 / 搭建 / AliNode
2. 高可用
   负载均衡(服务负载均衡和 RPC 负载均衡) / 灰度发布 / 优雅退出
3. 日志
   日志原理 / 日志分析 / 日志监控 / 日志收集与处理
   ELK 架构 Sentry 日志收集平台
4. 稳定性
   安全风险 / 限流 / 错误处理
5. 测试
   单元测试 / 代码质量 / 性能测试
   Code Smell 以及代码质量检查工具 SonarQube
6. 内存泄露
   内存回收原理 / 内存问题排查实战
7. 灰度发布机制与健康检查
8. 安全风险防范
9. 异常处理

## nvm

使用 git 下载:

```shell
cd ~/ git clone https://github.com/nvm-sh/nvm.git .nvm
. ./nvm.sh
```

```json
{
   "private": "true",  // 私有包
   "preinstall": "npx only-allow pnpm",
   "packageManager": "pnpm"
}
```

[nvm 下载](https://github.com/nvm-sh/nvm)

## 镜像管理

```js
npm install nrm -g

nrm ls  查看镜像源
nrm use <镜像名称>
npm config get registry (获取当前的镜像源)
```

## USE Method

Utilization: 利用率 (以资源一个时间段内被使用的百分比来表示)
Saturation 饱和度 (某个资源排队的数量)
Errors 误差 (出现异常的数量)

计算密集型: 计算/逻辑判断量非常大并且集中的类型,因为主要占用 CPU 资源所以又叫 CPU 密集型,当计算任务数等于 CPU 核心数的时候,是 CPU 运行效率最高的时候。

I/O 密集型: 当磁盘的读取数据和输出数据非常大的类型。由于 I/O 操作的运行时间远远大于 CPU,内存运行时间,所以任务的大部分时间都是在
等待 IO 操作完成,I/O 的特点是 CPU 消耗小。

rss: Resident Set Size: 为进程执行分配的总内存
heapTotal: V8 分配的堆总大小
heapUsed: V8 执行期间实际使用的内存

autocannon (压力测试)
clinic

[Node-APM](https://gitee.com/node-apm/nodejs-memory-leak/blob/master/index.js)

## QPS(Query Per Second)

用来衡量服务的性能。QPS 指每秒钟能执行的 query。QPS 的数值越高,server 能处理的 request 越多。

峰值 QPS: 每天 80%的访问集中在 20%的时间里, 这 20%的时间叫做峰值时间。

RT: (Response-time) 响应时间: 执行一个请求从开始到最后收到响应数据所花费的总体时间, 即从客户端发起请求到收到服务器响应结果的时间。

并发数指系统同时能处理的请求数量, 反应了系统的负载能力。

Graphite / Grafana 监控 Node.js 应用

阿里云 Node.js 性能平台

## package.json

1. lists the packages your project depends on
2. specifies versions of a package that your project can use
3. makes your build reproducible, and therefore easier to share with other developers

```js
{
   "description": "包的描述", // 可以在npm.js搜索栏搜索关键字
   "keywords": ["lint", "cli"],  // 关键字
   "bin": "./bin/index.js",
   "main": "/main/index.js",     // 主入口
   "vue": "~3.2.1",  // 安装3.2的最新版本, 不低于3.2.1 但是不安装3.3, 安装时不改变大版本号和次要版本号
   "vue-router": "^4.2.1"  // 安装4.x.x的最新版本, 但是不安装5.x.x, 安装时不改变大版本号
   "vuex": "latest",  // 安装最新版本
}
```

   主版本号.次要版本.修订号

   1. 主版本号: 做了不兼容的API修改
   2. 次版本: 做了向下兼容的功能性新增
   3. 修订号: 向下兼容的问题修正

## Modules

   A module is any file or directory in the *node_modules* directory that can be loaded by the Node.js *require()* function.

   To be loaded by the Node.js *require()* function, a module must be one of the following:

   1. A folder with a **package.json** file containing a **main** field.
   2. A JavaScript file.

## Login

```shell
npm login # 用户登录

npm whoami # to test you have successfully logged in.
```

## two-factor authentication

   Two-factor authentication provides the best possible security for your account against attachers.

   You can enable two-factor authentication on your npm user account to protect against unauthorized access to your account
   and packages, either by using a **security-key** or **time-based one-time password(TOTP)** from  mobile app.

```shell
npm profile enable-2fa auth-and-writes

npm profile enable-2fa auth-only

npm profile disable-2fa

# sending a one-time password from the command line
npm publish xxx --otp=123456
```

## Manage profile settings

```shell
# viewing user account profile settings from the command line

npm profile get

# updating user account profile settings from the command line
npm profile set email xxx@xx.com
npm profile set password 123456
```

## Scopes

   When you sign up for an npm user account or create an organization, you are granted a scope that matches your user or organization name.
   You can use this scope as a namespace for related packages.

   A scope allows you to create a package with the same name as a package created by another user or organization without conflict.

   @npm/package-name

   Unscoped packages are always public.
   Private packages are always scoped.

## Private packages

   With npm private packages, you can use the npm registry to host code that is only visible to you and chosen collaborators,
   allowing you to manage and use private code alongside public code in your projects.

1. User-scoped private packages
2. Organization-scoped private packages

[semver版本文档](https://semver.org/lang/zh-CN/)

   0.0.1-alpha    内测(内部斑斑)
   0.0.1-beta     公测(测试版本)
   0.0.1-rc       relase candidate(即将作为正式版发布)
   0.0.1-lts      长期维护

## Package

### only-allow

   Force a specific package manager to be used on a project

```json
{
  "packageManager": "pnpm@9.11.0", // 指定包管理类型以及指定版本
   "scripts": {
      "preinstall": "npx only-allow pnpm"
   },
   "engines": { // 开发环境
      "node": "=16.15.1",
      "pnpm": "=7.5.1"
   },
   "peerDependencies": {
      "react": ">=16.8.0"
   }
}
```

## 多包管理工具

   lerna
   pnpm
   monorepo

1. 提供标准的工作流程

[lerna](https://www.lernajs.cn/docs/getting-started)

## validate-npm-package-name

   Give me a string an I'll tell you if it's a valid npm package name.

[validate-npm-package-name](https://www.npmmirror.com/package/validate-npm-package-name)

## npm

```shell
npm view vue
npm view react    # 查看已经发布的一些包的信息
```
