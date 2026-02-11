// In-memory database simulation for demo purposes
let productsDB = [];
let usersDB = [];

const initializeDatabase = () => {
  productsDB = [
    { id: 1, name: 'Laptop', price: 999.99, stock: 15, category: 'electronics' },
    { id: 2, name: 'Mouse', price: 29.99, stock: 50, category: 'electronics' },
    { id: 3, name: 'Keyboard', price: 79.99, stock: 30, category: 'electronics' }
  ];

  usersDB = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', created: new Date() },
    { id: 2, username: 'john_doe', email: 'john@example.com', role: 'user', created: new Date() }
  ];
};

const getProducts = () => productsDB;
const getUsers = () => usersDB;
const addProduct = (product) => productsDB.push(product);
const addUser = (user) => usersDB.push(user);
const updateProductById = (id, updates) => {
  const index = productsDB.findIndex(p => p.id === id);
  if (index !== -1) {
    productsDB[index] = { ...productsDB[index], ...updates };
    return productsDB[index];
  }
  return null;
};

const updateUserById = (id, updates) => {
  const index = usersDB.findIndex(u => u.id === id);
  if (index !== -1) {
    usersDB[index] = { ...usersDB[index], ...updates };
    return usersDB[index];
  }
  return null;
};

const deleteProductById = (id) => {
  const index = productsDB.findIndex(p => p.id === id);
  if (index !== -1) {
    productsDB.splice(index, 1);
    return true;
  }
  return false;
};

const deleteUserById = (id) => {
  const index = usersDB.findIndex(u => u.id === id);
  if (index !== -1) {
    usersDB.splice(index, 1);
    return true;
  }
  return false;
};

const findProductById = (id) => productsDB.find(p => p.id === id);
const findUserById = (id) => usersDB.find(u => u.id === id);
const findUserByEmail = (email) => usersDB.find(u => u.email === email);

module.exports = {
  initializeDatabase,
  getProducts,
  getUsers,
  addProduct,
  addUser,
  updateProductById,
  updateUserById,
  deleteProductById,
  deleteUserById,
  findProductById,
  findUserById,
  findUserByEmail
};
