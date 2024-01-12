import { json, useLoaderData } from 'react-router-dom'

import Detail from '../components/detail/Detail'
import Summary from '../components/detail/Summary'
import numberToPrice from '../util/number-to-price'
import axios from '../util/axios'

const DetailPage = () => {
  const data = useLoaderData()

  return (
    <>
      <Summary product={data} />
      <Detail product={data} />
    </>
  )
}

export default DetailPage

export async function loader({params}) {
  const { productId } = params
  try {
    const res = await axios.get('/product/' + productId)
    const data = res.data

    // handle price product
    const price = numberToPrice(data.price)
    const mapRelateProds = data.sameProds.map(prod => {
      const price = numberToPrice(prod.price)
      return { ...prod, price }
    })

    return {...data, price, sameProds: mapRelateProds}
  } catch (err) {
    return json({msg: 'Server is not response.'}, {status: 500})
  }
}