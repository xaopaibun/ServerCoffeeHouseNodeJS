const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/auth');
const { bookingtableController } = require('../../controllers');

router.post('/booking', bookingtableController.bookingtable);
router.get('/getdata', bookingtableController.getBookingTable);
router.delete('/delete/:bookingTableId', auth('getUsers'), bookingtableController.deleteBookingTable);

module.exports = router;
