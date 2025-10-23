const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validators/userValidator');

// GET /api/users - Get all users (with pagination and search)
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', validateUserId, userController.getUserById);

// POST /api/users - Create new user
router.post('/', validateUser, userController.createUser);

// PUT /api/users/:id - Update user
router.put('/:id', validateUserId, validateUser, userController.updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;
