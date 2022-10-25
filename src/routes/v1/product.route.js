const express = require('express');

const router = express.Router();
// const multer = require('multer');

const { productController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const fileUploader = require('../../config/cloudinary.config');
// const imageUploader = multer({ dest: 'public/images/' });

router.get('/list-products', productController.getProducts);
router.get('/similar-products', productController.getSimilarProducts);
router.get('/:productId', productController.getProduct);
router.post('/create-product', fileUploader.single('image'), auth('getUsers'), productController.createProduct);
router.delete('/delete-product/:productId', auth('getUsers'), productController.deleteProduct);
router.put('/:productId', auth('getUsers'), productController.updateProduct);
router.get('/category_id/:category_id', productController.getProductByCategoryID);
module.exports = router;
