class Performance {
  constructor() {
    this.timing = window.performance.timing
  }
  // 重定向耗时
  getRedirectTiming () {
    return this.timing.redirectEnd - this.timing.redirectStart
  }
  // dns解析耗时
  getDnsTiming() {
    return this.timing.domainLookupEnd - this.timing.domainLookupStart
  }
  // tcp连接耗时
  getTcpTiming () {
    return this.timing.connectEnd - this.timing.connectStart
  }
  // 读取页面第一个字节耗时
  getTimeOfFirstByte() {
    return this.timing.responseStart - this.timing.navigationStart
  }
  // response请求耗时
  getRequestTiming() {
    return this.timing.responseEnd - this.timing.responseStart
  }
  // dom节点耗时 (不包含js/css等外部资源耗时)
  getParseDomTiming() {
    return this.timing.domInteractive - this.timing.domLoading
  }
  // 页面资源耗时
  getDomContentLoadTime() {
    return this.timing.domComplete - this.timing.domInteractive
  }
  // 页面load总耗时
  getLoadTime() {
    return this.timing.loadEventStart - this.timing.loadEventEnd
  }
}

/**
 * @description 上报性能指标
*/
class BaseTrack {
  constructor() {
    this.url = 'http://xxx.com'
    this.image = null
  }
  reportByImage(qs, retryTimes = 3) {
    const retry = () => {
      this.image = null
      if (retryTimes) {
        this.reportByImage(qs, retryTimes - 1)
      }
    }
    return new Promise(resolve => {
      try {
        this.image = new Image()
        this.image.onerror = function () {
          retry()
        }
        this.image.src = this.url
      } catch (err) {

      }
    })
  }
}