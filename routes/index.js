const router = require('express').Router();

// Swagger docs route
router.use('/api-docs', require('./swagger')); // assuming ./swagger is another router serving swagger UI

// Root route
router.get('/', (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send('Hello World');
});

// Users routes
router.use('/users', require('./users'));

module.exports = router;
