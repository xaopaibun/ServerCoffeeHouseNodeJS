// const { createServer } = require('http');
const mongoose = require('mongoose');
// const PushNotifications = require('@pusher/push-notifications-server');
// const Pusher = require('pusher');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

// const httpServer = createServer();
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
});

// console.log(111, server);
// console.log(11, httpServer);
// const io = new Server(httpServer);
// eslint-disable-next-line import/order

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
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
const io = require('socket.io')();

io.attach(server);
io.on('connection', function (socket) {
  // eslint-disable-next-line no-console
  console.log('connection', socket);
});

// const pushNotifications = new PushNotifications({
//   instanceId: '1491591',
//   secretKey: '149c2a500cd33e39ad6a',
// });

// pushNotifications
//   .publishToInterests(['hello'], {
//     apns: {
//       aps: {
//         alert: 'Hello!',
//       },
//     },
//     fcm: {
//       notification: {
//         title: 'Hello',
//         body: 'Hello, world!',
//       },
//     },
//   })
//   .then((publishResponse) => {
//     console.log('Just published:', publishResponse.publishId);
//   })
//   .catch((error) => {
//     console.log('Error:', error);
//   });
