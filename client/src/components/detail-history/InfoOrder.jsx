import { useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import numberToPrice from '../../util/number-to-price'

const Div = styled.div`
  padding: 32px;
  font-style: italic;

  & h1 {
    font-size: 1.8rem;
    font-weight: 400;
  }
  & ul {
    padding: 0;
  }
  & ul li {
    color: #aaa;
  }
`

const InfoOrder = () => {
  const data = useLoaderData()
  const total = numberToPrice(data.totalPrice)

  return (
    <Div>
      <h1>INFORMATION ORDER</h1>
      <ul>
        <li>ID User: {data.userId}</li>
        <li>Full Name: {data.full_name}</li>
        <li>Phone: {data.phone}</li>
        <li>Address: {data.address}</li>
        <li>Total: {total} VND</li>
      </ul>
    </Div>
  )
}

export default InfoOrder