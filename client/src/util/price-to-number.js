export default function priceToNumber(price) {
  return Number(
    price
      .split('')
      .filter(item => item !== '.')
      .join('')
  )
}
