import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Navbar from "react-bootstrap/Navbar"
import AlgorithmControl from "./AlgorithmControl"
import ArrayControl from "./ArrayControl"
import { APP_STATE } from "../App"

const NavBar = ({
  rangeSliderValue,
  changeArraySize,
  algorithm,
  algorithms,
  changeAlgorithm,
  sortHandler,
  state,
}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="brand-name">SortingVisualizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <ArrayControl
            rangeSliderValue={rangeSliderValue}
            changeArraySize={changeArraySize}
            state={state}
          />
          <AlgorithmControl
            algorithm={algorithm}
            algorithms={algorithms}
            changeAlgorithm={changeAlgorithm}
            state={state}
          />
          <Button
            variant="light"
            type="submit"
            className="mx-2"
            disabled={state === APP_STATE.sorting}
            onClick={sortHandler}
            state={state}
          >
            Sort!
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
