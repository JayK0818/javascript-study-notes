/**
 * @description 归并排序, 将数组分为两部分, 递归排序,然后合并两个部分
 * N(log(N))
*/
function merge(left = [], right = []) {
  const arr = []
  while (left.length && right.length) {
    // 从数组末尾开始比较, 从大到小排序
    if (left[0] < right[0]) {
      arr.push(left.shift())
    } else {
      arr.push(right.shift())
    }
  }
  return [...arr, ...left, ...right]
}

function merge_reverse(left = [], right = []) {
  const arr = []
  while (left.length && right.length) {
    if (left[left.length - 1] > right[right.length - 1]) {
      arr.unshift(left.pop())
    } else {
      arr.unshift(right.pop())
    }
  }
  return [...arr, ...left, ...right]
}

function mergeSort(arr) {
  if (arr.length < 2) return arr
  const mid_idx = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid_idx)
  const right = arr.slice(mid_idx)
  return merge(mergeSort(left), mergeSort(right))
}

console.time('hello')
// console.log(mergeSort([1, 20, 19, 27, 14, 15, 26, 33, 27, 10, 23, 38, 99, 88, 77, 55, 33, 22, 10, 36]))
console.log(mergeSort(new Array(10000).fill(1).map(() => Math.floor(Math.random() * 100))))
console.timeEnd('hello')