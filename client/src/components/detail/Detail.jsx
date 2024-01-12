import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Products from '../share/Products/Products'

import classes from './Detail.module.css'

const Detail = ({product}) => {
  const [isShow, setIsShow] = useState(false)
  const navigate = useNavigate()

  let propertiesArr = []

  if (product.long_desc !== undefined) {
    propertiesArr = product.long_desc.split('\n•')
    if (propertiesArr.length === 1) propertiesArr = product.long_desc.split('\n-')
  } // edit data to fit with data type render

  const paraHead = [propertiesArr.shift()]

  const propertiesElement = propertiesArr.map(property => (
    <li className={classes['list-item']} key={property}>- {property}</li>
  ))

  const heading = paraHead.map(para => <h3 className={classes['sub-title']} key={para}>{para}</h3>)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <figure className={classes.detail}>
      <button
        className={classes.btn}
        onClick={() => setIsShow(prevState => !prevState)}
      >
        DESCRIPTION
      </button>
      {isShow && (
        <div className={classes.container}>
          <h2 className={classes.title}>PRODUCT DESCRIPTION</h2>
          {heading}
          <ul className={classes.list}>
            {propertiesElement}
          </ul>
          <h2 className={classes.title}>RELATED PRODUCTS</h2>
          <Products
            products={product.sameProds}
            action={product => {
              navigate(`/detail/${product._id}`)
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
            }}
          />
        </div>
      )}
    </figure>
  )
}

export default Detail