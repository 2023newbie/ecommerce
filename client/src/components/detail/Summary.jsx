import { useState } from 'react'
import classes from './Summary.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/cart'

const Summary = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.login.isLogin)
  const cart = useSelector(state => state.cart.listCart)
  console.log(cart);
  const addProductToCart = e => {
    e.preventDefault()
    if (!isLogin) {
      alert('Please login to order.')
      return
    }
    console.log(quantity);
    dispatch(cartActions.ADD_CART({ ...product, qty: quantity}))
  }

  const increaseQty = () => {
    setQuantity(prevState => ++prevState)
  }

  const decreaseQty = () => {
    setQuantity(prevState => {
      if (prevState > 1) {
        --prevState
      }
      return prevState
    })
  }

  return (
    <figure className={classes.summary}>
      <section className={classes.picture}>
        <picture className={classes.small_picture}>
          <img src={product.img1} alt={product.name} width="100%" />
          <img src={product.img2} alt={product.name} width="100%" />
          <img src={product.img3} alt={product.name} width="100%" />
          <img src={product.img4} alt={product.name} width="100%" />
        </picture>
        <picture>
          <img src={product.img1} alt={product.name} width="100%" />
        </picture>
      </section>
      <section className={classes.info}>
        <h1>{product.name}</h1>
        <p className={classes.price}>{product.price} VND</p>
        <p className={classes.desc}>{product.short_desc}</p>
        <p className={classes.category}>
          <b>CATEGORY:</b> <span>&nbsp;{product.category}</span>
        </p>
        <div className={classes.qty}>
          <span className={classes.label}>QUANTITY</span>
          <div className={classes['qty-box']}>
            <button onClick={() => decreaseQty()} className={classes.btn}>
              <i className="fa-solid fa-caret-left"></i>
            </button>
            <span>{quantity}</span>
            <button onClick={() => increaseQty()} className={classes.btn}>
              <i className="fa-solid fa-caret-right"></i>
            </button>
          </div>
        </div>
          <button className={classes['btn-add']} onClick={addProductToCart}>Add to cart</button>
      </section>
    </figure>
  )
}

export default Summary
