const express = require('express');

const router = express.Router();

const { customerfeedbackController } = require('../../controllers');

router.post('/create', customerfeedbackController.createCustomeFeedback);
router.get('/getdata', customerfeedbackController.getCustomeFeedback);

module.exports = router;
