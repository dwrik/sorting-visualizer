import animateMergeSort from "./algorithms/MergeSort"
import animateQuickSort from "./algorithms/QuickSort"
import animateBubbleSort from "./algorithms/BubbleSort"
import animateSelectionSort from "./algorithms/SelectionSort"

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
      animateQuickSort(array, setArray, setState)
      break

    case "Selection Sort":
      animateSelectionSort(array, setArray, setState)
      break

    default:
      alert('Please choose an algorithm before clicking the "Sort" button!') // warning
  }
}

export default sort
