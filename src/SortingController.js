import animateHeapSort from "./algorithms/HeapSort"
import animateMergeSort from "./algorithms/MergeSort"
import animateQuickSort from "./algorithms/QuickSort"
import animateBubbleSort from "./algorithms/BubbleSort"
import animateSelectionSort from "./algorithms/SelectionSort"

export const ANIMATION_TYPE = {
  comparison: 0,
  swap: 1,
}

const sort = (algorithm, array, setArray, setState, ANIMATION_SPEED) => {
  switch (algorithm) {
    case "Bubble Sort":
      animateBubbleSort(array, setArray, setState, ANIMATION_SPEED)
      break

    case "Merge Sort":
      animateMergeSort(array, setArray, setState, ANIMATION_SPEED)
      break

    case "Heap Sort":
      animateHeapSort(array, setArray, setState, ANIMATION_SPEED)
      break

    case "Quick Sort":
      animateQuickSort(array, setArray, setState, ANIMATION_SPEED)
      break

    case "Selection Sort":
      animateSelectionSort(array, setArray, setState, ANIMATION_SPEED)
      break

    default:
      alert('Please choose an algorithm before clicking the "Sort" button!') // warning
  }
}

export default sort
