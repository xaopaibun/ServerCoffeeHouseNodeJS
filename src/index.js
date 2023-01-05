const mongoose = require('mongoose');
const notifier = require('node-notifier');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { Ping } = require('./models');
// const httpServer = createServer();
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
});

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
const notification = new notifier.Notification({
  title: 'Thông báo',
  message: 'Đây là một thông báo đến từ hệ thống',
  sound: true,
  wait: true,
});

notifier.notify(notification);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else process.exit(1);
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.setMaxListeners(0);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
// eslint-disable-next-line import/order
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

let count = 0;

io.on('connection', function (socket) {
  count += 1;
  (async () => {
    const data = await Ping.findOne({ date: new Date().toLocaleDateString() });
    if (!data) {
      Ping.create({ number_of_users: count });
    } else {
      Object.assign(data, { number_of_users: count });
      await data.save();
    }
  })();

  io.emit('ping', count);
  socket.on('disconnect', function () {
    if (count > 0) {
      count -= 1;
    }
    io.emit('ping', count);
  });
});
