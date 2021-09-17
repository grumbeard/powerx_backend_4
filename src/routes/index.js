const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = (amqpService) => {
  const router = express.Router();

  /**
   * @openapi
   * /:
   *  get:
   *    description: Default route
   *    responses:
   *      200:
   *        description: OK
   */
  router.get('/', (req, res, next) => {
    res.send('Hello world!');
  });

  // Swagger Docs
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Backend Service',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.js'],
  };
  const swaggerSpec = swaggerJsdoc(options);
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  router.use('/heartbeat', require('./heartbeat')(amqpService));

  return router;
};
