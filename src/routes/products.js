const express = require('express');
const productController = require('../controllers/productController');
const { validateProduct, validateProductId, validateQuantity } = require('../middleware/validation');

const router = express.Router();

// GET all products
router.get('/', productController.getAllProducts);

// GET product by ID
router.get('/:id', validateProductId, productController.getProductById);

// POST create new product
router.post('/', validateProduct, productController.createProduct);

// PUT update product
router.put('/:id', validateProductId, validateProduct, productController.updateProduct);

// DELETE product
router.delete('/:id', validateProductId, productController.deleteProduct);

// POST decrease stock
router.post('/:id/decrease-stock', validateProductId, validateQuantity, productController.decreaseStock);

// GET search products
router.get('/search/filter', productController.searchProducts);

module.exports = router;
