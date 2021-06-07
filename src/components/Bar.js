const Bar = ({ height, size }) => {
  return (
    <div
      style={{
        height: `${height}vh`,
        width: `${
          size < 15
            ? "48px"
            : size < 30
            ? "30px"
            : size < 45
            ? "20px"
            : size < 60
            ? "15px"
            : size < 75
            ? "12px"
            : size < 90
            ? "10px"
            : "8px"
        }`,
      }}
      className="bar"
    ></div>
  )
}

export default Bar
