const router = require('express').Router(); // Fixed 'require' syntax

router.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

router.use('/users', require('./users')); // Fixed path to users.js
module.exports = router;
