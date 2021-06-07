import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Bar from "./Bar"

const Array = ({ array }) => {
  return (
    <Container >
      <Row className="flex-nowrap justify-content-center">
        {array.map((bar, index) => {
          return <Bar key={index} height={bar.value} state={bar.state} size={array.length} />
        })}
      </Row>
    </Container>
  )
}

export default Array
