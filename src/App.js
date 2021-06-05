import { useEffect, useState } from "react"
import NavBar from "./components/Navbar"
import Array from "./components/Array"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css"

const ALGORITHMS = ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"]
const DEFAULT_ARRAY_SIZE = 50
const MAX_ARRAY_VALUE = 80
const MIN_ARRAY_VALUE = 2

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
      array.push(
        Math.floor(Math.random() * (MAX_ARRAY_VALUE - 1)) + MIN_ARRAY_VALUE
      )
    }
    return array
  }

  return (
    <div>
      <NavBar
        rangeSliderValue={size}
        changeArraySize={changeArraySize}
        algorithm={algorithm}
        algorithms={ALGORITHMS}
        changeAlgorithm={changeAlgorithm}
      />
      <Array array={array} />
    </div>
  )
}

export default App
