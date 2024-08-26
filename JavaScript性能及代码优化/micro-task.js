// --------------- 浏览器的api 执行先后顺序 ---------
(function () {
  console.log('start')
  setTimeout(() => {
    console.log('setTimeout')
  }, 0);
  queueMicrotask(() => {
    console.log('queue-microtask-before')
  })
  Promise.resolve()
  .then(() => {
    console.log('promise-then')
  })
  queueMicrotask(() => {
    console.log('queue-microtask-after')
  })
  console.log('end')
  /**
   * 1. start
   * 2. end
   * 3. promise-then
   * 4. queue-microtask-before
   * 5. setTimeout
   * 6. queue-microtask-after
  */
});

(function () {
  console.log('start')
  setTimeout(() => {
    console.log('setTimeout')
  })
  process.nextTick(() => {
    console.log('process')
  })
  console.log('end')
  /**
   * 1. start
   * 2. end
   * 3. process
   * 4. setTimeout
  */
})();

//----------------- demo ---------------
(function () {
  console.log(1)
  setTimeout(() => {
    console.log(2)
  })
  Promise.resolve()
    .then(() => {
      console.log(3)
    })
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log(4)
    })
  })
  Promise.resolve().then(() => {
    console.log(5)
  })
  setTimeout(() => {
    console.log(6)
  })
  console.log(7)
  /**
   * 
   * 1
   * 7
   * 3
   * 5
   * 2
   * 6
   * 4
  */
})();