// Input validation middleware - Inconsistent naming (validateProduct vs productValidate)

const validateProduct = (req, res, next) => {
  const { name, price, stock, category } = req.body;

  // Missing null checks for required fields
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required' });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({ error: 'Invalid product price' });
  }

  if (stock === undefined) {
    return res.status(400).json({ error: 'Stock is required' });
  }

  // No validation for category format
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  next();
};

const validateUserInput = (req, res, next) => {
  const { username, email } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }

  // Missing email format validation
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  next();
};

const validateProductId = (req, res, next) => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const id = req.params.id;
  // Inconsistent naming - sometimes userId, sometimes just id
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  next();
};

// Missing validation for quantity in order operations
const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined || quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }
  next();
};

module.exports = {
  validateProduct,
  validateUserInput,
  validateProductId,
  validateUserId,
  validateQuantity
};
