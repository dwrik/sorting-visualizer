import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { APP_STATE } from "../App"

const AlgorithmControl = ({
  algorithm,
  algorithms,
  changeAlgorithm,
  state,
}) => {
  return (
    <DropdownButton
      id="algorithm"
      title={algorithm}
      variant="outline-light"
      className="mx-auto"
      disabled={state === APP_STATE.sorting}
      onSelect={(eventKey, event) => {
        changeAlgorithm(event.target.innerHTML)
      }}
    >
      {algorithms.map((algorithm, index) => {
        return <Dropdown.Item key={index}>{algorithm}</Dropdown.Item>
      })}
    </DropdownButton>
  )
}

export default AlgorithmControl
