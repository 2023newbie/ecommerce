import { useNavigate } from 'react-router-dom'
import './TableOrder.css'

const TableOrder = ({orders}) => {
  const navigate = useNavigate()

  return (
    <table className='table-order'>
      <thead>
        <tr>
          <th>Id Order</th>
          <th>Id User</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Total</th>
          <th>Delivery</th>
          <th>Status</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.map(ord => {
          return <tr key={ord._id}>
            <td>{ord._id}</td>
            <td>{ord.userId}</td>
            <td>{ord.full_name}</td>
            <td>{ord.phone}</td>
            <td>{ord.address}</td>
            <td>{ord.totalPrice} VND</td>
            <td>Waiting for progressing</td>
            <td>{ord.status}</td>
            <td><button onClick={() => navigate(`/history/${ord._id}`)}>View <i className="fa-solid fa-arrow-right-long"></i></button></td>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default TableOrder