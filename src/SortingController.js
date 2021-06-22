import animateBubbleSort from "./algorithms/BubbleSort"
import animateSelectionSort from "./algorithms/SelectionSort"
import animateMergeSort from "./algorithms/MergeSort"

export const ANIMATION_TYPE = {
  comparison: 0,
  swap: 1,
}

const sort = (algorithm, array, setArray, setState) => {
  switch (algorithm) {
    case "Bubble Sort":
      animateBubbleSort(array, setArray, setState)
      break

    case "Merge Sort":
      animateMergeSort(array, setArray, setState)
      break

    case "Quick Sort":
      break

    case "Selection Sort":
      animateSelectionSort(array, setArray, setState)
      break

    default:
      // warn users
      alert('Please choose an algorithm before clicking the "Sort" button!')
  }
}

export default sort
