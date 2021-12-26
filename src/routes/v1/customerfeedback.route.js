const express = require('express');

const router = express.Router();

const { customerfeedbackController } = require('../../controllers');

router.post('/create', customerfeedbackController.createCustomeFeedback);
router.get('/getdata', customerfeedbackController.getCustomeFeedback);
router.delete('/delete/:Id', customerfeedbackController.deleteCustomeFeedback);
router.put('/update/:Id', customerfeedbackController.updateCustomeFeedback);

module.exports = router;
