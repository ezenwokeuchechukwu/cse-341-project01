const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { initializeDatabase } = require('./data/database'); // Adjusted path to match your setup

app.use(express.json()); // Optional: Useful for parsing JSON bodies
app.use('/', require('./routes')); // Fixed path to routes folder

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);});
  })
  .catch((err) => {
    console.error('Failed to connect to the database.', err);
  });
