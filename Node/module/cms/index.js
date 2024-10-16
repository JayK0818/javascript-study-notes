/* onst math = require('./math.js')
console.log('math', math)

console.log(math.decrease(1, 3))  // -2
console.log(math.increase(1, 3))  // 4 */

const { increase, decrease } = require('./math.js')
console.log(increase(1, 3)) // 4
console.log(decrease(1, 3)) // -2

// ---------------- module.paths ----------------
console.log(module.paths)
/**
 * [
    '/Users/jinkang/Desktop/javascript-study-notes/Node/module/cms/node_modules',
    '/Users/jinkang/Desktop/javascript-study-notes/Node/module/node_modules',
    '/Users/jinkang/Desktop/javascript-study-notes/Node/node_modules',
    '/Users/jinkang/Desktop/javascript-study-notes/node_modules',
    '/Users/jinkang/Desktop/node_modules',
    '/Users/jinkang/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
 * 
*/