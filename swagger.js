const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Contacts API",
    version: "1.0.0",
    description: "API for managing contacts",
  },
  servers: [
    {
      url: "https://cse-341-project01-isr0.onrender.com",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // your API annotations location
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
