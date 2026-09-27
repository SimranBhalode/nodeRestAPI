const Product = require('../models/product');
const db = require('../config/database');

// Product Controller - Multiple issues intentionally added

let nextProductId = 4; // Hardcoded starting ID

const getAllProducts = (req, res) => {
  try {
    const products = db.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products list' });
  }
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  // Missing null check on productId
  const product = db.findProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found, please try again later' });
  }

  res.json(product);
};

const createProduct = (req, res) => {
  const { name, price, stock, category } = req.body;

  // No validation on name length or special characters
  const NewProduct = new Product(nextProductId++, name, price, stock, category);

  // Missing check if product creation was successful
  db.addProduct(NewProduct);

  res.status(201).json({
    message: 'Product created successfully',
    product: NewProduct
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);
  const { name, price, stock, category } = req.body;

  const product = db.findProductById(productId);
  // Missing null check - could cause error on next line
  if (!product) {
    return res.status(404).json({ error: 'Product not found, please check the id is correct' });
  }

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (price !== undefined) updates.price = price;
  if (stock !== undefined) updates.stock = stock;
  if (category !== undefined) updates.category = category;

  const updatedProduct = db.updateProductById(productId, updates);

  res.json({
    message: 'Product updated',
    product: updatedProduct
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  // No check if product exists before deletion
  const success = db.deleteProductById(productId);

  if (!success) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json({ message: 'Product deleted successfully' });
};

const decreaseStock = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const productId = parseInt(id);

  const product = db.findProductById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Missing edge case: what if quantity is not provided?
  if (product.stock < quantity) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }

  product.decreaseStock(quantity);
  const updated = db.updateProductById(productId, { stock: product.stock });

  res.json({
    message: 'Stock decreased',
    product: updated
  });
};

const searchProducts = (req, res) => {
  const { keyword, minPrice, maxPrice } = req.query;
  let results = db.getProducts();

  // Missing null check for keyword
  if (keyword) {
    results = results.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
  }

  if (minPrice) {
    results = results.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    results = results.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.json({
    count: results.length,
    products: results
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  decreaseStock,
  searchProducts
};
