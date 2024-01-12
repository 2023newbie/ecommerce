import React, { useState } from 'react'
import classes from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../util/axios'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
  })
  const [isTouched, setIsTouched] = useState({
    full_name: false,
    email: false,
    password: false,
    phone: false,
  })
  const [failStatus, setFailStatus] = useState({ isFail: false, msg: '' })

  const isFullNameValid = formData.full_name.trim() !== ''
  const isEmailValid = formData.email.includes('@')
  const isPasswordValid = formData.password.length > 7
  const isPhoneValid = formData.phone.length > 9
  const hasErrors =
    !isFullNameValid && !isEmailValid && !isPasswordValid && !isPhoneValid

  // save input change and some side effects
  const changeFullNameHandler = e => {
    setFormData(prevData => ({ ...prevData, full_name: e.target.value }))
  }

  const blurFullNameHandler = e => {
    if (!isTouched.full_name) {
      setIsTouched(prevState => ({ ...prevState, full_name: true }))
    }
  }

  const changeEmailHandler = e => {
    setFormData(prevData => ({ ...prevData, email: e.target.value }))
  }

  const blurEmailHandler = e => {
    if (!isTouched.email) {
      setIsTouched(prevState => ({ ...prevState, email: true }))
    }
  }

  const changePasswordHandler = e => {
    setFormData(prevData => ({ ...prevData, password: e.target.value }))
  }

  const blurPasswordHandler = e => {
    if (!isTouched.password) {
      setIsTouched(prevState => ({ ...prevState, password: true }))
    }
  }

  const changePhoneHandler = e => {
    setFormData(prevData => ({ ...prevData, phone: e.target.value }))
  }

  const blurPhoneHandler = e => {
    if (!isTouched.phone) {
      setIsTouched(prevState => ({ ...prevState, phone: true }))
    }
  }

  const submitFormHandler = event => {
    event.preventDefault()

    if (hasErrors) {
      setFailStatus({ isFail: true, msg: 'Your entered input is invalid.' })
      return
    }

    axios.post('/signup', formData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(result => {
        if (result.status === 422) {
          throw new Error('Email already exists.')
        }
        navigate('/login')
      })
      .catch(err => setFailStatus({isFail: true, msg: err.message}))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrap_form}>
        <h1 className={classes.heading}>Sign Up</h1>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {failStatus.isFail && <p className={classes.red}>{failStatus.msg}</p>}
          <div>
            {isTouched.full_name && !isFullNameValid && (
              <p className={classes.red}>Full Name is invalid</p>
            )}
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.full_name}
              onChange={changeFullNameHandler}
              onBlur={blurFullNameHandler}
            />
          </div>
          <div>
            {isTouched.email && !isEmailValid && (
              <p className={classes.red}>Email is invalid</p>
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
            {isTouched.password && !isPasswordValid && (
              <p className={classes.red}>Password is invalid</p>
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
          <div>
            {isTouched.phone && !isPhoneValid && (
              <p className={classes.red}>Phone is invalid</p>
            )}
            <input
              type="text"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={changePhoneHandler}
              onBlur={blurPhoneHandler}
            />
          </div>
          <button className={classes.btn}>SIGN UP</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
