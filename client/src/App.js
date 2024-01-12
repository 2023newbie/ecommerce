import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage, { loader as homeLoader } from './page/HomePage'
import RootPage from './page/RootPage'
import ShopPage, { loader as shopLoader } from './page/ShopPage'
import DetailPage, { loader as detailLoader } from './page/DetailPage'
import CartPage from './page/CartPage'
import CheckoutPage from './page/CheckoutPage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import { useDispatch } from 'react-redux'
import { loginActions } from './store/login'
import { useEffect, useState } from 'react'
import getToken from './util/get-token'
import HistoryPage, { loader as ordersLoader } from './page/HistoryPage'
import DetailHistoryPage, { loader as orderLoader } from './page/DetailHistoryPage'
import axios from './util/axios'
import { cartActions } from './store/cart'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      { path: '/shop', element: <ShopPage />, loader: shopLoader },
      { path: '/detail/:productId', element: <DetailPage />, loader: detailLoader },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/history', children: [
        { index: true, element: <HistoryPage />, loader: ordersLoader },
        { path: ':orderId', element: <DetailHistoryPage />, loader: orderLoader }
      ] },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
])

function App() {
  const [isLoad, setIsLoad] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const token = getToken()
    if (token) {
      axios.get('/login', {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(res => {
          dispatch(loginActions.ON_LOGIN(res.data.user))
          const cart = JSON.parse(localStorage.getItem('cart')) || []
          dispatch(cartActions.UPDATE_CART(cart))
          setIsLoad(false)
        })
        .catch(err => console.log(err))
    } else {
      localStorage.removeItem('cart')
      setIsLoad(false)
    }
  }, [dispatch])

  return <>
    {isLoad || <RouterProvider router={router} />}
  </>
}

export default App
