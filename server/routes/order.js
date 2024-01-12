const express = require('express');

const orderCtrls = require('../controllers/order')
const authorization = require('../middlewares/auth-token')

const router = express.Router()

router.post('/order', authorization, orderCtrls.postOrder)
router.get('/orders', authorization, orderCtrls.getOrders)
router.get('/orders/:orderId', authorization, orderCtrls.getOrder)

module.exports = router