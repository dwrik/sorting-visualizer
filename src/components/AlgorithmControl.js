import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

const AlgorithmControl = ({ algorithm, algorithms, changeAlgorithm}) => {
  return (
    <DropdownButton
      id="algorithm"
      title={algorithm}
      variant="outline-light"
      className="mx-auto"
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