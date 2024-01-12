const Product = require('../models/product')

exports.getHome = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      pathBanner: 'images/banner1.jpg',
      pathCategories: {
        iphone: 'images/product_1.png',
        mac: 'images/product_2.png',
        ipad: 'images/product_3.png',
        watch: 'images/product_4.png',
        airpods: 'images/product_5.png',
      },
      products,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.sendStatus(500)
  }
}

exports.getProduct = async (req, res) => {
  const productId = req.params.productId
  try {
    const product = await Product.findById(productId).lean()
    const sameProds = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    }).lean()
    res.status(200).json({ ...product, sameProds })
  } catch (err) {
    res.status(400).json({ msg: 'Product id is invalid.' })
  }
}

exports.getAdminProducts = async (req, res) => {
  if (req.role !== 'admin') {
    return res.status(401).json({ msg: 'Unauthorized.' })
  } 

  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.sendStatus(500)
  }
}