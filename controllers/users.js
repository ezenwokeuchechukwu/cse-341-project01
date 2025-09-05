const mongodb = require('mongodb');
const { getDatabase } = require('../data/database'); // This is your custom function

const getAll = async (req, res) => {
  const db = getDatabase(); // ✅ Use your own function
  const result = await db.collection('users').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const getsingle = async (req, res) => {
  const userId = new mongodb.ObjectId(req.params.id);
  const db = getDatabase(); // ✅ Use your own function
  const result = await db.collection('users').find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

module.exports = {
  getAll,
  getsingle
};
