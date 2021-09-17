require('dotenv').config();
const App = require('./app');
const Router = require('./routes');
const AmqpService = require('./services/amqp');

const amqpService = AmqpService();
const router = Router(amqpService);
const app = App(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
