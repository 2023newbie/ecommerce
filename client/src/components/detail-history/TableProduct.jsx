import { useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import numberToPrice from '../../util/number-to-price'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  & thead {
    background-color: #f6f9f6;
    color: rgb(64, 62, 62);
  }
  & th {
    padding: 16px 0;
    text-transform: uppercase;
    font-style: italic;
  }
  & td {
    padding: 0 8px;
  }
`

const TableProduct = () => {
  const cartLoader = useLoaderData().cart
  const products = cartLoader?.map(prod => {
    const price = numberToPrice(prod.productId.price)
    return {
      ...prod.productId,
      price,
      qty: prod.qty
    }
  })

  return (
    <Table>
      <thead>
        <tr>
          <th>Id Product</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {products && products.map(prod => {
          return <tr key={prod._id}>
            <td>{prod._id}</td>
            <td><img src={prod.img1} alt={prod.name} width='100px' /></td>
            <td>{prod.name}</td>
            <td>{prod.price}</td>
            <td>{prod.qty}</td>
          </tr>
        })}
      </tbody>
    </Table>
  )
}

export default TableProduct