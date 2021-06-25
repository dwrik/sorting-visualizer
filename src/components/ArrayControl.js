import Button from "react-bootstrap/Button"
import RangeSlider from "react-bootstrap-range-slider"
import { APP_STATE } from "../App"

const ArrayControl = ({ rangeSliderValue, changeArraySize, state }) => {
  return (
    <>
      <span style={{ color: "white" }} className="my-2 mx-4">
        Change Array Size & Sorting Speed
      </span>
      <RangeSlider
        variant="secondary"
        tooltip="off"
        min={5}
        max={100}
        value={rangeSliderValue}
        disabled={state === APP_STATE.sorting}
        onChange={(event) => {
          changeArraySize(event.target.value)
        }}
      />
      <Button
        variant="outline-light"
        className="mx-2"
        disabled={state === APP_STATE.sorting}
        onClick={() => changeArraySize()}
      >
        Generate New Array
      </Button>
    </>
  )
}

export default ArrayControl
