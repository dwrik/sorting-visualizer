import { BAR_STATE, APP_STATE, ANIMATION_SPEED, ARRAY_FLASH_SPEED } from "../App"
import { ANIMATION_TYPE } from "../SortingController"

const merge = (originalArray, auxiliaryArray, start, end, mid, animations, sortedIndex) => {
  let k = start
  let i = start
  let j = mid + 1
  while (i <= mid && j <= end) {
    if (auxiliaryArray[i].value < auxiliaryArray[j].value) {
      animations.push([k, j, ANIMATION_TYPE.comparison])
      originalArray[k++] = auxiliaryArray[i++]
    } else {
      animations.push([k, j, ANIMATION_TYPE.swap])
      originalArray[k++] = auxiliaryArray[j++]
    }
    if (start === 0 && end === originalArray.length - 1) {
      sortedIndex.push(animations.length - 1)
    }
  }
  while (i <= mid) {
    originalArray[k++] = auxiliaryArray[i++]
  }
  while (j <= end) {
    animations.push([k, j, ANIMATION_TYPE.swap])
    originalArray[k++] = auxiliaryArray[j++]
    if (start === 0 && end === originalArray.length - 1) {
      sortedIndex.push(animations.length - 1)
    }
  }
}

const mergeSort = (originalArray, auxiliaryArray, start, end, animations, sortedIndex) => {
  if (start === end) return
  const mid = Math.floor((start + end) / 2)
  mergeSort(auxiliaryArray, originalArray, start, mid, animations, sortedIndex)
  mergeSort(auxiliaryArray, originalArray, mid + 1, end, animations, sortedIndex)
  merge(originalArray, auxiliaryArray, start, end, mid, animations, sortedIndex)
}

const animateMergeSort = (array, setArray, setState) => {
  // change App state for disabling controls
  setState(APP_STATE.sorting)

  // sortedIndex pointer
  let idx = 0

  const animations = [] // stores comparison or swap animations
  const sortedIndex = [] // stores animation indexes to highlight sorted bars

  // get sorting animations
  mergeSort(array.slice(), array.slice(), 0, array.length - 1, animations, sortedIndex)

  // process animations
  // animation -> [firstIndex, secondIndex, ANIMATION_TYPE]
  animations.forEach((animation, index) => {
    const currentArray = array.slice()

    // comparison animation
    if (animation[2] === ANIMATION_TYPE.comparison) {
      setTimeout(() => {
        currentArray[animation[0]].state = BAR_STATE.compared
        currentArray[animation[1]].state = BAR_STATE.compared
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    }
    
    // swap animation
    if (animation[2] === ANIMATION_TYPE.swap) {
      setTimeout(() => {
        currentArray[animation[0]].state = BAR_STATE.swapped
        currentArray[animation[1]].state = BAR_STATE.swapped
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
      setTimeout(() => {
        const swap = currentArray[animation[1]].value
        for (let i = animation[1]; i > animation[0]; i--) {
          currentArray[i].value = currentArray[i - 1].value
        }
        currentArray[animation[0]].value = swap
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    }

    // revert state
    setTimeout(() => {
      currentArray[animation[0]].state = BAR_STATE.normal
      currentArray[animation[1]].state = BAR_STATE.normal
      setArray(currentArray)
    }, (index + 1) * ANIMATION_SPEED)

    // if animation sorts a bar
    if (index === sortedIndex[idx]) {
      idx++
      setTimeout(() => {
        currentArray[animation[0]].state = BAR_STATE.sorted
        setArray(currentArray)
      }, (index + 1) * ANIMATION_SPEED)
    }

    // flash array to indicate sorting finished
    if (index === animations.length - 1) {
      setTimeout(() => { // change state to sorted
        const finishedArray = array.map((bar) => {
          return { state: BAR_STATE.finished, value: bar.value }
        })
        setArray(finishedArray)
        setTimeout(() => { // change state to finished
          const sortedArray = array.map((bar) => {
            return { state: BAR_STATE.sorted, value: bar.value }
          })
          setArray(sortedArray)
          setState(APP_STATE.default) // reset app state for enabling controls
        }, ARRAY_FLASH_SPEED)
      }, (index + 1) * ANIMATION_SPEED)
    }
  })
}

export default animateMergeSort
