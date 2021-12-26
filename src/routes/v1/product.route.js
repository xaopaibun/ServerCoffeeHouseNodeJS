const express = require('express');

const router = express.Router();
const multer = require('multer');
const { productController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const imageUploader = multer({ dest: 'public/images/' });

router.get('/list-products', productController.getProducts);
router.get('/similar-products', productController.getSimilarProducts);
router.get('/:productId', productController.getProduct);
router.post('/create-product', imageUploader.single('image'), auth('getUsers'), productController.createProduct);
router.delete('/delete-product/:productId', auth('getUsers'), productController.deleteProduct);
router.put('/update-product/:productId', auth('getUsers'), productController.updateProduct);

module.exports = router;
