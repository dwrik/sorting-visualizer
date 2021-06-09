import { useEffect, useState } from "react"
import NavBar from "./components/Navbar"
import Array from "./components/Array"
import bubbleSort from "./algorithms/BubbleSort"
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
  compared: "red",
  swapped: "mediumspringgreen",
  sorted: "pink",
  finished: "palegreen",
}

const ALGORITHMS = ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"]
const DEFAULT_ARRAY_SIZE = 50
const MAX_ARRAY_VALUE = 80
const MIN_ARRAY_VALUE = 2
const ANIMATION_SPEED = 10

const App = () => {
  const [size, setSize] = useState(DEFAULT_ARRAY_SIZE)
  const [algorithm, setAlgorithm] = useState("Algorithm")
  const [array, setArray] = useState([])

  useEffect(() => {
    setArray(generateRandomArray(size))
  }, [size])

  const changeArraySize = (value = size) => {
    if (value === size) setArray(generateRandomArray(size))
    else setSize(value)
  }

  const changeAlgorithm = (algorithm) => {
    setAlgorithm(algorithm)
  }

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

  const sortHandler = () => {
    const { sortedIdx, comparisons: animations } = bubbleSort(array)
    let i = 0
    animations.forEach((pair, index) => {
      const currentArray = array.slice()
      if (index % 2 === 0) {
        // change bar state for comparison
        setTimeout(() => {
          currentArray[pair[0]].state = BAR_STATE.compared
          currentArray[pair[1]].state = BAR_STATE.compared
          setArray(currentArray)
        }, index * ANIMATION_SPEED)
        setTimeout(() => {
          currentArray[pair[0]].state = BAR_STATE.normal
          currentArray[pair[1]].state = BAR_STATE.normal
          setArray(currentArray)
        }, index * ANIMATION_SPEED)
      } else {
        // swap state and values if different index
        if (pair[0] !== pair[1]) {
          setTimeout(() => {
            currentArray[pair[0]].state = BAR_STATE.swapped
            currentArray[pair[1]].state = BAR_STATE.swapped
            setArray(currentArray)
          }, index * ANIMATION_SPEED)
          setTimeout(() => {
            const swap = currentArray[pair[0]].value
            currentArray[pair[0]].value = currentArray[pair[1]].value
            currentArray[pair[1]].value = swap
            setArray(currentArray)
          }, index * ANIMATION_SPEED)
          setTimeout(() => {
            currentArray[pair[0]].state = BAR_STATE.normal
            currentArray[pair[1]].state = BAR_STATE.normal
            setArray(currentArray)
          }, index * ANIMATION_SPEED)
        }

        // if sorted index, change bar state
        if (index === sortedIdx[i]) {
          i = i + 1
          setTimeout(() => {
            currentArray[pair[1]].state = BAR_STATE.sorted
            setArray(currentArray)
          }, index * ANIMATION_SPEED)
        }

        // flash array to indicate sorting finished
        if (index === animations.length - 1) {
          setTimeout(() => {
            const sortedArray = array.map((bar) => {
              return { state: BAR_STATE.finished, value: bar.value }
            })
            setArray(sortedArray)
            setTimeout(() => {
              const normalArray = array.map((bar) => {
                return { state: BAR_STATE.sorted, value: bar.value }
              })
              setArray(normalArray)
            }, 2000)
          }, index * ANIMATION_SPEED)
        }
      }
    })
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
      />
      <Array array={array} />
    </div>
  )
}

export default App
