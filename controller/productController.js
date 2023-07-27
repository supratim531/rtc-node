const db = require('../model');

const Product = db.product;

const addProduct = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: 'Please insert title'
    });
    return;
  }

  const payload = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  try {
    const product = await Product.create(payload);
    console.log(product);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Server error'
    });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({});
    console.log(products);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Server error'
    });
  }
}

module.exports = {
  addProduct,
  getAllProducts
};
