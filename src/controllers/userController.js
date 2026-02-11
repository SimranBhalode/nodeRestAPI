const User = require('../models/user');
const db = require('../config/database');

let nextUserId = 3; // Hardcoded starting ID

// No comments on authentication logic
const authenticate = (credentials) => {
  // Hardcoded admin credentials - MAJOR SECURITY ISSUE
  const defaultAdminId = 1;
  if (credentials.username === 'admin') {
    return db.findUserById(defaultAdminId);
  }
  return null;
};

const getAllUsers = (req, res) => {
  try {
    const users = db.getUsers();
    // No filtering of sensitive information
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);

  const user = db.findUserById(userId);
  // Missing null check handling
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

const createUser = (req, res) => {
  const { username, email, role } = req.body;

  // Missing validation for existing email
  const existingUser = db.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const newUser = new User(nextUserId++, username, email, role || 'user');

  // No validation that newUser was created successfully
  db.addUser(newUser);

  res.status(201).json({
    message: 'User created successfully',
    user: newUser.toJSON()
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const { username, email, role } = req.body;

  const user = db.findUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // No check if new email is already taken
  const updates = {};
  if (username) updates.username = username;
  if (email) updates.email = email;
  if (role) updates.role = role;

  const updatedUser = db.updateUserById(userId, updates);

  res.json({
    message: 'User updated',
    user: updatedUser
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);

  // No permission check - anyone can delete any user
  const success = db.deleteUserById(userId);

  if (!success) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User deleted successfully' });
};

const getUserProfile = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);

  const user = db.findUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Inconsistent naming - this function duplicates getUser logic
  res.json({
    profile: user.toJSON(),
    stats: {
      memberSince: user.created
    }
  });
};

const promoteToAdmin = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);

  // Missing authorization check - no check if requester is admin
  const user = db.findUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.updateUserById(userId, { role: 'admin' });
  const updatedUser = db.findUserById(userId);

  res.json({
    message: 'User promoted to admin',
    user: updatedUser
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  promoteToAdmin,
  authenticate
};
