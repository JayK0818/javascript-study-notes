//------------- 手写new --------------
(function () {
  function objectFactory() {
    const args = [].slice.call(arguments)
    const Constructor = args.shift()
    const obj = {}
    // 另一种方式 const object = Object.create(Constructor.prototype)
    obj.__proto__ = Constructor.prototype
    const ret = Constructor.call(obj, ...args)
    return typeof ret === 'object' ? ret : obj
  }
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  const person = objectFactory(Person, 'kyrie', 32)
  console.log('person', person) // { name: 'kyrie', age: 32 }
})();