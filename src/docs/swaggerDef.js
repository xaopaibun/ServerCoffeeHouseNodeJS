const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'API Coffee House (Phạm Jin D13CNPM6)',
    version,
  },
  servers: [
    {
      url: `http://${config.server}:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
