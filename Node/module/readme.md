# Module

  CommonJS modules are the original way to package JavaScript code for Node.js
  Node.js also support the ECMAScript modules standart used by browsers

  In Node.js, each file is treated as a separate module.
  
  CommonJS module 加载是同步的

- variables local to the module will be private. because the module is wrapped in a function by Node.js
- modules are cached after the first time they are loaded
- Built-in modules can be identified using the **node:** prefix
- To get the exact filename that will be loaded when **require()** is called, use the **require.resolve()** function.

## CommonJS modules

- Files with a **.cjs** extension
- Files with a **.js** extension when the nearest parent package.json file contains a top-level field 'type' with a
value of 'commonjs'
- Files with a **.js** extension or without an extension, when the nearest parent package.json file doesn't contain a top-level field "type" or there is no package.json in any parent folder

## ECMAScript modules

- The **.mjs** extensions is reserved form ECMAScript Modules.
- The file has **.js** extension, and the closest package.json contains "type": "module"
- The file has a **.js** extension, the closest package,json dose not contain "type": "commonjs", and the module contains eS module syntax.
- A file extension must be provided when using the import keyword to resolve relative or absolute specifiers
- *import* statements are permitted only in ES modules, but dynamic *import()* expressions are supported in Commonjs
for loading ES modules.

- No default extensions
- No folder mains

  data:URLs are supported

- text/javascript for ES modules
- application/json for JSON
- application/wasm for Wasm

```js
import fs, { readFile } from 'node:fs'
import { Buffer } from 'node:buffer'
```

  **__dirname** and **__filename** are not available in ES modules.
  (import.meta.filename / import.meta.dirname)
  (module.createRequire())

  The **await** keyword may be used in the top level body of an ECMAScript module.

```js
export const five = await Promise.resolve(5);
```

```js
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


// b.js
const a = require('./a.js')

// a.js
const b = require('./b.js')

// main.js
const a = require('./a.js')
const b = require('./b.js')
```

  In order to prevent an infinite loop, an **unfinished copy** of the **a.js** export objects object is returned to the **b.js** module.

## module wrapper

```js
(function (exports, require, module, __filename, __dirname) {
  // ...
  // __dirname: directory name of the current module
  // __filename: file name of the current module
  // exports:  A reference to the module.exports
  // require:  used to import modules
  // require.cache: modules are cached in this object when they are required.
  // require.resolve(): use the internal require() machinery to look up the location of a module.
});
```
