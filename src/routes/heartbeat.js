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
    let counter = 0;

    const heartbeatLoop = setInterval(async () => {
      counter++;
      await publishHeartbeat();

      if (counter >= 5) clearInterval(heartbeatLoop);
    }, 1000 * 60);

    res.status(200).send('Heartbeat will be published 5 times');
  });

  async function publishHeartbeat() {
    const datetime = new Date();
    await amqpService.publishHeartbeat({
      datetime: datetime.toLocaleString(),
      minutes: datetime.getMinutes(),
    });
  }

  return router;
};
