const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

(function () {
  const content = fs.readFileSync(
    path.join(__dirname, './text.txt'),
    'utf-8'
  )
  console.log('content:', content)
  eval(content)
  console.log('message:', message)    // hello world!
  // txt中的变量需要使用 var定义 才可以访问 message变量
})();

// -------------- vm --------------
(function () {
  const x = 1
  const context = {
    x: 2
  }
  vm.createContext(context);

  const code = `x += 40; var y = 17`;
  vm.runInContext(code, context)
  console.log(context.x, context.y) // 42 17
  console.log(x)  // 1
})();