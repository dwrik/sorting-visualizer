import { useEffect, useState } from "react"
import NavBar from "./components/Navbar"
import Array from "./components/Array"
import sort from "./SortingController"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css"

export const BAR_STATE = {
  normal: 0,
  compared: 1,
  swapped: 2,
  sorted: 3,
  finished: 4,
}

export const BAR_COLORS = {
  normal: "darkslategrey",
  swapped: "mediumspringgreen",
  finished: "palegreen",
  compared: "red",
  sorted: "thistle",
}

export const APP_STATE = {
  default: 0,
  sorting: 1,
}

export const ANIMATION_SPEED = 20
export const ARRAY_FLASH_SPEED = 1000

const ALGORITHMS = ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"]
const DEFAULT_ARRAY_SIZE = 50
const MAX_ARRAY_VALUE = 80
const MIN_ARRAY_VALUE = 2

const App = () => {
  // App state
  const [size, setSize] = useState(DEFAULT_ARRAY_SIZE)
  const [algorithm, setAlgorithm] = useState("Algorithm")
  const [state, setState] = useState(APP_STATE.default)
  const [array, setArray] = useState([])

  // hook to regenerate array on size change
  useEffect(() => {
    setArray(generateRandomArray(size))
  }, [size])

  // change array or both size & array
  const changeArraySize = (value = size) => {
    if (value === size) setArray(generateRandomArray(size))
    else setSize(value)
  }

  // change sorting algorithm
  const changeAlgorithm = (algorithm) => {
    setAlgorithm(algorithm)
  }

  // random integers b/w [MAX_ARRAY_VALUE, MIN_ARRAY_VALUE]
  const generateRandomArray = (size) => {
    const array = []
    for (let i = 0; i < size; i++) {
      array.push({
        state: BAR_STATE.normal,
        value:
          Math.floor(Math.random() * (MAX_ARRAY_VALUE - 1)) + MIN_ARRAY_VALUE,
      })
    }
    return array
  }

  // sort button handler
  const sortHandler = () => {
    sort(algorithm, array, setArray, setState)
  }

  return (
    <div>
      <NavBar
        rangeSliderValue={size}
        changeArraySize={changeArraySize}
        algorithm={algorithm}
        algorithms={ALGORITHMS}
        changeAlgorithm={changeAlgorithm}
        sortHandler={sortHandler}
        state={state}
      />
      <Array array={array} />
    </div>
  )
}

export default App
