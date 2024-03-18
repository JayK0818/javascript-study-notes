const fs = require('fs')

function readFile(url) {
  return new Promise(resolve => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if(err) resolve('')
      resolve(data)
    })
  })
}

function* generatorReadFile() {
  const f1 = yield readFile('./function.js')
  const f2 = yield readFile('./for-of.js')
  console.log(f1)
  console.log(f2)
}

const fileNext = generatorReadFile()
console.log(fileNext.next())
console.log(fileNext.next())
console.log(fileNext.next())

// -------------- 使用async -------------
async function readFileList() {
  const f1 = await readFile('./function.js')
  const f2 = await readFile('./for-of.js')
  console.log(f1, f2)
}
readFileList()