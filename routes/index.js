const router = require('express').Router(); // Fixed 'require' syntax

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
