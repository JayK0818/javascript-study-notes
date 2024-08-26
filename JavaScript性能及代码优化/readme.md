# 解释与编译

  编译相当于做好了一桌子菜, 就可以直接开吃, 而解释型语言相当于吃火锅,一边煮一边吃。

## 垃圾回收

  引用计数
  当一个值的引用次数为0, 说明变量没有在使用。 但无法解决循环引用的回收问题。

  标记清除

## 宏任务/微任务

宏任务
1. setTimeout
2. setInteval
3. requestAnimationFrame
4. setImmediate

微任务
1. prodess.nextTick
2. MutationObserver
3. Promise.then
