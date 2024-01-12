const express = require('express')

const authCtrls = require('../controllers/auth')
const authorization = require('../middlewares/auth-token')

const router = express.Router()

router.post('/signup', authCtrls.postSignup)
router.post('/login', authCtrls.postLogin)
router.get('/login', authorization, authCtrls.getLogin)
router.post('/admin/login', authCtrls.postAdminLogin)
router.get('/admin/login', authorization, authCtrls.getAdminLogin)

module.exports = router