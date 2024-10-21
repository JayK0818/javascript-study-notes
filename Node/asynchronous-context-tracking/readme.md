# AsyncLocalStorage

  This class creates stores that stay coherent through asynchronous operations.

```js
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks')
```

  Each instance of AsyncLocalStorage maintains an independent storage context. Multiple instances can safely exist simultaneously
  without risk of interfering with each other's data.

1. getStore

```js
const storage = asyncLocalStorage()

console.log(storage.getStore()) // returns the current store.
```

1. run(store, callback)

```js
const store = { message: 'hello world' }
const storage = asyncLocalStorage()

store.run(store, () => {
  storage.getStore() // return the store object
})
```
