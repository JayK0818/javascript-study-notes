const sum_function = (x: number, y: number): number => x + y

function multiple_function(x: number, y: number) {
  return x * y
}

// -------------- 可选参数 -------------
function optional_argument_function (x: number, y?: number): number|string {
  if (typeof y === 'undefined') return x.toString()
  return x + y
}

console.log(multiple_function(3, 4))
console.log(optional_argument_function(12, 3))
console.log(optional_argument_function(3))

// ------- 可选参数必须位于函数列表末尾位置 ---------------
function many_optional_argument_function (x: number, y?: number, z?: number) {
  return x + (y??0) + (z??0)
}

console.log(many_optional_argument_function(1))       // 1
console.log(many_optional_argument_function(3, 5))    // 8
console.log(many_optional_argument_function(1, 2, 5)) // 8

console.log(undefined ?? 1) // 1
console.log(null ?? 10)     // 10
console.log(123 ?? 345)     // 123


// ------------------- 默认参数 -------------------
const default_argument_function = (x: number, y = 123): number => {
  return x + y
}

console.log(default_argument_function(2, 3))        // 5
console.log(default_argument_function(2))           // 125
console.log(default_argument_function(2, undefined))  // 125


const default_arguments_function = (x = 1, y = 2): number => {
  return x + y
}
console.log(default_arguments_function(3, 5)) // 8
console.log(default_arguments_function(10))   // 12


// ---------------- 剩余参数 -------------
const rest_arguments_function = (...x: number[]) => x.reduce((p, n) => p + n, 0)
console.log(rest_arguments_function(3, 4, 5, 6))  // 18

const arguments_sum_function = (...args: number[]): number => {
  let sum = 0
  for (let i = 0, length = args.length; i < length; i++) {
    sum += args[i]
  }
  return sum
}
console.log(arguments_sum_function(1, 2, 3, 4, 5))  // 15


// ---------------- 元祖类型剩余参数 -------------
const rest_tuple_arguments = (...args: [number, boolean]): number => {
  const [x, y] = args
  return x + Number(y)
}
console.log(rest_tuple_arguments(2, true))  // 3
console.log(rest_tuple_arguments(2, false)) // 2


//------- 可选参数 元祖 -------
const option_rest_tuple_arguments = (...args: [number, boolean?]):number => {
  const [x, y] = args
  if (typeof y === undefined) return x
  return x + Number(y)
}

const hello_world = (...args: [boolean, number[]]): number => {
  const [x, y] = args
  return Number(x) + y.reduce((p, n) => p + n, 0)
}

console.log(hello_world(true, [2, 3, 4, 5]))    // 15
console.log(hello_world(false, [2, 3, 4, 5]))   // 14

// ------------- 解构参数类型 -----------
const f0 = ([x, y]: [number, number]) => {
  return x + y
}
console.log(f0([3, 5]))   // 8

const f1 = ({ x, y}: {x: number, y: number}):number => {
  return x + y
}
console.log(f1({ x: 123, y: 456 }))   // 579


// ---------- 函数类型字面量 -----------
let add: (x: number, y: number) => number

add = function(x: number, y: number): number {
  return x + y
}

type SumFunction = (x: number, y: number) => number
const sum_function_1: SumFunction = (x, y) => x + y
console.log(sum_function_1(3, 5))
console.log(sum_function_1(4, 9))

let invoke_function: { (x: number, y: string): number }
invoke_function = (x, y) => x + Number(y)
console.log(invoke_function(3, '5'))  // 8


const abs0: (x: number) => number = Math.abs
const abs1: { (x: number): number } = Math.abs
console.log(abs0(123), abs0(-123), abs1(123), abs1(-123)) // 123  123  123  123

// 函数添加一个属性
console.log(abs0.name, abs1.name) // abs  abs

type VersionFunction = { version: string; (x: number): void }
const version_function: VersionFunction = (x) => {
  console.log(x)
}
version_function.version = '123'


// ------------- 构造函数 --------------
let Dog: { new (name: string): object }
Dog = class {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}
const dog = new Dog('kyrie')

// ------------------ 调用签名与构造签名 -------------------
const number_a = Number(1)
const number_b = new Number(2)
console.log(number_a, number_b)
/* 
declare const F: {
  new (x: number): Number
  (x: number): number
}
const number_c: number = F(123)
const number_d: Number = new F(456)
console.log(number_c, number_d, typeof number_c, typeof number_d) */

// ---------------- 函数重载 -----------------
// (1: 一条或多条函数重载语句 2: 一条函数实现语句 )

