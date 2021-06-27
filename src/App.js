import { useEffect, useState } from "react"
import { GoMarkGithub } from "react-icons/go"
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
  pivot: 5,
}

export const BAR_COLORS = {
  normal: "darkgrey",
  swapped: "lightgreen",
  finished: "palegreen",
  compared: "lightsalmon",
  sorted: "thistle",
  pivot: "khaki",
}

export const APP_STATE = {
  default: 0,
  sorting: 1,
  sorted: 2,
}

export const ARRAY_FLASH_SPEED = 1000

const ALGORITHMS = [
  "Merge Sort",
  "Heap Sort",
  "Quick Sort",
  "Bubble Sort",
  "Selection Sort",
]

const DEFAULT_ARRAY_SIZE = 50
const MAX_ARRAY_VALUE = 80
const MIN_ARRAY_VALUE = 2

const App = () => {
  // animation speed calculator
  const getAnimationSpeed = (size, algorithm) => {
    let speedFactor = 0

    switch (algorithm) {
      case "Merge Sort":
        speedFactor = 4000
        break

      case "Quick Sort":
      case "Heap Sort":
        speedFactor = 3000
        break

      case "Bubble Sort":
      case "Selection Sort":
        speedFactor = 2000
        break

      default:
        speedFactor = 1000
    }

    return speedFactor / size
  }

  // App state
  const [array, setArray] = useState([])
  const [size, setSize] = useState(DEFAULT_ARRAY_SIZE)
  const [state, setState] = useState(APP_STATE.default)
  const [algorithm, setAlgorithm] = useState(ALGORITHMS[0])
  const [ANIMATION_SPEED, setAnimationSpeed] = useState(
    getAnimationSpeed(DEFAULT_ARRAY_SIZE, algorithm)
  )

  // animation speed hook
  useEffect(() => {
    setAnimationSpeed(getAnimationSpeed(size, algorithm))
  }, [size, algorithm])

  // array size hook
  useEffect(() => {
    setArray(generateRandomArray(size))
  }, [size])

  // change array or both size & array
  const changeArraySize = (value = size) => {
    setState(APP_STATE.default)
    if (value === size) {
      setArray(generateRandomArray(size))
    } else {
      setSize(value)
    }
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

  // change sorted state to normal
  const revertSortedState = () => {
    const stateChangedArray = array.map((bar) => {
      return {
        state: BAR_STATE.normal,
        value: bar.value,
      }
    })
    return stateChangedArray
  }

  // sort button handler
  const sortHandler = () => {
    let currentArray = array
    if (state === APP_STATE.sorted) {
      currentArray = revertSortedState()
    }
    sort(algorithm, currentArray, setArray, setState, ANIMATION_SPEED)
  }

  return (
    <div className="main">
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
      <footer className="footer">
        <a
          href="https://github.com/dwrik"
          target="_blank"
          rel="noreferrer"
          className="links"
        >
          <GoMarkGithub /> <span id="username">dwrik</span>
        </a>
      </footer>
    </div>
  )
}

export default App
