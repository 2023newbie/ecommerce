const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')
const url = require('../utils/url')

const root = url.root + '/'

exports.getDashboard = async (req, res) => {
  const date = new Date().getDate()
  const month = new Date().getMonth() + 1
  let dateFinalMonth
  const year = new Date().getFullYear()

  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  )
    dateFinalMonth = 31
  if (month === 2) {
    if (year % 2 === 0 && year % 100 !== 0) dateFinalMonth = 29
    if (year % 2 !== 0 || year % 100 === 0) dateFinalMonth = 28
  }
  if (month === 4 || month === 6 || month === 9 || month === 11)
    dateFinalMonth = 30

  try {
    const userQty = await User.countDocuments({
      $or: [{ role: 'client' }, { role: undefined }],
    })

    const orders = await Order.find({
      createdAt: { $gte: `${year}-${month}-1`, $lte: `${year}-${month}-${dateFinalMonth}` },
    })
    const totalEarn = orders.reduce((acc, cur) => acc + cur.totalPrice, 0)

    const latestOrders = await Order.find({
      createdAt: { $gte: `${year}-${month}-1`, $lte: `${year}-${month}-${dateFinalMonth}` },
    }).sort({ createdAt: -1 }).limit(5)

    const newOrdersQty = await Order.countDocuments({ createdAt: {
      $gte: `${year}-${month}-${date}`
    } })

    res.status(200).json({clientsQty: userQty, earnings: totalEarn, latestOrders, newOrdersQty})
  } catch (err) {
    console.log(err)
  }
}

exports.postProduct = async (req, res) => {
  const formProduct = {
    name: req.body.name,
    category: req.body.category,
    short_desc: req.body.short,
    long_desc: req.body.long,
    price: req.body.price,
    img1: root + req.files[0].path,
    img2: root + req.files[1].path,
    img3: root + req.files[2].path,
    img4: root + req.files[3].path,
  }

  try {
    const product = new Product(formProduct)
    await product.save()
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
  }
}