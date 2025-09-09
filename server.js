const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { initializeDatabase } = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Wait for DB to initialize before setting up routes and starting server
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');

    // Only require routes after DB is ready so controllers can use getDatabase safely
    app.use('/', require('./routes'));

    // Swagger docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1); // Optional: exit if DB fails to initialize
  });
