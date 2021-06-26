import { BAR_STATE, APP_STATE, ARRAY_FLASH_SPEED } from "../App"
import { ANIMATION_TYPE } from "../SortingController"

const swap = (array, i, j) => {
  const swap = array[i]
  array[i] = array[j]
  array[j] = swap
}

const partition = (originalArray, start, end, animations, sortedIndex) => {
  let i = start - 1
  let j = start
  let k = end
  while (j < k) {
    animations.push([j, k, ANIMATION_TYPE.comparison])
    if (originalArray[j].value < originalArray[k].value) {
      i++
      swap(originalArray, i, j)
      animations.push([i, j, ANIMATION_TYPE.swap])
    }
    j++
  }
  swap(originalArray, i + 1, k)
  animations.push([i + 1, k, ANIMATION_TYPE.swap])
  sortedIndex.push(animations.length - 1)
  return i + 1
}

const quicksort = (originalArray, start, end, animations, sortedIndex) => {
  if (start >= end) {
    if (start === end) {
      animations.push([start, end, ANIMATION_TYPE.comparison])
      animations.push([start, end, ANIMATION_TYPE.swap])
      sortedIndex.push(animations.length - 1)
    }
    return
  }
  const pivot = partition(originalArray, start, end, animations, sortedIndex)
  quicksort(originalArray, start, pivot - 1, animations, sortedIndex)
  quicksort(originalArray, pivot + 1, end, animations, sortedIndex)
}

const animateQuickSort = (array, setArray, setState, ANIMATION_SPEED) => {
  // change App state for disabling controls
  setState(APP_STATE.sorting)

  // sortedIndex pointer
  let idx = 0

  const animations = [] // stores comparison or swap animations
  const sortedIndex = [] // stores animation indexes to highlight sorted bars

  // get sorting animations
  quicksort(array.slice(), 0, array.length - 1, animations, sortedIndex)

  // process animations
  // animation -> [firstIndex, secondIndex, ANIMATION_TYPE]
  animations.forEach((animation, index) => {
    const currentArray = array.slice()

    // comparison animation
    if (animation[2] === ANIMATION_TYPE.comparison) {
      setTimeout(() => {
        currentArray[animation[0]].state = BAR_STATE.compared
        currentArray[animation[1]].state = BAR_STATE.pivot
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
        const swap = currentArray[animation[0]].value
        currentArray[animation[0]].value = currentArray[animation[1]].value
        currentArray[animation[1]].value = swap
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    }

    // revert state
    setTimeout(() => {
      currentArray[animation[0]].state = BAR_STATE.normal
      currentArray[animation[1]].state = BAR_STATE.normal
      setArray(currentArray)
    }, index * ANIMATION_SPEED)

    // if animation sorts a bar
    if (index === sortedIndex[idx]) {
      idx++
      setTimeout(() => {
        currentArray[animation[0]].state = BAR_STATE.sorted
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    }

    // flash array to indicate sorting finished
    if (index === animations.length - 1) {
      setTimeout(() => { // change state to finished
        const finishedArray = array.map((bar) => {
          return { state: BAR_STATE.finished, value: bar.value }
        })
        setArray(finishedArray)
        setTimeout(() => { // change state to sorted
          const sortedArray = array.map((bar) => {
            return { state: BAR_STATE.sorted, value: bar.value }
          })
          setArray(sortedArray)
          setState(APP_STATE.sorted) // change app state
        }, ARRAY_FLASH_SPEED)
      }, index * ANIMATION_SPEED)
    }
  })
}

export default animateQuickSort
