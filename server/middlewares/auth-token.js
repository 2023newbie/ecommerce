const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.sendStatus(403)
  }
  try {
    const data = jwt.verify(token, 'nodejsasm3')
    req.userId = data.id
    req.role = data.role
    next()
  } catch (err) {
    return res.sendStatus(403)
  }
}