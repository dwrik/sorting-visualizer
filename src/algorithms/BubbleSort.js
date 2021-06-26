import { BAR_STATE, APP_STATE, ARRAY_FLASH_SPEED } from "../App"
import { ANIMATION_TYPE } from "../SortingController"

const bubbleSort = (originalArray) => {
  const animations = [] // stores comparison or swap animations
  const sortedIndex = [] // stores animation indexes to highlight sorted bars
  const array = originalArray.slice() // make a copy of originalArray
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1, ANIMATION_TYPE.comparison])
      if (array[j].value > array[j + 1].value) {
        animations.push([j, j + 1, ANIMATION_TYPE.swap])
        const swap = array[j]
        array[j] = array[j + 1]
        array[j + 1] = swap
      }
    }
    sortedIndex.push(animations.length - 1)
  }
  return { animations, sortedIndex }
}

const animateBubbleSort = (array, setArray, setState, ANIMATION_SPEED) => {
  // change app state for disabling controls
  setState(APP_STATE.sorting)

  // get sorting animations
  const { animations, sortedIndex } = bubbleSort(array)

  // sortedIndex pointer
  let idx = 0

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

    // swap animation only if different index
    if (animation[2] === ANIMATION_TYPE.swap && animation[0] !== animation[1]) {
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
        currentArray[animation[1]].state = BAR_STATE.sorted
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

export default animateBubbleSort
