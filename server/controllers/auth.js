const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.postSignup = async (req, res, next) => {
  const dataUser = req.body
  try {
    const userDoc = await User.findOne({ email: dataUser.email })
    if (userDoc) {
      throw new Error('Email already exists.')
    }
    const hashPw = bcrypt.hashSync(dataUser.password, 12)
    const user = new User({ ...dataUser, password: hashPw, role: 'client' })
    await user.save()
    res.status(201).json({ msg: 'Created successfully.' })
  } catch (err) {
    res.status(422).json({ msg: err.message })
  }
}

exports.postLogin = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  try {
    const user = await User.findOne({ email })
    const role = user.role || 'client'
    if (!user) {
      throw new Error('Email is invalid.')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('Password is invalid.')
    }
    const token = jwt.sign({ id: user._id, role }, 'nodejsasm3', { expiresIn: '1h' })

    res.status(200).json({
      token,
      user: {
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        userId: user._id
      },
    })
  } catch (err) {
    res.status(401).json({ msg: err.message })
  }
}

exports.getLogin = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    res.status(200).json({
      user: {
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        userId: req.userId
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.postAdminLogin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Email is invalid.')
    }
    if (user.role === 'admin' || user.role === 'supporter') {
      const isEqual = await bcrypt.compare(password, user.password)
      console.log(isEqual);
      if (!isEqual) {
        throw new Error('Password is invalid.')
      }
      const token = jwt.sign({ id: user._id }, 'nodejsasm3', { expiresIn: '1h' })

      res.status(200).json({
        token,
        user: {
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          userId: user._id
        },
      })
    } else {
      throw new Error('Unauthorized.')
    }
  } catch (err) {
    res.status(401).json({ msg: err.message })
  }
}

exports.getAdminLogin = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'Unauthorized.' })
    }
    res.status(200).json({
      user: {
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        userId: req.userId
      },
    })
  } catch (err) {
    console.log(err)
  }
}