import { useLoaderData } from "react-router-dom"
import TableOrder from "../components/history/TableOrder"
import Header from "../components/share/Header/Header"
import getToken from "../util/get-token"
import axios from '../util/axios'

const HistoryPage = () => {
  const data = useLoaderData()

  if (data.notLogin) return <p>Please login to see history.</p>

  return (
    <>
      <Header type='History' />
      <TableOrder orders={data} />
    </>
  )
}

export default HistoryPage

export async function loader() {
  const token = getToken()

  try {
    const res = await axios.get('/orders', {
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