import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Navbar from "react-bootstrap/Navbar"
import AlgorithmControl from "./AlgorithmControl"
import ArrayControl from "./ArrayControl"

const NavBar = ({
  rangeSliderValue,
  changeArraySize,
  algorithm,
  algorithms,
  changeAlgorithm,
  sortHandler,
}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>SortingVisualizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <ArrayControl
            rangeSliderValue={rangeSliderValue}
            changeArraySize={changeArraySize}
          />
          <AlgorithmControl
            algorithm={algorithm}
            algorithms={algorithms}
            changeAlgorithm={changeAlgorithm}
          />
          <Button
            variant="light"
            type="submit"
            className="mx-2"
            onClick={sortHandler}
          >
            Sort!
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
