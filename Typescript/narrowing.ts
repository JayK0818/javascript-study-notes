/*
如果padding是数字, 则添加相应数量的空格, 如果是字符串, 则直接加载对应字符的前面
*/
// -------- type guard --------
function padLeft(padding: number | string, input: string): string {
  if(typeof padding === 'number') {
    return ' '.repeat(padding) + input
  }
  return padding + input
}
console.log(padLeft(3, 'hello'))      //    hello
console.log(padLeft('123', 'hello'))  // 123hello


function printAll(strings: string | string[] | null) {
  if(typeof strings === 'object' && strings) {
    for(const string of strings) {
      console.log(string)
    }
  } else if (typeof strings === 'string') {
    console.log(strings)
  }
}
printAll('1234')  // 1234
printAll(['1', '2', '3', '4'])  // 1 2 3 4


function multiplyApp(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if(!values) return values
  return values.map(x => x * factor)
}
console.log(multiplyApp([1, 2, 3, 4], 2))   // [ 2, 4, 6, 8 ]
console.log(multiplyApp([2, 3, 4], 1))      // [ 2, 3, 4 ]
console.log(multiplyApp(undefined, 2))      // undefined


// ------- equality narrowing -------
function example(x: string | number, y: string | boolean) {
  if(x === y) {
    x.toUpperCase()
    y.toUpperCase()
  } else {
    console.log(x, y)
  }
}

interface ContainerBox {
  value: number | null | undefined
}
function getContainerInfo(container: ContainerBox) {
  if(container.value == null) return null
  return container.value
}
console.log(getContainerInfo({value: 123}))
console.log(getContainerInfo({value: undefined}))
console.log(getContainerInfo({value: null}))


// ------------ in operator -----------
type Fish = {swim: () => void}
type Monkey = {skill: () => void}

function move(animal: Fish | Monkey) {
  if( 'skill' in animal) {
    return animal.skill()
  }
  return animal.swim()
}

// --------- instanceof narrowing ----------
function logValue(x: Date | string) {
  if(x instanceof Date) {
    console.log(x.toLocaleDateString())
  } else {
    console.log(new Date(x))
  }
}
logValue(new Date())    // 2022/5/19
logValue('2022-05-19')  // 2022-05-19T00:00:00.000Z


// ---------- Discriminated unions ---------
interface Shape {
  kind: 'circle' | 'square',
  radius?: number;
  sideLength?: number;
}
function getArea(shape: Shape): number {
  if(shape.kind === 'circle') {
    return Math.PI * shape.radius! ** 2
  }
  return shape.sideLength! ** 2
}

interface CircleShape {
  kind: 'circle';
  radius: number
}
interface SquareShape {
  kind: 'square';
  sideLength: number;
}
type AreaShape = CircleShape | SquareShape
function getShapeArea(shape: AreaShape): number {
  if(shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
  return shape.sideLength ** 2
}

/*
When narrowing, you can reduce the options of a union to a point where you have removed all possibilities
and have nothing left. In those cases, TypeScript will use a never type to represent a state which should not
exist.
*/
/*
The never type is assignable to every type; however, no type is assignable to never(except never itself)
*/

/*
缩小变量类型
typeof / in / instance == ===
*/
/*
对象包含 allowInput 才允许输出
对象字段是字符串且有空格时, 去除空格 输出
对象字段是方法 直接输出
*/
const player = {
  name: 'k y   r i e',
  skill() {
    console.log('crossover')
  },
  age: 30,
  allowInput: true
}
function check_object(obj: any) {
  if('allowInput' in player) {
    Object.keys(obj).forEach(k => {
      if(typeof obj[k] === 'string') {
        console.log(obj[k].replace(/\s+/g,''))  // kyrie
      }else if(typeof obj[k] === 'function') {
        obj[k]()  // crossover
      }else{
        console.log('key', k, 'value', obj[k])  // key-age, value-30
      }
    })
  }
}
check_object(player)


class ClassA {
  public getLength() {
    return 123
  }
}
class ClassB {
  public getLength() {
    return 456
  }
  public getName() {
    console.log('classB')
    return 'classB'
  }
}
function get_length(instance: ClassA | ClassB) {
  if(instance instanceof ClassB) {
    instance.getName()
  }
  return instance.getLength()
}
console.log('class-b:', get_length(new ClassB()))

// ----- 多态 -------
/*
1. 必须有方法重写
2. 必须存在继承关系
*/
interface PeopleProps {
  eat:() => void
}
class People implements PeopleProps{
  eat() {
    console.log('people eat')
  }
}
class Student extends People {
  study() {
    console.log('study')
  }
  eat() {
    console.log('student eat')
  }
}
class Stuff extends People {
  work() {
    console.log('work')
  }
  eat() {
    console.log('stuff work')
  }
}

function console_eat(p: People) {
  p.eat()
  // 缺点: 无法直接调用子类独有方法
  if(p instanceof Stuff) {
    p.work()
  }else if(p instanceof Student) {
    p.study()
  }
}
console_eat(new Student())
console_eat(new Stuff())



// ------- 自定义守卫 --------
function is_string(str: any) : str is string {
  return typeof str === 'string'
}

function is_function(fn: any): fn is Function {
  return typeof fn === 'function'
}

interface SingerProps {
  firstName: string
  lastName: string
  age: number,
  sing?: () => void
}
const singer: SingerProps = {
  firstName: 'jay',
  lastName: 'chou',
  age: 30
}
type SingerKeyType = keyof SingerProps
Object.keys(singer).forEach((key) => {
  const value = singer[key as SingerKeyType]
  if(is_string(value)) {
    //...
  }else if(is_function(value)) {
    value()
  } else {
    // ... number
  }
})


export {

}
