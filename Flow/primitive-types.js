// @flow
/*
Booleans
Strings
Numbers
null
undefined
Symbols
*/

function method(x:number, y:string, z:boolean){
  console.log(x,y,z)
}
method(3.14, 'hello', true)
method(3.15,'123',false)

//-------------------------------------- boolean check
function acceptBoolean(value:boolean){
  console.log(value)
}
acceptBoolean(false)
// acceptBoolean('false')
acceptBoolean(1 === 1)  // 隐式类型转换
acceptBoolean(!!'')

//--------------------------------------  number check
function acceptNumber(value:number){
  console.log(value)
}
const value = Math.PI
acceptNumber(1)
acceptNumber(3.14)
acceptNumber(NaN)
acceptNumber(Infinity)
acceptNumber(value)

// -------------------------------------- string check
function acceptsString(value: string){
  console.log(value)
}
// 隐士类型转换的时候 只允许字符串和数字  或者字符串和字符串的拼接
acceptsString('foo')
acceptsString('foo' + 123)
acceptsString('foo' + 'foo')
// acceptsString('foo' + {})
// acceptsString('foo' + [])

console.log([].toString())  // ''
console.log({}.toString())  // [object Object]


//-------------------------------------- null and void
function acceptsNull(value:null) {
}

acceptsNull(null)
// acceptsNull(undefined)

function acceptUndefined(value:void){
}
acceptUndefined(undefined)
// acceptUndefined(undefined)

// --------------Maybe Types ?number ?string
function acceptMaybeString(value: ?string){
}
acceptMaybeString()
acceptMaybeString('bar')
acceptMaybeString(undefined)
acceptMaybeString(null)

// ----------------Optional object properties
function acceptObject(value:{foo?: string}){

}
acceptObject({foo:'string'})
// acceptObject({foo:123})
acceptObject({foo:undefined})
// acceptObject({foo:null})

// ------------------------ Optional function parameters
function baz(value?: string){
}
baz('bar')
baz(undefined)
// method(null)
baz()

//------------------------ function parameters with defaults
function bar(value: string = 'default'){
}
bar()
bar('123')
// bar(null)

// ------------------------ symbol
function acceptSymbol(value:symbol){
}
acceptSymbol(Symbol('hello'))


// ----------------
/*
flow-remove-types 移除注释
vscode 插件 Flow-language-support 检测flow插件
*/