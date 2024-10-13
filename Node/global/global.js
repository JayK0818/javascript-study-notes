console.log(global)

/**
 * <ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  crypto: [Getter]
}
 * 
*/

console.log(this, this === global)  // 默认空对象 false

console.log(__dirname, __filename);

/**
 * /Users/jinkang/Desktop/javascript-study-notes/Node/global /Users/jinkang/Desktop/javascript-study-notes/Node/global/global.js
*/
console.log('----------------------------------');
(function () {
  console.log(arguments.callee.toString())
  console.log(this, global, this === global) // true
})();

console.log(JSON.stringify(arguments, null, 2))
/**
 * {
    "0": {},
    "2": {
      "id": ".",
      "path": "/Users/jinkang/Desktop/javascript-study-notes/Node/global",
      "exports": {},
      "filename": "/Users/jinkang/Desktop/javascript-study-notes/Node/global/global.js",
      "loaded": false,
      "children": [],
      "paths": [
        "/Users/jinkang/Desktop/javascript-study-notes/Node/global/node_modules",
        "/Users/jinkang/Desktop/javascript-study-notes/Node/node_modules",
        "/Users/jinkang/Desktop/javascript-study-notes/node_modules",
        "/Users/jinkang/Desktop/node_modules",
        "/Users/jinkang/node_modules",
        "/Users/node_modules",
        "/node_modules"
      ]
    },
    "3": "/Users/jinkang/Desktop/javascript-study-notes/Node/global/global.js",
    "4": "/Users/jinkang/Desktop/javascript-study-notes/Node/global"
  }
 * 
*/