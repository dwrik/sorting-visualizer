import { BAR_STATE, APP_STATE, ANIMATION_SPEED, ARRAY_FLASH_SPEED } from "../App"
import { ANIMATION_TYPE } from "../SortingController"

const selectionSort = (originalArray) => {
  const animations = [] // stores comparison or swap animations
  const sortedIndex = [] // stores animation indexes to highlight sorted bars
  const array = originalArray.slice() // make a copy of originalArray
  for (let i = 0; i < array.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < array.length; j++) {
      animations.push([min, j, ANIMATION_TYPE.comparison])
      min = array[j].value < array[min].value ? j : min
    }
    animations.push([i, min, ANIMATION_TYPE.swap])
    sortedIndex.push(animations.length - 1)
    const swap = array[i]
    array[i] = array[min]
    array[min] = swap
  }
  return { animations, sortedIndex }
}

const animateSelectionSort = (array, setArray, setState) => {
  // change App state for disabling controls
  setState(APP_STATE.sorting)

  // get sorting animations
  const { animations, sortedIndex } = selectionSort(array)

  // sortedIndex pointer
  let idx = 0

  // process animations
  // animation -> [firstIndex, secondIndex, ANIMATION_TYPE]
  animations.forEach((animation, index) => {
    const currentArray = array.slice()

    if (animation[2] === ANIMATION_TYPE.comparison) {
      setTimeout(() => {
        currentArray[animation[0]].state = BAR_STATE.compared
        currentArray[animation[1]].state = BAR_STATE.compared
        setArray(currentArray)
      }, index * ANIMATION_SPEED)
    } else {
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
        const finished = array.map((bar) => {
          return { state: BAR_STATE.finished, value: bar.value }
        })
        setArray(finished)
        setTimeout(() => { // change state to sorted
          const sortedArray = array.map((bar) => {
            return { state: BAR_STATE.sorted, value: bar.value }
          })
          setArray(sortedArray)
          setState(APP_STATE.default) // reset App state for enabling controls
        }, ARRAY_FLASH_SPEED)
      }, index * ANIMATION_SPEED)
    }
  })
}

export default animateSelectionSort
