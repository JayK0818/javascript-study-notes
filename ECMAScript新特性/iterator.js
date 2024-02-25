const myIterator = {
  next() {
    return {
      value: 'hello world',
      done: false
    }
  },
  [Symbol.iterator]: function () {
    return this
  }
}

for (const item of myIterator) {
  console.log('my-iterator-item:', item)
  // 会一直无限循环...输出 hello world
}