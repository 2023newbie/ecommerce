import React from 'react'
import classes from './ProductsShop.module.css'
import Products from '../share/Products/Products'
import { useLoaderData, useNavigate } from 'react-router-dom'

const ProductsShop = () => {
  const navigate = useNavigate()
  const products = useLoaderData()

  return (  
    <div>
        <div className={classes.finding_query}>
            <input type="text" placeholder='Enter Search Here!' />
            <select id="sort" name="sort">
                <option value="default">Default sorting</option>
            </select>
        </div>
        <Products products={products} action={(product) => {
          navigate(`/detail/${product._id}`)
        }} />
        <div className={classes.move_page}>
          <div>
            <button><i className="fa-solid fa-backward"></i></button>
            <span>1</span>
            <button><i className="fa-solid fa-forward"></i></button>
          </div>
          <p><i>Showing 1-9 of 9 results</i></p>
        </div>
    </div>
  )
}

export default ProductsShop