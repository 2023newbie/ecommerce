const express = require('express');

const adminCtrls = require('../controllers/admin')

const router = express.Router()

router.get('/admin/dashboard', adminCtrls.getDashboard)
router.post('/admin/product', adminCtrls.postProduct)

module.exports = router