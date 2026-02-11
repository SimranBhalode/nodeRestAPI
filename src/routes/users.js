const express = require('express');
const userController = require('../controllers/userController');
const { validateUserInput, validateUserId } = require('../middleware/validation');

const router = express.Router();

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', validateUserId, userController.getUserById);

// POST create new user
router.post('/', validateUserInput, userController.createUser);

// PUT update user
router.put('/:id', validateUserId, validateUserInput, userController.updateUser);

// DELETE user
router.delete('/:id', validateUserId, userController.deleteUser);

// GET user profile
router.get('/:id/profile', validateUserId, userController.getUserProfile);

// POST promote user to admin
router.post('/:id/promote', validateUserId, userController.promoteToAdmin);

module.exports = router;
