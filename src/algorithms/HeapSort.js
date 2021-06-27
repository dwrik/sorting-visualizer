import { BAR_STATE, APP_STATE, ARRAY_FLASH_SPEED } from "../App"
import { ANIMATION_TYPE } from "../SortingController"

const swap = (array, i, j) => {
  const swap = array[i]
  array[i] = array[j]
  array[j] = swap
}

const hasLeftChild = (length, index) => {
  return 2 * index + 1 < length
}

const hasRightChild = (length, index) => {
  return 2 * index + 2 < length
}

const getLeftChildIndex = (index) => {
  return 2 * index + 1
}

const getRightChildIndex = (index) => {
  return 2 * index + 2
}

const getValue = (array, index) => {
  return array[index].value
}

const heapifyDown = (array, length, index, animations) => {
  while (hasLeftChild(length, index)) {
    const leftChildIndex = getLeftChildIndex(index)
    const rightChildIndex = getRightChildIndex(index)
    let biggerChildIndex = leftChildIndex

    if (hasRightChild(length, index)) {
      animations.push([leftChildIndex, rightChildIndex, ANIMATION_TYPE.comparison])
      if (getValue(array, rightChildIndex) > getValue(array, leftChildIndex)) {
        biggerChildIndex = rightChildIndex
      }
    }

    animations.push([index, biggerChildIndex, ANIMATION_TYPE.comparison])
    if (getValue(array, index) > getValue(array, biggerChildIndex)) {
      return
    }

    animations.push([index, biggerChildIndex, ANIMATION_TYPE.swap])
    swap(array, index, biggerChildIndex)
    index = biggerChildIndex
  }
}

const heapSort = (array) => {
  const animations = [] // stores comparison or swap animations
  const sortedIndex = [] // stores animation indexes to highlight sorted bars

  let lastParentIndex = Math.floor((array.length - 1 - 2) / 2)
  while (lastParentIndex >= 0) {
    heapifyDown(array, array.length, lastParentIndex, animations)
    lastParentIndex--
  }

  let end = array.length - 1
  while (end > 0) {
    swap(array, 0, end)
    animations.push([0, end, ANIMATION_TYPE.swap])
    sortedIndex.push(animations.length - 1)
    heapifyDown(array, end, 0, animations)
    end--
  }

  return { animations, sortedIndex }
}

const animateHeapSort = (array, setArray, setState, ANIMATION_SPEED) => {
  // change app state for disabling controls
  setState(APP_STATE.sorting)

  // sortedIndex pointer
  let idx = 0

  // get sorting animations
  const { animations, sortedIndex } = heapSort(array.slice())

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

export default animateHeapSort
