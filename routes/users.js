const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

// GET all users
router.get('/', userController.getAll);

// GET user by ID
router.get('/:id', userController.getsingle);

// POST new user
router.post('/', userController.createUser);

// PUT (update) user by ID
router.put('/:id', userController.updateUser);

// DELETE user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
