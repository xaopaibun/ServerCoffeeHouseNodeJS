const express = require('express');

const router = express.Router();

const { orderController } = require('../../controllers');
const auth = require('../../middlewares/auth');

router.get('/list-order', auth('getUsers'), orderController.getOrderProduct);
router.post('/create', orderController.createOrderProduct);

module.exports = router;
