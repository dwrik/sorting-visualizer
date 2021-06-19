import {
  BAR_STATE,
  APP_STATE,
  ANIMATION_SPEED,
  ARRAY_FLASH_SPEED,
} from "../App"

const selectionSort = (originalArray) => {
  const animations = []
  const sortedIdx = []
  const array = originalArray.slice()
  for (let i = 0; i < array.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < array.length; j++) {
      animations.push([min, j])
      min = array[j].value < array[min].value ? j : min
    }
    animations.push([i, min, 1])
    sortedIdx.push(animations.length - 1)
    const swap = array[i]
    array[i] = array[min]
    array[min] = swap
  }
  return { animations, sortedIdx }
}

const selectionSortHandler = (array, setArray, setState) => {
  // change App state for disabling controls
  setState(APP_STATE.sorting)

  const { animations, sortedIdx } = selectionSort(array) // get sorting animations
  let idx = 0 // sortedIdx pointer

  // process animations
  // pair -> comparison
  // triplet -> swap
  animations.forEach((pair, index) => {
    const currentArray = array.slice()
    // check if triplet
    if (pair[2] === undefined) {
      // change state
      setTimeout(() => {
        currentArray[pair[0]].state = BAR_STATE.compared
        currentArray[pair[1]].state = BAR_STATE.compared
        setArray(currentArray)
      }, index * ANIMATION_SPEED)

      // revert state
      setTimeout(() => {
        currentArray[pair[0]].state = BAR_STATE.normal
        currentArray[pair[1]].state = BAR_STATE.normal
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    } else {
      // change state
      setTimeout(() => {
        currentArray[pair[0]].state = BAR_STATE.swapped
        currentArray[pair[1]].state = BAR_STATE.swapped
        setArray(currentArray)
      }, index * ANIMATION_SPEED)

      // change value
      setTimeout(() => {
        const swap = currentArray[pair[0]].value
        currentArray[pair[0]].value = currentArray[pair[1]].value
        currentArray[pair[1]].value = swap
        setArray(currentArray)
      }, index * ANIMATION_SPEED)

      // revert state
      setTimeout(() => {
        currentArray[pair[0]].state = BAR_STATE.normal
        currentArray[pair[1]].state = BAR_STATE.normal
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    }

    if (index === sortedIdx[idx]) {
      idx++ // increment sortedIdx pointer

      // change state to sorted
      setTimeout(() => {
        currentArray[pair[0]].state = BAR_STATE.sorted
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    }

    // flash array to indicate sorting finished
    if (index === animations.length - 1) {
      // change state to sorted
      setTimeout(() => {
        const sortedArray = array.map((bar) => {
          return { state: BAR_STATE.finished, value: bar.value }
        })
        setArray(sortedArray)

        // change state to finished
        setTimeout(() => {
          const finishedArray = array.map((bar) => {
            return { state: BAR_STATE.sorted, value: bar.value }
          })
          setArray(finishedArray)

          // reset App state for enabling controls
          setState(APP_STATE.default)
        }, ARRAY_FLASH_SPEED)
      }, index * ANIMATION_SPEED)
    }
  })
}

export default selectionSortHandler
