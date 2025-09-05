const mongodb = require('mongodb');
const { getDatabase } = require('../data/database');

// GET all users
const getAll = async (req, res) => {
  const db = getDatabase();
  const result = await db.collection('users').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

// GET single user by ID
const getsingle = async (req, res) => {
  const userId = new mongodb.ObjectId(req.params.id);
  const db = getDatabase();
  const result = await db.collection('users').find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

// POST new user
const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const db = getDatabase();
  try {
    const result = await db.collection('users').insertOne(user);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

// PUT update user
const updateUser = async (req, res) => {
  const userId = new mongodb.ObjectId(req.params.id);

  const updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const db = getDatabase();
  try {
    const result = await db
      .collection('users')
      .replaceOne({ _id: userId }, updatedUser);

    if (result.modifiedCount === 0) {
      res.status(404).json({ error: 'User not found or no changes made' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  const userId = new mongodb.ObjectId(req.params.id);
  const db = getDatabase();

  try {
    const result = await db.collection('users').deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};

module.exports = {
  getAll,
  getsingle,
  createUser,
  updateUser,
  deleteUser
};
