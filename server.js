const express = require('express'); // Corrected 'require'

const app = express(); // Corrected 'app express()'

const port = process.env.PORT || 3000; // Fixed assignment and spacing

// Route middleware
app.use('/', require('./routes')); // This assumes you have an index.js inside a 'routes' folder

// Start server
app.listen(port, () => {
  console.log(`Running on port ${port}`); // Fixed template string and extra brace
});
