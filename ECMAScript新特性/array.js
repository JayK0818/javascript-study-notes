function sum(...args){
  console.log('args:',args) // [1,2,3,4,5]
  return args.reduce((prev,next) => prev + next, 0)
}
console.log(sum(1,2,3,4,5)) // 15

// -------------------- 扩展运算符 -----------------
console.log(...[1,2,3]) // 1, 2, 3
console.log(1,...[2,3,4],5) // 1, 2, 3, 4, 5


console.log(Math.max(...[1,2,3,4,5])) // 5
console.log(Math.max.apply(null,[1,2,3,4,5])) // 5

let arr1 = [1,2,3]
let arr2 = [4,5,6]
Array.prototype.push.apply(arr1,arr2)
console.log(arr1) // [1,2,3,4,5,6]

arr1.push(...arr2)
console.log(arr1)

// ------------- 扩展运算符赋值数组, 浅拷贝 --------------------
let a1 = [{foo:1}]
let a2 = [{bar:2}]

let a3 = [...a1,...a2]
let a4 = a1.concat(a2)

console.log(a3,a4)
a3[0].foo = 'foo'
console.log(a3,a4,a1,a2)

// ---------- 字符串转化为真正的数组
console.log([...'hello world'])


// ---------------------- 实现了Iterator接口的对象 ---------------
let arrayLike = {
  0:'a',
  1:'b',
  2:'c',
  length: 3
}
console.log(Array.from(arrayLike))  // [a, b, c]
console.log( [].slice.call(arrayLike) ) // [a, b, c]

const go = function*(){
  yield 1
  yield 2
  yield 3
}
console.log([...go()])  // [1, 2, 3]

// -------------------
const s1 = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
console.log(Array.from(s1))
let filter_array = Array.from(s1).filter(item => {
  console.log('item:', item)  // a b c
})

console.log( Array.from({length:3}) ) // [undefined, undefined, undefined]

// console.log([...s1])

let array = Array.from({length:10},() => Math.random())
console.log('array:',array)


let player = ['kyrie', 'james', 'durant', 'wade']

console.log(player.entries())
console.log(player.keys())
console.log(player.values())
/*
Object [Array Iterator] {}
Object [Array Iterator] {}
Object [Array Iterator] {}
*/

for(let [index,value] of player.entries()){
  console.log('key:',index,value)
  /*
  key: 0 kyrie
  key: 1 james
  key: 2 durant
  key: 3 wade
  */
}
for(let v of player.values()){
  console.log(v)
  /*
  kyrie
  james
  durant
  wade
  */
}
for(let k of player.keys()){
  console.log(k)
  /*
  0
  1
  2
  3
  */
}

// ----------- 所谓类数组对象, 必须要有一个length属性 --------
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();


const kyrie = {
  0:'kyrie',
  1:'irving',
  2:30,
  length: 3
}
console.log(Array.from(kyrie))  // [ 'kyrie', 'irving', 30 ]
console.log(toArray(kyrie))     // [ 'kyrie', 'irving', 30 ]


// -------------- find --------------
const n = [1,2,3,4,5].find((num, i) => {
  return num > 2
})
console.log('n', n) // 3


// ---------- find的第二个参数 -----------
function f(v) {
  return v > this.age
}
const person = {name:'jack', age:30}

const findValue = [10,12,30,27,18,37].find(f, person)
console.log( 'findValue:', findValue) // 37



// ---------------- flat() 拉平数组 ----------------
console.log([1,2,3,4,[4,6]].flat()) // [ 1, 2, 3, 4, 4, 6 ]
console.log([1,2,[3,4],[[5,6]]].flat()) // [ 1, 2, 3, 4, [ 5, 6 ] ]

console.log([1,2,[3,4],[[5,6]]].flat(2)) // [ 1, 2, 3, 4, 5, 6 ]
console.log([1,2,[3,4,[4,5,[7,8,[9,10]]]]].flat(Infinity))
/*
[
  1, 2, 3, 4,  4,
  5, 7, 8, 9, 10
]
*/

function flatArray(array, d = 1){
  if(d <= 0) {
    return array.slice();
  }else{
    return array.reduce((prev,next) => {
      if(Array.isArray(next)) {
        prev = prev.concat(flatArray(next, d-1))
      }else{
        if(next){
          prev = prev.concat(next)
        }
      }
      return prev;
    }, [])
  }
}

function flat(array, d = 1){
  const temp = [...array]
  if(d <= 0) {
    return temp;
  }else{
    const t = []
    for(let item of temp) {
      if(Array.isArray(item)){
        t.push(...flat(item, d-1))
      }else{
        if(item){
          t.push(item)
        }
      }
    }
    return t;
  }
}

const flat_array = [1,[2,3],[4,5, undefined, ,[6,7, [8,9,[10]]]]]

console.log(flat(flat_array, Infinity))
/*
[
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]
*/
console.log(flatArray(flat_array, Infinity))
/*
[
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]
*/
