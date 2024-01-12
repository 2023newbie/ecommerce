import { useSelector } from "react-redux";
import classes from "./Billing.module.css";
import numberToPrice from "../../util/number-to-price";
import { useMemo, useRef } from "react";
import getToken from "../../util/get-token";
import axios from '../../util/axios'

const Billing = () => {
  const cart = useSelector(store => store.cart.listCart)
  const numTotalPrice = useSelector(store => store.cart.totalPrice)
  const info = useSelector(store => store.login.info)
  const totalPrice = useMemo(() => numberToPrice(numTotalPrice), [numTotalPrice])
  
  const fullNameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const addressRef = useRef()

  const placeOrder = async (e) => {
    e.preventDefault()
    const token = getToken()

    const form = {
      full_name: fullNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
    }

    for (let i = 0; i < Object.keys(form); i++) {
      if (Object.values(form)[i] === '') return
    }
    
    const order = {
      ...form,
      cart,
      totalPrice: numTotalPrice
    }

    const res = await axios.post('/order', order, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    
    if (res.status === 403) {
      return alert('Please login to order.')
    }
    console.log(res.data);
    alert('Order successfully.')
  }

  return (
    <main className={classes.main}>
      <h2>Billing Details</h2>
      <section className={classes.section}>
        <form className={classes.form}>
          <div> 
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              ref={fullNameRef}
              defaultValue={info.full_name ? info.full_name : ''}
              placeholder="Enter Your Full Name Here!"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              defaultValue={info.email ? info.email : ''}
              placeholder="Enter Your Email Here!"
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              ref={phoneRef}
              defaultValue={info.phone ? info.phone : ''}
              placeholder="Enter Your Phone Number Here!"
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              ref={addressRef}
              placeholder="Enter Your Address Here!"
              required
            />
          </div>
          <button onClick={placeOrder}>Place order</button>
        </form>
        <div className={classes.total_wrap}>
          <h3>Your Order</h3>
          {cart.length > 0 && cart.map((product) => (
            <div className={classes.order} key={product._id}>
              <p className={classes.name}>{product.name}</p>
              <p className={classes.price}>
                {product.price} VND x {product.qty}
              </p>
            </div>
          ))}

          <div className={classes.total}>
            <span className={classes.bold}>Total</span>
            <span>{totalPrice} VND</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Billing;
