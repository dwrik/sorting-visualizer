import Button from "react-bootstrap/Button"
import RangeSlider from "react-bootstrap-range-slider"

const ArrayControl = ({ rangeSliderValue, changeArraySize }) => {
  return (
    <>
      <span style={{ color: "white" }} className="my-2 mx-4">
        Change Array Size
      </span>
      <RangeSlider
        variant="secondary"
        tooltip="off"
        min={50}
        max={100}
        value={rangeSliderValue}
        onChange={(event) => {
          changeArraySize(event.target.value)
        }}
      />
      <Button
        variant="outline-light"
        className="mx-2"
        onClick={() => changeArraySize()}
      >
        Generate New Array
      </Button>
    </>
  )
}

export default ArrayControl
