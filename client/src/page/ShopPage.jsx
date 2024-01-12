import Header from '../components/share/Header/Header'
import Aside from '../components/shop/Aside'
import ProductsShop from '../components/shop/ProductsShop'
import numberToPrice from '../util/number-to-price'
import axios from '../util/axios'

const ShopPage = () => {

  return (
    <>
      <Header type='Shop' />
      <main className='shop-wrap'>
        <Aside />
        <ProductsShop />
      </main>
    </>
  )
}

export default ShopPage

export async function loader({request}) {
  const type = new URL(request.url).searchParams.get('type') || 'all'
  try {
    const res = await axios('/products')
    const data = res.data

    // handle price products
    const editProds = data.map(prod => {
      const price = numberToPrice(prod.price)
      return { ...prod, price }
    })

    if (type === 'all') {
      return editProds
    } else {
      const result = editProds.filter(prod => prod.category === type)
      return result
    }
  } catch (err) {
    console.log(err)
  }
}