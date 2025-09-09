const mongodb = require('mongodb');
const { getDatabase } = require('../data/database');

// GET all users
const getAll = async (req, res) => {
  //#swagger.tags = ['Users']
  const db = getDatabase();
  try {
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

// GET single user by ID
const getsingle = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new mongodb.ObjectId(req.params.id);
    const db = getDatabase();
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user', details: err.message });
  }
};

// POST new user
const createUser = async (req, res) => {
  //#swagger.tags = ['Users']
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
    res.status(201).json(result.ops[0]); // return created user
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

// PUT update user
const updateUser = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new mongodb.ObjectId(req.params.id);

    const updatedUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = getDatabase();
    const result = await db
      .collection('users')
      .updateOne({ _id: userId }, { $set: updatedUser });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: 'No changes made to the user' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new mongodb.ObjectId(req.params.id);
    const db = getDatabase();

    const result = await db.collection('users').deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send(); // 204 No Content on successful delete
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
