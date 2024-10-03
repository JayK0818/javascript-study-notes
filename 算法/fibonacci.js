// --------------- 斐波那契数列 ----------------
(function () {
  function fibonacci(n = 0) {
    if (n <= 0) {
      return 0
    }
    if (n === 1) {
      return 1
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  // console.log(fibonacci(40)) // 容易卡顿, 重复计算
})();

//  --------- 使用数组缓存之前的数值 ----------------
(function () {
  function fibonacci(n = 0) {
    const arr = [0, 1]
    for (let i = 2; i <= n; i++) {
      arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[n];
  }
  console.log(fibonacci(100))
})();