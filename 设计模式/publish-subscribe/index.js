// 发布订阅模式
(function () {
  function PublishSubscribeManager() {
    this.events = {}
  }
  PublishSubscribeManager.prototype.subscribe = function (eventType, handler) {
    this.events[eventType] = this.events[eventType] ?? []
    if (typeof handler === 'function') {
      this.events[eventType].push(handler)
    }
  }
  PublishSubscribeManager.prototype.publish = function (eventType, ...args) {
    if (!this.events[eventType]) {
      return
    }
    const subscribes = this.events[eventType]
    subscribes.forEach(subscribe => {
      subscribe(...args)
    })
  }

  const publishSubscribe = new PublishSubscribeManager()
  publishSubscribe.subscribe('click', () => {
    console.log('without params')
  })
  publishSubscribe.subscribe('click', (args) => {
    console.log('args', args)
  })

  publishSubscribe.publish('click')
  publishSubscribe.publish('click', 'hello world')
})();