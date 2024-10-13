# Process

  process是一个全局变量, 即global对象的属性
  它用于描述当前Node.js进程状态的对象, 提供了一个与操作系统的简单接口。

  exit: 进程准备退出
  beforeExit: node清空事件循环
  signal: 进程接受到信号时触发。
  