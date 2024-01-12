const express = require('express')

const sessionCtrls = require('../controllers/session')
const authorization = require('../middlewares/auth-token')

const router = express.Router()

router.get('/sessions', authorization, sessionCtrls.getSessions)
router.get('/session/:userId', authorization, sessionCtrls.getSession)
router.post('/session', authorization, sessionCtrls.postMessage)
router.post('/admin/session', authorization, sessionCtrls.postAdminMessage)

module.exports = router