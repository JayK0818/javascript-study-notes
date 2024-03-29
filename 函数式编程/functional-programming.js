// map
function my_map(f,array) {
  const result = []
  for(let i = 0; i != array.length; i++){
    result[i] = f(array[i])
  }
  return result;
}

let arr = [1,2,3,4,5,6,7,8,9,10]

const r1 = my_map(function(x){
  return x > 5
},arr)

const r2 = my_map(function(x){
  return x * 2
},arr);

console.log('r1:',r1)
console.log('r2:',r2)

// forEach方法
function myForeach(array,fn) {
  for(let i = 0, length = array.length; i < length; i++){
    fn(array[i])
  }
}

myForeach(arr,function(item) {
  console.log(item)
})


// filter
function filter(array,fn) {
  const result = []
  for(let i = 0, length = array.length; i < length; i++ ){
    if(fn(array[i])){
      result.push(array[i])
    }
  }
  return result
}
const r3 = filter(arr, function(item) {
  return item % 2 === 0
})
console.log('r3:',r3)


function map(f,a) {
  let result = [];
  let i;
  for(i = 0; i != a.length; i++){
    result[i] = f(a[i]);
  }
  return result;
}
const f = function(x){
  return x * x * x;
}
let numbers = [0,1,2,5,10];
let cube = map(f,numbers);
console.log('cube:',cube);

// function scope
// The following variables are defined in the global scope
let num1 = 20,
    num2 = 3,
    name = 'kyrie';
// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}
console.log(multiply()) //return 60

// A nested function example
function getScope(){
  var num1 = 2,
      num2 = 3;
  function add(){
    return name + 'scoped' + (num1 + num2);
  }
  return add()
}
console.log(getScope()); // kyrie scoped 5;


// 函数作为返回值
function once(fn){
  let done = false
  return function() {
    if(!done) {
      done = true 
      console.log('arguments:',arguments)
      return fn.apply(null,arguments)
    }
  }
}

let pay = once(function(money) {
  console.log('支付了'+ money + '元');
})
pay(5)
pay(10)
pay(5)

// ------------------------------ 打印日志 ---------------------------------
const LEVEL = {
  INFO:1,
  WARN:2,
  ERROR:3
}
const log = (level) => {
  return (message) => {
    let prefix = ''
    switch (level) {
      case 1:
        prefix = 'info:'
        break
      case 2:
        prefix = 'warn:'
        break
      case 3:
        prefix = 'error:'
        break
    }
    return `${prefix} ${message}`
  }
}
const log_warning_message = log(LEVEL['WARN'])
const log_error_message = log(LEVEL['ERROR'])

console.log(log_warning_message('something warning!'))  // warn:something warning!
console.log(log_warning_message('something wrong again!'))  // warn:something wrong again!
console.log(log_error_message('something error!'))  // error:something error!


const schedule = [
  { number: 1, stop: '深圳', arrival: null, departure: {hour: 14, minute: 48} },
  { number: 2, stop: '惠州', arrival: {hour: 16, minute: 8}, departure: { hour: 16, minute: 14 } },
  { number: 3, stop: '赣州', arrival: {hour: 20, minute: 29}, departure: { hour: 20, minute: 32} },
  { number: 4, stop: '吉安', arrival: {hour: 22, minute: 23}, departure: { hour: 22, minute: 26 } },
  { number: 5, stop: '南昌', arrival: {hour: 0, minute: 40 }, departure: { hour: 1, minute: 3} },
  { number: 6, stop: '阜阳', arrival: {hour: 5, minute: 58}, departure: { hour: 6, minute: 5 }},
  { number: 7, stop: '北京西', arrival: {hour: 13, minute: 17}, departure: null }
]
const getAttr = (attr) => (obj) => obj[attr]
const getStop = getAttr('stop')
const getDeparture = getAttr('departure')

console.log(schedule.map(getStop), schedule.map(getDeparture))
// 相当于  schedule.map(item => item.stop) 、schedule.map(item => item.departure
/**
 * [ '深圳', '惠州', '赣州', '吉安', '南昌' ]
 * [ { hour: 14, minute: 48 }, { hour: 16, minute: 8 }, { hour: 20, minute: 29 },
    { hour: 22, minute: 23 }, { hour: 0, minute: 40 } ]
*/

const both = (con1, con2) => (...args) => !con1(...args) && !con2(...args)
const either = (con1, con2) => (...args) => con1(...args) || con2(...args)

const isOriginStop = (stop) => stop.arrival === null
const isTerminalStop = (stop) => stop.departure === null

const isOriginalOrTerminal = either(isOriginStop, isTerminalStop)
const isBothMiddleStop = both(isOriginStop, isTerminalStop)

console.log('起点或终点:', schedule.filter(isOriginalOrTerminal))
/**
 * [ { number: 1, stop: '深圳', arrival: null, departure: { hour: 14, minute: 48 } },
     { number: 7, stop: '北京西', arrival: { hour: 13, minute: 17 }, departure: null }]
*/
console.log('起点:', schedule.filter(isOriginStop)) //  [ { number: 1, stop: '深圳', arrival: null, departure: { hour: 14, minute: 48 } } ]
console.log('终点:', schedule.filter(isTerminalStop)) // [ { number: 7, stop: '北京西', arrival: { hour: 13, minute: 17 }, departure: null } ]
console.log('中间停靠点:', schedule.filter(isBothMiddleStop))

// ----------------------- 判断数据类型 ---------------------------
const createType = (type) => {
  return (data) => {
    return Object.prototype.toString.call(data) === `[object ${type}]`
  }
}

const isString = createType('String')
const isNumber = createType('Number')

console.log(isString('hello'), isString(123), isString(false))  // true false false
console.log(isNumber(123), isNumber('123'), isNumber(true)) // true false false

// ------------------------------- 改变函数参数 -----------------------------------------
// 接受一个函数作为参数, 再返回一个调整和改变了该函数行为的新函数。(装饰器模式)
const vals = [1, 2, 10, 21]
console.info(vals.map(Number.parseInt)) // [1, NaN, 2, 7]

// -------------- 创建一个简化版本 -----------------------
const unCurry = (fn) => {
  return function (arg) {
    return fn(arg)
  }
}
const myParseInt = unCurry(Number.parseInt)
console.info(vals.map(myParseInt))  // [ 1, 2, 10, 21 ]

const nested_array = [[1, 2], [3, 4, 5], [6]]
// 下标, 当前数组项 数组本身全部传递给了concat 方法
console.info(nested_array.reduce(Array.prototype.concat.bind([]), []))
// 相当于
console.log(nested_array.reduce((prev, next, index, array) => {
  return prev.concat(next, index, array)
}, []))
/**
 * [
      1,           2,
      0,           [ 1, 2 ],
      [ 3, 4, 5 ], [ 6 ],
      3,           4,
      5,           1,
      [ 1, 2 ],    [ 3, 4, 5 ],
      [ 6 ],       6,
      2,           [ 1, 2 ],
      [ 3, 4, 5 ], [ 6 ]
    ]
 * 
*/
const concat_flat = (fn) => (a, b) => fn(a, b)
console.log(nested_array.reduce(concat_flat(Array.prototype.concat.bind([])), [])) // [1, 2, 3, 4, 5, 6]


// ---------------------------- 检验参数 --------------------------------
const checkTypes = (fn, ...types) => {
  return (...args) => {
    const received = args.map(arg => Object.prototype.toString.call(arg).slice(8, -1).toLowerCase())
    if (!received.every(t => types.includes(t))) {
      throw new Error(`Expected argument for ${types.join(', ')}, But got ${received.join(', ')}`)
    }
    return fn(...args)
  }
}

const sum = (a, b) => a + b
const add = (a, b) => a + b

const checkSumType = checkTypes(sum, 'number', 'number')
console.log(checkSumType(1, 5)) // 6
console.log(checkSumType(2, 5)) // 7

const checkAddType = checkTypes(add, 'string', 'string')
console.log(checkAddType('5', '12'))


// ----------------------------- 缓存 -----------------------------------
const memorized_fn = (fn) => {
  const cache = Object.create(null)
  return (...args) => {
    const key = JSON.stringify(args)
    if (!cache[key]) {
      const result = fn(...args)
      cache[key] = result
    }
    return cache[key]
  }
}
const get_sum = (n) => {
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += i
  }
  return sum
}

const memorized_sum = memorized_fn(get_sum)
console.time('time1')  // 1s
console.info(memorized_sum(1000000000)) // 1.218s
console.timeEnd('time1')

console.time('time2')  
console.info(memorized_sum(1000000000)) // 0.257ms
console.timeEnd('time2')

// -------------------- 函数科里化 ------------------------------
const curryClassic = (fn) => {
  return function _curry(...args) {
    if (args.length < fn.length) {
      return function() {
        // 收集参数
        const newArgs = [...args, ...arguments]
        return _curry(...newArgs)
      }
    }
    return fn(...args)
  }
}
const four_number_sum = (a, b, c, d) => a + b + c + d

const curry_four_number_sum = curryClassic(four_number_sum)

console.log(curry_four_number_sum(1)(2)(3)(4))  // 10
console.log(curry_four_number_sum(1, 2, 3)(4))  // 10
console.log(curry_four_number_sum(1, 2)(3, 4))  // 10
console.log(curry_four_number_sum(1, 2, 3, 4))  // 10

// ---------------- 另一个demo -------------------------
const get_object_property = (property, object) => object[property]

const get_name = curryClassic(get_object_property)('name')
const get_age = curryClassic(get_object_property)('age')

const player_1 = { name: 'lebron', age: 38 }
const player_2 = { name: 'kyrie', age: 32 }
const player_3 = { name: 'durant', age: 35 }

console.log(get_name(player_1), get_name(player_2), get_name(player_3))
// 'lebron' / 'kyrie' / 'durant'
console.log(get_age(player_1), get_age(player_2), get_age(player_3)) 
// 38  32  35


// ------------------- 从右向左科里化 --------------------------------
const curryRight = (fn) => {
  return function _curry(...args) {
    if (args.length < fn.length) {
      return function () {
        // 传入参数过多, 对参数进行截取
        const newArgs = [...args, ...arguments].reverse()
        if (newArgs.length > fn.length) {
          return _curry(...newArgs.slice(fn.length))
        }
        return _curry(...newArgs)
      }
    }
    console.log(args)
    return fn(...args)
  }
}

const curryParseInt = curryRight(Number.parseInt)
const curryParseInt10 = curryParseInt(10)
const curryParseInt16 = curryParseInt(16)

console.log(curryParseInt10(2), curryParseInt10(100), curryParseInt10(215))
console.log(curryParseInt16('0xf0'), curryParseInt16('0xff'), curryParseInt16('0xffaaa'))
// 240 255 1047210

