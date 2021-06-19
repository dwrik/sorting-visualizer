import bubbleSortHandler from "./algorithms/BubbleSort"
import selectionSortHandler from "./algorithms/SelectionSort"

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
      selectionSortHandler(array, setArray, setState)
      break

    default:
      // warn users
      alert('Please choose an algorithm before clicking the "Sort" button!')
  }
}

export default sort
