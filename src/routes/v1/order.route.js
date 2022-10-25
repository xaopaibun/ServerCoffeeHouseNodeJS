const express = require('express');

const router = express.Router();
const admin = require('firebase-admin');

const { orderController } = require('../../controllers');
const auth = require('../../middlewares/auth');

router.get('/list-order', auth('getUsers'), orderController.getOrderProduct);
router.post('/create', orderController.createOrderProduct);
router.get('/statistic', auth('getUsers'), orderController.getStatistic);
router.put('/:orderId', auth('getUsers'), orderController.updateOrder);
router.get('/:orderId', auth('getUsers'), orderController.getOrderDetail);
router.delete('/:orderId', auth('getUsers'), orderController.deleteOrderByID);

const serviceAccount = require('../../phamvanquy-a286a-firebase-adminsdk-gkj3s-9b69755401.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://phamvanquy-a286a-default-rtdb.firebaseio.com',
});

// Send a message to the device corresponding to the provided
// registration token.

module.exports = router;
