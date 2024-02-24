/**
 * @description 单例模式
*/
const Singleton = function (name) {
  this.name = name
}
Singleton.prototype.getName = function () {
  return this.name
}
Singleton.getInstance = function (name) {
  if (!this.instance) {
    console.log('this:', this)
    this.instance = new Singleton(name)
  }
  return this.instance
}

const instance_a = Singleton.getInstance('a')
const instance_b = Singleton.getInstance('b')

console.log(instance_a, instance_b, instance_a === instance_b)
// Singleton { name: 'a' } Singleton { name: 'a' } true

/**
 * 利用闭包
*/
function Player(firstName, lastName, age) {
  this.firstName = firstName
  this.lastName = lastName
  this.age = age
}
const player = (function () {
  let _instance = null
  return function () {
    if (!_instance) {
      _instance = new Player('kyrie', 'irving', 30)
    }
    return _instance
  }
})()

const player_a = player()
const player_b = player()
console.log(player_a, player_b, player_a === player_b)
/**
 * { firstName: 'kyrie', lastName: 'irving', age: 30 } Player { firstName: 'kyrie', lastName: 'irving', age: 30 } true
*/