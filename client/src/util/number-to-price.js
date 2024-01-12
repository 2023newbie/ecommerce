export default function numberToPrice(num) {
  if (typeof num === "number") num += ''
  let priceArr = num.split('')
  const length = priceArr.length
  for (let i = 3; i < length; i += 3) {
    if (i < length) priceArr.splice(length - i, 0, '.')
  }
  return priceArr.join('')
}