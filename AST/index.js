// demo
const input = 'n * n * 123'

const generateTokens = (string) => {
  let idx = 0
  const temp = []
  while (idx < string.length) {
    let char = string[idx]
    if (/[a-zA-Z]/.test(char)) {
      temp.push({
        value: char,
        start: idx
      })
    } else if (char === '*') {
      temp.push({
        value: char,
        start: idx
      })
    } else if (char === ' ') {
      if (temp.length) {
        temp[temp.length - 1].end = idx
      }
    } else if (/[0-9]/.test(char)) {
      let v = ''
      let start = idx
      while (/[0-9]/.test(char)) {
        v += char
        char = string[++idx]
      }
      temp.push({
        start,
        end: idx - 1,
        value: v
      })
    }
    idx += 1
  }

  return temp
}

console.log(generateTokens(input))