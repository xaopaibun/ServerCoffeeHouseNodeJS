const express = require('express');

const router = express.Router();

const { productController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const fileUploader = require('../../config/cloudinary.config');

router.get('/list-products', productController.getProducts);
router.get('/list-products/search=:name', productController.getProductsbySearchName);
router.get('/similar-products', productController.getSimilarProducts);
router.get('/:productId', productController.getProduct);
router.post('/create-product', fileUploader.array('image'), auth('getUsers'), productController.createProduct);
router.delete('/delete-product/:productId', auth('getUsers'), productController.deleteProduct);
router.put('/:productId', auth('getUsers'), productController.updateProduct);
router.get('/category_id/:category_id', productController.getProductByCategoryID);
module.exports = router;
