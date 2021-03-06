import { BAR_STATE, BAR_COLORS } from "../App"

const Bar = ({ height, state, size }) => {
  return (
    <div
      style={{
        height: `${height}vh`,
        width: `${getWidth(size)}`,
        backgroundColor: `${getColor(state)}`,
      }}
      className="bar"
    ></div>
  )
}

const getColor = (state) => {
  switch (state) {
    case BAR_STATE.pivot: return BAR_COLORS.pivot
    case BAR_STATE.normal: return BAR_COLORS.normal
    case BAR_STATE.compared: return BAR_COLORS.compared
    case BAR_STATE.finished: return BAR_COLORS.finished
    case BAR_STATE.swapped: return BAR_COLORS.swapped
    case BAR_STATE.sorted: return BAR_COLORS.sorted
    default: return "aliceblue"
  }
}

const getWidth = (size) => {
  if (size < 8) return "45px"
  else if (size < 15) return "25px"
  else if (size < 30) return "20px"
  else if (size < 45) return "15px"
  else if (size < 60) return "12px"
  else if (size < 75) return "10px"
  else if (size < 90) return "9px"
  else return "8px"
}

export default Bar
