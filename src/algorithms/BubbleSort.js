const bubbleSort = (originalArray) => {
  const comparisons = []
  const sortedIdx = []
  const array = originalArray.slice()
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      comparisons.push([j, j + 1])
      if (array[j].value > array[j + 1].value) {
        comparisons.push([j, j + 1])
        const swap = array[j]
        array[j] = array[j + 1]
        array[j + 1] = swap
      } else {
        comparisons.push([j + 1, j + 1])
      }
    }
    sortedIdx.push(comparisons.length - 1)
  }
  return { sortedIdx, comparisons }
}

export default bubbleSort
