import {
  BAR_STATE,
  APP_STATE,
  ANIMATION_SPEED,
  ARRAY_FLASH_SPEED,
} from "../App"

const bubbleSort = (originalArray) => {
  const animations = []
  const sortedIdx = []
  const array = JSON.parse(JSON.stringify(originalArray)) // deep clone array
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
  return { animations, sortedIdx }
}

const bubbleSortHandler = (array, setArray, setState) => {
  // change App state for disabling controls
  setState(APP_STATE.sorting)

  const { animations, sortedIdx } = bubbleSort(array) // get sorting animations
  let idx = 0 // sortedIdx pointer

  // process animations
  // even index -> comparison
  // odd index -> swap
  animations.forEach((pair, index) => {
    const currentArray = array.slice()
    if (index % 2 === 0) {
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
      // swap if different
      if (pair[0] !== pair[1]) {
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

      // if element at index is sorted
      if (index === sortedIdx[idx]) {
        idx++ // increment sortedIdx pointer

        // change state to sorted
        setTimeout(() => {
          currentArray[pair[1]].state = BAR_STATE.sorted
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
    }
  })
}

export default bubbleSortHandler
