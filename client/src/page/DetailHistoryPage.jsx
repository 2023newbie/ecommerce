import { useLoaderData } from 'react-router-dom'
import getToken from '../util/get-token'
import InfoOrder from '../components/detail-history/InfoOrder';
import TableProduct from '../components/detail-history/TableProduct';
import axios from '../util/axios'

const DetailHistoryPage = () => {
  const data = useLoaderData()

  if (data.notLogin) {
    return <p>Please login to see detail order.</p>
  }

  return (
    <>
      <InfoOrder />
      <TableProduct />
    </>
  )
}

export default DetailHistoryPage

export async function loader({params}) {
  const { orderId } = params
  const token = getToken()
  try {
    const res = await axios.get('/orders/' + orderId, {
      headers: { 'Authorization': 'Bearer ' + token }
    })

    if (res.status === 403) {
      return {notLogin: true}
    }

    return res.data
  } catch (err) {
    console.log(err)
  }
}