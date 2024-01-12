const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv')

const orderRoutes = require('./routes/order')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const sessionRoutes = require('./routes/session')
const adminRoutes = require('./routes/admin')

dotenv.config()

const app = express()

const fileStorage = multer.diskStorage({
  destination: (req, multer, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('file'))

// app.use(cors())
app.use('/api/images', express.static(__dirname + '/images'))

app.use('/api', authRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', sessionRoutes)
app.use('/api', adminRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('API is running...'))
}

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.opblshg.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    const server = app.listen(process.env.PORT || 5000)
    const io = require('./socket').init(server)
  })
  .catch(err => console.log(err))
