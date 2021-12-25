const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'API Coffee House (Phạm Văn Qúy, Vũ Gia Thành, Nguyễn Hữu Đăng)',
    version,
  },
  servers: [
    {
      url: `http://${config.server}:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
