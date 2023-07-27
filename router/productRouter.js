const productController = require('../controller/productController');
const router = require('express').Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);

module.exports = router;
