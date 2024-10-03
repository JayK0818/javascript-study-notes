// ----------------- 冒泡排序 ------------------
(function () {
  const bubble_sort = (list = []) => {
    const length = list.length;
    if (length <= 1) {
      return list
    }
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (list[j] >= list[j + 1]) {
          const temp = list[j]
          list[j] = list[j + 1]
          list[j + 1] = temp
        }
      }
    }
    return list
  }
  const arr = [4, 5, 2, 1, 3, 6, 10, 20, 17, 28, 29, 12]
  console.log(bubble_sort(arr))

  const list = [20, 19, 18, 17, 16, 15, 10, 9, 7, 6, 2, 1, 0]
  console.log(bubble_sort(list))
})();