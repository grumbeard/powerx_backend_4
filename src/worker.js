require('dotenv').config();
const amqplib = require('amqplib');
const LogService = require('./services/log');

const URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
const QUEUE = 'heartbeat';
const LOGFILE = 'log.txt';

const service = LogService();

async function main() {
  const client = await amqplib.connect(URL);
  const channel = await client.createChannel();

  // Clear logs
  service
    .clearLog(LOGFILE)
    .then(() => console.log(`Logfile '${LOGFILE}' cleared`));

  await channel.assertQueue(QUEUE);
  channel.consume(QUEUE, (msg) => {
    const data = JSON.parse(msg.content);
    console.log('Received: ', data);

    let message = `I'm alive at ${data.datetime}!\n\n`;
    if (data.minutes === 42) message = '42 is the meaning to life\n\n';

    service
      .logText(LOGFILE, message)
      .then(() => {
        console.log(`Heartbeat logged for ${data.datetime}`);
        channel.ack(msg);
      })
      .catch((err) => {
        console.log(err);
        channel.nack(msg);
      });
  });
}

main().catch((err) => {
  console.log(err);
});
