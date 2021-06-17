const bubbleSort = (originalArray) => {
  const animations = []
  const sortedIdx = []
  const array = originalArray.slice()
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1])
      if (array[j].value > array[j + 1].value) {
        animations.push([j, j + 1])
        const swap = array[j]
        array[j] = array[j + 1]
        array[j + 1] = swap
      } else {
        animations.push([j + 1, j + 1])
      }
    }
    sortedIdx.push(animations.length - 1)
  }
  return { sortedIdx, animations }
}

export default bubbleSort
