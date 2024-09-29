const http = require('http')
const fs = require('fs')
const path = require('path')

// ----------------- max-age ---------------
const server = http.createServer(function (req, res) {
  const url = req.url === '/' ? 'index.html' : req.url
  res.setHeader('Cache-Control', 'max-age=40')
  // max-age 后面的值代表的是秒
  /**
   * 在此之间内, 使用缓存数据
   * TODO: private/public max-age=10  测试时都无法缓存...
  */
  fs.readFile(path.join(__dirname, url), (err, data) => {
    res.end(data)
  })
})


const tag = 'abceefg123'
// ---------------- Etag ------------------
/**
 * ETag   If-None-Match
*/
const etag_server = http.createServer(function (req, res) {
  const url = req.url === '/' ? 'index.html' : req.url
  const request_tag = req.headers['if-none-match']
  if (tag === request_tag) {
    res.writeHead(304, 'Not Modified')
    res.end()
    return
  }
  res.setHeader('ETag', tag)
  fs.readFile(path.join(__dirname, url), (err, data) => {
    res.end(data)
  })
})

// ---------- Last-Modified 和 If-Modified-Since ------------
const last_modified_server = http.createServer(function (req, res) {
  const url = req.url === '/' ? 'index.html' : req.url
  res.setHeader('Last-Modified', new Date().toUTCString())
  fs.readFile(path.join(__dirname, url), (err, data) => {
    res.end(data)
  })
})

last_modified_server.listen(3000, () => {
  console.log('app start...')
})