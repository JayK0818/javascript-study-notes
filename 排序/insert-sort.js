/**
 * @description 插入排序, 每个数依次往前对比, 比前面的数字小， 则移动到前面
*/
const insert_sort = (array = []) => {
  const length = array.length
  if (length < 2) return array
  const swap = (array, i, j) => {
    [array[i], array[j]] = [array[j], array[i]]
  }
  for (let i = 0; i < length; i++) {
    for (let j = i; j > 0; j--) {
      // 如果左边的值的顺序 小于右侧的, 则两个值 交换位置
      if (array[j] < array[j-1]) {
        swap(array, j, j - 1)
      }
    }
  }
  return array
}

console.log(insert_sort([3, 6, 4, 2, 1, 5]))
console.log(insert_sort([3, 4, 3, 2, 6, 7, 4, 6, 9, 10, 33, 21, 20]))
console.log(insert_sort([20, 19, 18, 17, 16, 15, 14, 10, 9, 8, 7 , 6, 5, 4, 3, 2, 1]))

console.time('hello')
// console.log(mergeSort([1, 20, 19, 27, 14, 15, 26, 33, 27, 10, 23, 38, 99, 88, 77, 55, 33, 22, 10, 36]))
console.log(insert_sort(new Array(10000).fill(1).map(() => Math.floor(Math.random() * 100))))
console.timeEnd('hello') // 98ms
/**
 * @description 倒序排列
*/
const insert_sort_reverse = (array = []) => {
  const length = array.length
  if (length < 2) return array
  const swap = (array, i, j) => {
    [array[i], array[j]] = [array[j], array[i]]
  }
  for (let i = 0; i < length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j - 1] < array[j]) {
        swap(array, j-1, j)
      }
    }
  }
  return array
}
console.log(insert_sort_reverse([3, 6, 4, 2, 1, 5]))
console.log(insert_sort_reverse([3, 4, 3, 2, 6, 7, 4, 6, 9, 10, 33, 21, 20]))