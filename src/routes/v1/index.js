const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const bookingtableRoute = require('./bookingtable.route');
const customerfeedbackRoute = require('./customerfeedback.route');
const orderRoute = require('./order.route');
const paymentRoute = require('./payment.route');
const vnpayRoute = require('./vnpay.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/booking-table-coffee',
    route: bookingtableRoute,
  },
  {
    path: '/customer-feedback',
    route: customerfeedbackRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/pay',
    route: vnpayRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
