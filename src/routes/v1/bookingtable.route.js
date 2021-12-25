const express = require('express');

const router = express.Router();

const { bookingtableController } = require('../../controllers');

router.post('/booking', bookingtableController.bookingtable);
router.get('/getdata', bookingtableController.getBookingTable);

module.exports = router;
