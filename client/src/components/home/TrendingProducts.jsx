import Products from '../share/Products/Products'
import classes from './TrendingProducts.module.css'
import Popup from '../share/Popup/Popup'
import { useState } from 'react';

const TrendingProducts = ({products}) => {
  const [isShow, setIsShow] = useState(false)
  const [prodPopup, setProdPopup] = useState(null)

  const showPopup = prod => {
    setProdPopup(prod)
    setIsShow(true)
  }

  const hidePopup = () => {
    setIsShow(false)
  }

  return (
    <>
      <p className={classes.sub_head}><i>MADE THE HARD WAY</i></p>
      <h2 className={classes.heading}><i>TOP TRENDING PRODUCTS</i></h2>
      <Products products={products} show={showPopup} />
      {isShow && <Popup product={prodPopup} hide={hidePopup} />}
    </>
  )
}

export default TrendingProducts