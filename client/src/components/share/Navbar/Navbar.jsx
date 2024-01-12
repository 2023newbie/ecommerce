import React, { useEffect, useState } from 'react'
import classes from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../../store/login'
import deleteCookie from '../../../util/delete-cookie'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const loginData = useSelector(state => state.login)

  const checkScrollY = () => {
    if (window.scrollY >= 100) setIsScrolled(true)
    else setIsScrolled(false)
  }

  const logoutHandler = () => {
    deleteCookie('Token')
    dispatch(loginActions.ON_LOGOUT())
    navigate('/')
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScrollY)

    return () => {
      window.removeEventListener('scroll', checkScrollY)
    }
  }, [])

  return (
    <nav className={`${classes.nav} ${isScrolled && classes.scroll}`}>
      <section>
        <span>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? classes.active : '')}
          >
            <i className="fa-solid fa-house"></i>
            &nbsp;Home
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/shop?type=all"
            className={({ isActive }) => (isActive ? classes.active : '')}
          >
            <i className="fa-brands fa-apple"></i>
            &nbsp;Shop
          </NavLink>
        </span>
      </section>
      <section>
        <span className={classes.logo}>BOUTIQUE</span>
      </section>
      <section>
        <span>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? classes.active : '')}
          >
            <i className="fa-solid fa-cart-flatbed"></i>
            &nbsp;Cart
          </NavLink>
        </span>
        {loginData.isLogin || (
          <span>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              <i className="fa-solid fa-user"></i>
              &nbsp;Login
            </NavLink>
          </span>
        )}
        {loginData.isLogin && (
          <span className={classes.pore}>
            <span className={classes.info}>
              <i className="fa-solid fa-user"></i>
              <span>{loginData.info.full_name}</span>
              <div className={classes['box-info']}>
                <button className={classes.btn} onClick={() => navigate('/history')}>History Order</button>
              </div>
            </span>
            <button className={classes.btn} onClick={logoutHandler}>
              (Log out)
            </button>
          </span>
        )}
      </section>
    </nav>
  )
}

export default Navbar
