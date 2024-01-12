module.exports = price => {
  return Number(
    price
      .split('')
      .filter(item => item !== '.')
      .join('')
  )
}
