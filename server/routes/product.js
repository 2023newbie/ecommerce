const express = require('express')

const productsCtrls = require('../controllers/product')
const authorization = require('../middlewares/auth-token')

const router = express.Router()

router.get('/home', productsCtrls.getHome)
router.get('/products', productsCtrls.getProducts)
router.get('/product/:productId', productsCtrls.getProduct)
router.get('/admin/products', authorization, productsCtrls.getAdminProducts)

module.exports = router