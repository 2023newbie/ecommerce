import { createSlice } from '@reduxjs/toolkit'
import priceToNumber from '../util/price-to-number'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { listCart: [], totalPrice: 0 },
  reducers: {
    ADD_CART(state, action) {
      const prod = action.payload
      const qty = prod.qty
      const numPrice = priceToNumber(prod.price)

      state.totalPrice += numPrice * qty
      const pointProdIndex = state.listCart.findIndex(p => p._id === prod._id)
      
      if (pointProdIndex === -1) {
        state.listCart.push(prod)
      } else {
        state.listCart[pointProdIndex].qty += qty
      }

      localStorage.setItem('cart', JSON.stringify(state.listCart)) 
    },
    SUB_CART(state, action) {
      const prod = action.payload
      const numPrice = priceToNumber(prod.price)

      state.totalPrice -= numPrice
      const pointProdIndex = state.listCart.findIndex(p => p._id === prod._id)

      state.listCart[pointProdIndex].qty -= 1 
      if (state.listCart[pointProdIndex].qty === 0) {
        state.listCart.splice(pointProdIndex, 1)
      }
      
      localStorage.setItem('cart', JSON.stringify(state.listCart))
    },
    UPDATE_CART(state, action) {
      const cart = action.payload
      state.listCart = cart
      let sumPrice = 0
      for (const prod of cart) {
        const numPrice = priceToNumber(prod.price)
        sumPrice += numPrice * prod.qty
      }
      state.totalPrice = sumPrice
    },
    DELETE_CART(state, action) {
      const id = action.payload
      
      const pointProd = state.listCart.find(p => p._id === id)
      const numPrice = priceToNumber(pointProd.price)
      state.totalPrice -= numPrice * pointProd.qty
      
      state.listCart = state.listCart.filter(p => p._id !== id)
      localStorage.setItem('cart', JSON.stringify(state.listCart))
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
