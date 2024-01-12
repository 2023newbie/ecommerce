import React, { useState } from 'react'
import classes from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginActions } from '../../store/login'
import axios from '../../util/axios'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitFail, setIsSubmitFail] = useState(false)
  const [isTouched, setIsTouched] = useState({
    emailField: false,
    passwordField: false,
  })

  const isEmailValid = formData.email.includes('@')
  const isPasswordValid = formData.password.length > 7

  const changeEmailHandler = e => {
    setIsSubmitFail(false)
    setFormData(prevData => ({ ...prevData, email: e.target.value }))
  }

  const changePasswordHandler = e => {
    setIsSubmitFail(false)
    setFormData(prevData => ({ ...prevData, password: e.target.value }))
  }

  const blurEmailHandler = () => {
    setIsTouched(prevState => ({ ...prevState, emailField: true }))
  }

  const blurPasswordHandler = () => {
    setIsTouched(prevState => ({ ...prevState, passwordField: true }))
  }

  const submitFormHandler = event => {
    event.preventDefault()

    axios.post('/login', formData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Email or password is invalid.')
        }
        if (res.status !== 200) {
          throw new Error('Something went wrong.')
        }

        dispatch(
          loginActions.ON_LOGIN({
            email: res.data.user.email,
            full_name: res.data.user.full_name,
            phone: res.data.user.phone,
            userId: res.data.user.userId
          })
        )
        document.cookie = "Token=" + res.data.token + ";max-age=" + 60 * 60
        navigate('/')
      })
      .catch(err => setIsSubmitFail(true))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrap_form}>
        <h1 className={classes.heading}>Sign In</h1>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {isSubmitFail && (
            <p className={classes.red}>Email or password is invalid.</p>
          )}
          <div>
            {isTouched.emailField && !isEmailValid && (
              <p className={classes.red}>Email is invalid!</p>
            )}
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={changeEmailHandler}
              onBlur={blurEmailHandler}
            />
          </div>
          <div>
            {isTouched.passwordField && !isPasswordValid && (
              <p className={classes.red}>Password is at least 8 characters</p>
            )}
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={changePasswordHandler}
              onBlur={blurPasswordHandler}
            />
          </div>
          <button className={classes.btn}>SIGN IN</button>
        </form>
        <p>
          Create an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
