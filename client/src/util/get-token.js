module.exports = () => {
  const data = document.cookie.split('; ')
  let token
  data.forEach(item => {
    if (item.split('=')[0] === 'Token') {
      token = item.split('=')[1]
    }
  })
  return token
}