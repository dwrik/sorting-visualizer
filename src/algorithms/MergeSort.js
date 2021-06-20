import {
  BAR_STATE,
  APP_STATE,
  ANIMATION_SPEED,
  ARRAY_FLASH_SPEED,
} from "../App"

const merge = (
  originalArray,
  auxiliaryArray,
  start,
  end,
  mid,
  animations,
  sortedIdx
) => {
  let k = start
  let i = start
  let j = mid + 1
  while (i <= mid && j <= end) {
    animations.push([i, j, 1])
    if (auxiliaryArray[i].value < auxiliaryArray[j].value) {
      animations.push([k, auxiliaryArray[i].value])
      originalArray[k++] = auxiliaryArray[i++]
    } else {
      animations.push([k, auxiliaryArray[j].value])
      originalArray[k++] = auxiliaryArray[j++]
    }
  }
  while (i <= mid) {
    animations.push([k, auxiliaryArray[i].value])
    originalArray[k++] = auxiliaryArray[i++]
  }
  while (j <= end) {
    animations.push([k, auxiliaryArray[j].value])
    originalArray[k++] = auxiliaryArray[j++]
  }
}

const mergeSort = (
  originalArray,
  auxiliaryArray,
  start,
  end,
  animations,
  sortedIdx
) => {
  if (start === end) return
  const mid = Math.floor((start + end) / 2)
  mergeSort(auxiliaryArray, originalArray, start, mid, animations, sortedIdx)
  mergeSort(auxiliaryArray, originalArray, mid + 1, end, animations, sortedIdx)
  merge(originalArray, auxiliaryArray, start, end, mid, animations, sortedIdx)
}

const mergeSortHandler = (array, setArray, setState) => {
  // change App state for disabling controls
  setState(APP_STATE.sorting)

  let idx = 0 // sortedIdx pointer
  const animations = []
  const sortedIdx = []

  mergeSort(
    array.slice(),
    array.slice(),
    0,
    array.length - 1,
    animations,
    sortedIdx
  )

  // process animations
  // pair -> swap
  // triplet -> comparison
  animations.forEach((pair, index) => {
    const currentArray = array.slice()
    if (pair[2] === 1) {
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
        setArray(currentArray)
      }, index * ANIMATION_SPEED)

      // change value
      setTimeout(() => {
        currentArray[pair[0]].value = pair[1]
        setArray(currentArray)
      }, index * ANIMATION_SPEED)

      // revert state
      setTimeout(() => {
        currentArray[pair[0]].state = BAR_STATE.normal
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    }

    // if element at index is sorted
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

export default mergeSortHandler
