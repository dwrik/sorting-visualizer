import bubbleSort from "./algorithms/BubbleSort"
import { BAR_STATE, APP_STATE, ANIMATION_SPEED } from "./App"

const sort = (algorithm, array, setArray, setState) => {
  switch (algorithm) {
    case "Bubble Sort":
      bubbleSortHandler(array, setArray, setState)
      break

    case "Merge Sort":
      break

    case "Quick Sort":
      break

    case "Selection Sort":
      break

    default:
      // warn users
      alert('Please choose an algorithm before clicking the "Sort" button!')
  }
}

const bubbleSortHandler = (array, setArray, setState) => {
  // change App state for disabling controls
  setState(APP_STATE.sorting)

  const { sortedIdx, animations } = bubbleSort(array)
  let i = 0 // sortedIdx pointer

  animations.forEach((pair, index) => {
    const currentArray = array.slice()

    // if even then comparison else swap
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
      if (index === sortedIdx[i]) {
        i++ // increment sortedIdx pointer

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
          }, 2000)
        }, index * ANIMATION_SPEED)
      }
    }
  })
}

export default sort
