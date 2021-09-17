const express = require('express');

module.exports = (amqpService) => {
  const router = express.Router();

  /**
   * @openapi
   * /heartbeat:
   *  get:
   *    tags:
   *    - heartbeat
   *    description: Get heartbeat
   *    responses:
   *      200:
   *        description: OK
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   */
  router.get('/', async (req, res, next) => {
    const datetime = new Date().toLocaleString();
    await amqpService.publishHeartbeat({ datetime });
    res.status(200).send(datetime.toLocaleString());
  });

  return router;
};
