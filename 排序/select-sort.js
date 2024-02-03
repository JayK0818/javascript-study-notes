/**
 * @description 选择排序
 * 遍历数组, 每次在当前的index上,找到剩余数组中最小值的索引。然后进行 值交换
*/
const select_sort = (array = []) => {
/*   const swap = (array, i, j) => {
    const v1 = array[j]
    array[j] = array[i]
    array[i] = v1
  } */
  const swap = (array, i, j) => {
    [array[i], array[j]] = [array[j], array[i]]
  }
  const length = array.length
  if (length <= 1) return array
  for (let i = 0; i < length; i++) {
    let min_idx = i
    for (let j = i + 1; j < length; j++) {
      if (array[j] < array[min_idx]) {
        min_idx = j
      }
    }
    swap(array, i, min_idx)
  }
  return array
}
console.log(select_sort([1, 10, 4, 2, 5, 7]))
console.log(select_sort([1, 10, 4, 2, 3, 100, 43, 34, 10, 8, 22, 5, 7]))
console.log(select_sort([1, 2, 3, 4, 2, 2, 4, 5]))

console.time('hello')
// console.log(mergeSort([1, 20, 19, 27, 14, 15, 26, 33, 27, 10, 23, 38, 99, 88, 77, 55, 33, 22, 10, 36]))
console.log(select_sort(new Array(10000).fill(1).map(() => Math.floor(Math.random() * 100))))
console.timeEnd('hello') // 98ms
/**
 * (n-1) + (n-2) + n(n-3) + ... + 0
*/

console.time('hello')
console.log(select_sort(new Array(10000).fill(1).map(() => Math.floor(Math.random() * 100))))
console.timeEnd('hello') // 50ms