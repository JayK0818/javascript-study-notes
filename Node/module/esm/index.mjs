import { decrease, increase } from './math.mjs'

console.log(decrease(1, 3)) // -2
console.log(increase(1, 3)); // 4

// ------------ import.meta ---------------
(function () {
  console.log('dirname:', import.meta.dirname);
  console.log('filename:', import.meta.filename);
  console.log('resolve', import.meta.resolve('./math.mjs'));
  /**
   * dirname: /Users/jinkang/Desktop/javascript-study-notes/Node/module/esm
    filename: /Users/jinkang/Desktop/javascript-study-notes/Node/module/esm/index.mjs
    resolve file:///Users/jinkang/Desktop/javascript-study-notes/Node/module/esm/math.mjs
  */
})();