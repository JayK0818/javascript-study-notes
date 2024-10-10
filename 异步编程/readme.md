# 异步处理

  回调函数
  Promise
  Generator
  async-await
  发布订阅模式

  常见场景:
  1. 网络请求
  2. 定时/延时任务
  3. 事件绑定
  4. 大量数据处理 web worker

# 解释与编译

  编译相当于做好了一桌子菜, 就可以直接开吃, 而解释型语言相当于吃火锅,一边煮一边吃。

## 垃圾回收

  引用计数
  当一个值的引用次数为0, 说明变量没有在使用。 但无法解决循环引用的回收问题。

  标记清除

## 宏任务/微任务

宏任务
1. setTimeout
2. setInterval
3. requestAnimationFrame
4. setImmediate

微任务
1. process.nextTick
2. MutationObserver
3. Promise.then
