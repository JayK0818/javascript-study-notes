const { sum } = require('./math.js')
const { increment, value, player, changePlayer } = require('./math.js')

console.log(sum(1, 100))
// 引入的是值的拷贝
console.log('before:', value) // 1
increment()
console.log('after:', value)  // 1

console.log('player-before:', player)
changePlayer()
console.log('player-after:', player)