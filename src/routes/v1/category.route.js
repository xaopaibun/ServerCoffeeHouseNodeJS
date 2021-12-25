const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();

const { categoryController } = require('../../controllers');

router.post('/create-category', auth('getUsers'), categoryController.createCategory);
router.get('/getdata', categoryController.getCategory);

module.exports = router;
