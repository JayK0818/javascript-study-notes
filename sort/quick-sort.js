/**
 * @description 快速排序
*/
const quick_sort = (array = []) => {
  const length = array.length
  if (length <= 2) return array
  const mid_idx = Math.floor(length / 2)
  const val = array[mid_idx]
  const left = []
  const right = []
  for (let i = 0; i < length; i++) {
    if (i === mid_idx) continue
    if (val < array[i]) {
      right.push(array[i])
    } else {
      left.push(array[i])
    }
  }
  return quick_sort(left).concat(val).concat(quick_sort(right))
}

console.log(quick_sort([3, 5, 7, 2, 3, 4, 1, 10, 26, 22, 17]))
console.log(quick_sort([10, 23, 27, 19, 14, 27, 15, 30, 22, 43, 100, 200, 172]))

/**
 * @description 快速排序不占用额外空间 即空间复杂度为O(N)
*/
function get_mid_idx(array, left, right) {
  const value = array[left]
  let start = left // start为慢指针
  function swap(temp, x, y) {
    [temp[x], temp[y]] = [temp[y], temp[x]]
  }
  /**
   * 第一个元素作为基准元素, 比他大的 在右边, 比他小的 放在左边
  */
  for (let i = left + 1; i <= right; i++) {
    /** value 23
     * start   i   array
     *   0     1   [23, 2, 10, 17, 29, 15, 18, 29, 38, 45, 10, 33, 10, 22, 32, 16]  start = 1
    */
    if (array[i] < value) {
      start++
      swap(array, start, i)
    }
  }
  // 把基准值放中间
  swap(array, start, left)
  return start
}
function quickSort(array, left, right) {
  if (left >= right) return
  const idx = get_mid_idx(array, left, right)
  console.log(idx)
  quickSort(array, left, idx - 1)
  quickSort(array, idx + 1, right)
}
const temp = [23, 2, 10, 17, 29, 15, 18, 29, 38, 45, 10, 33, 10, 22, 32, 16]
quickSort(temp, 0, temp.length - 1)

console.log('temp', temp)

// https://www.jianshu.com/p/2d9e35cca807/