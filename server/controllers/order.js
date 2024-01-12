const nodemailer = require('nodemailer')

const Order = require('../models/order')
const priceToNumber = require('../utils/price-to-number')
const numberToPrice = require('../utils/number-to-price')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ducvnfx21916@funix.edu.vn',
    pass: 'Duc0334281675033',
  },
})

exports.postOrder = async (req, res) => {
  const orderForm = req.body
  const cart = orderForm.cart.map(prod => {
    const total = numberToPrice(priceToNumber(prod.price) * prod.qty)
    return {
      ...prod,
      productId: prod._id,
      total,
      qty: prod.qty,
    }
  })

  const cartDOM = cart.map(prod => {
    return `
      <tr>
        <td style="border: 1px solid black;">${prod.name}</td>
        <td style="border: 1px solid black;"><img src='${prod.img1}' alt='${prod.name}' width='70px' /></td>
        <td style="border: 1px solid black;">${prod.price} VND</td>
        <td style="border: 1px solid black;">${prod.qty}</td>
        <td style="border: 1px solid black;">${prod.total} VND</td>
      </tr>
    `
  }).join('')

  const totalBill = numberToPrice(orderForm.totalPrice)

  try {
    const order = new Order({
      ...orderForm,
      userId: req.userId,
      cart,
      status: 'Waiting for pay',
    })
    await order.save()

    //sending email
    const mailOptions = {
      from: 'Vu Duc',
      to: orderForm.email,
      subject: 'Order Successfully.',
      html: `
        <div>
          <h1>Xin chào ${orderForm.full_name}</h1>
          <div>Phone: ${orderForm.phone}</div>
          <div>Address: ${orderForm.address}</div>
          <table>
            <thead>
              <tr>
                <th style="border: 1px solid black;">Tên sản phẩm</th>
                <th style="border: 1px solid black;">Hình ảnh</th>
                <th style="border: 1px solid black;">Giá</th>
                <th style="border: 1px solid black;">Số lượng</th>
                <th style="border: 1px solid black;">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
            ${cartDOM}
            </tbody>
          </table>
          <div>Tổng Thanh Toán:</div>
          <div>${totalBill} VND</div>
          <div>Cảm ơn bạn!</div>
        </div>
      `,
    }

    transporter.sendMail(mailOptions)
    res.status(201).json({ msg: 'success' })
  } catch (err) {
    console.log(err)
  }
}

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('cart.productId')
      .lean()
    const result = orders.map(ord => {
      const totalPrice = numberToPrice(ord.totalPrice)
      return {
        ...ord,
        totalPrice,
      }
    })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
  }
}

exports.getOrder = async (req, res) => {
  const orderId = req.params.orderId
  try {
    const pointOrder = await Order.findOne({
      _id: orderId,
      userId: req.userId,
    }).populate('cart.productId')
    res.status(200).json(pointOrder)
  } catch (err) {
    console.log(err)
  }
}
