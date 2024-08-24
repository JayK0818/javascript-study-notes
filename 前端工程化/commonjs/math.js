const sum = (a, b) => a + b

let value = 1

function increment() {
  value += 1
  console.log('我被执行了几次?:', value)
}

const player = {
  firstName: 'kyrie'
}
function changePlayer() {
  player.firstName = 'kevin'
}

module.exports = {
  sum,
  increment,
  value,
  player,
  changePlayer
}