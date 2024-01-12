import classes from './ShoppingCart.module.css'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import numberToPrice from '../../util/number-to-price'

const ShoppingCart = () => {
  const navigate = useNavigate()
  const cart = useSelector(store => store.cart.listCart)
  const numTotalPrice = useSelector(store => store.cart.totalPrice)
  const totalPrice = numberToPrice(numTotalPrice)

  return (
    <main className={classes.main}>
      <h1>SHOPPING CART</h1>
      <article className={classes.article}>
        <section className={classes.info}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.row}>
                <th style={{ width: '15%' }}>IMAGE</th>
                <th style={{ width: '25%' }}>PRODUCT</th>
                <th style={{ width: '15%' }}>PRICE</th>
                <th style={{ width: '15%' }}>QUANTITY</th>
                <th style={{ width: '15%' }}>TOTAL</th>
                <th style={{ width: '15%' }}>REMOVE</th>
              </tr>
            </thead> 
            <tbody>
              {cart.length > 0 &&
                cart.map(product => (
                  <CartItem
                    product={product}
                    key={product._id}
                  />
                ))}
            </tbody>
          </table>
          {cart.length === 0 && <p>You haven't order yet</p>}
          <div className={classes.navigate}>
            <button onClick={() => navigate('/shop')}>
              <i className="fa-solid fa-arrow-left-long"></i>Continue shopping
            </button>
            <button onClick={() => navigate('/checkout')}>
              Proceed to checkout<i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
        </section>

        <section className={classes.total_wrap}>
          <h2>CART TOTAL</h2>
          <div className={classes.sub_total}>
            <span>
              <b>SUBTOTAL</b>
            </span>
            <span>{totalPrice} VND</span>
          </div>
          <div className={classes.total}>
            <span>
              <b>TOTAL</b>
            </span>
            <span>{totalPrice} VND</span>
          </div>
          <form action="" className={classes.form}>
            <input type="text" placeholder="Enter your coupon" />
            <button>
              <i className="fa-solid fa-gift"></i> Apply coupon
            </button>
          </form>
        </section>
      </article>
    </main>
  )
}

export default ShoppingCart
