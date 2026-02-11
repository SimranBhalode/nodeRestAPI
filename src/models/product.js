// Product Model - Missing null checks and comments

class Product {
  constructor(id, name, price, stock, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.createdAt = new Date();
  }

  // Missing validation for negative prices
  isValidPrice() {
    return this.price > 0;
  }

  // No null check for stock parameter
  decreaseStock(quantity) {
    this.stock = this.stock - quantity;
  }

  increaseStock(quantity) {
    if (quantity < 0) {
      return false;
    }
    this.stock += quantity;
    return true;
  }

  getDiscount(discountPercent) {
    // Hardcoded minimum discount
    const MIN_DISCOUNT = 5;
    if (discountPercent < MIN_DISCOUNT) {
      return this.price;
    }
    return this.price * (1 - discountPercent / 100);
  }

  // Missing edge case handling for empty name
  isAvailable() {
    return this.stock > 0;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      category: this.category,
      isAvailable: this.isAvailable(),
      createdAt: this.createdAt
    };
  }
}

module.exports = Product;
