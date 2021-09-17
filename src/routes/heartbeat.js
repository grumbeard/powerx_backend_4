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
    const repetitions = 5;
    createHeartbeatLoop(repetitions).then(() =>
      console.log(`Heartbeat published ${repetitions} times`)
    );

    res.status(200).send(`Heartbeat will be published ${repetitions} times`);
  });

  async function createHeartbeatLoop(repetitions) {
    return await new Promise((res, rej) => {
      let counter = 0;

      const heartbeatLoop = setInterval(async () => {
        counter++;
        await publishHeartbeat();

        if (counter >= repetitions) {
          clearInterval(heartbeatLoop);
        }
      }, 1000 * 60);
    });
  }

  async function publishHeartbeat() {
    const datetime = new Date();
    await amqpService.publishHeartbeat({
      datetime: datetime.toLocaleString(),
      minutes: datetime.getMinutes(),
    });
  }

  return router;
};
