/**
 * 
 * 构造函数.prototype === 实例对象__proto__
 * 构造函数.prototype.constructor === 构造函数
*/
function Person () {
}
// 实例化之前的属性
Person.prototype.firstName = 'kyrie'
const person = new Person()
// 实例化之后的属性
Person.prototype.lastName = 'irving'


console.log(person.__proto__ === Person.prototype) // true
console.log(Person.prototype.constructor === Person)  // true
console.log(person.constructor === Person)  // true

// Object.getPrototypeOf() 返回指定对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true

console.log(person.__proto__) // { firstName: kyrie, lastName: irving }

// ------ 原型对象的构造函数 --------
console.log('原型的构造函数:', Object.getPrototypeOf(Person.prototype)) // [Object: null prototype] {}
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype) // true
console.log(Object.getPrototypeOf(Object.prototype))  // null
console.log(Object.prototype.constructor, Person.prototype.__proto__.constructor) //[Function Object], [Function Object]

// 原型链 读取对象的属性, 有的话返回自身属性, 没有的话从原型上查找
function Car() {
}
Car.prototype.name = '奔驰'

const car = new Car()
car.name = '宝马'

console.log(car.name) // 宝马
Reflect.deleteProperty(car, 'name')
console.log(car.name) // 奔驰