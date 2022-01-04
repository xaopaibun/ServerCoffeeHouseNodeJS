const express = require('express');

const router = express.Router();

const { paymentController } = require('../../controllers');

router.get('/success', paymentController.success);
router.get('/cancel', paymentController.cancle);
router.post('/pay', paymentController.pay);

module.exports = router;
