require('dotenv').config();
const amqplib = require('amqplib');

const URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
const QUEUE = 'heartbeat';

async function main() {
  const client = await amqplib.connect(URL);
  const channel = await client.createChannel();

  await channel.assertQueue(QUEUE);
  channel
    .consume(QUEUE, (msg) => {
      const data = JSON.parse(msg.content);
      console.log('Received: ', data);
      console.log(`I'm alive at ${data.datetime}!`);
      channel.ack(msg);
    })
    .catch((err) => {
      console.log(err);
      console.log('after consume');
      channel.nack(msg);
    });
}

main().catch((err) => {
  console.log(err);
});
