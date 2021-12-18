const express = require('express');
const productController = require('../../controllers/product.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/list-products', productController.getProducts);
router.get('/list-products', productController.getProduct);
router.post('/create-product', auth('getUsers'), productController.createProduct);
router.delete('/delete-product', auth('getUsers'), productController.deleteProduct);
router.put('/update-product', auth('getUsers'), productController.updateProduct);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: CURD Product
 */

/**
 * @swagger
 * /create-product:
 *   post:
 *     summary: Create a product
 *     description: Only admins can create other product
 *     tags: [admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - price
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *               content:
 *                 type: string
 *             example:
 *               name: Cà phê Trứng
 *               image: ABC
 *               price: 50000
 *               content: Cà phê Trứng được chọn lọc kỹ lưỡng từ vùng đất đỏ bazan Buôn Mê Thuột; sau đó trải qua quá trình sàng lọc, rang xay dưới sự kiểm soát nghiêm ngặt về nhiệt độ và thời gian để đạt đến đỉnh cao của mùi thơm, độ nở và hương vị riêng biệt. Sự hài hòa trong tỷ lệ pha trộn giữa hạt cà phê Robusta và Arabica mang đến cho khách hàng những ly cà phê pha máy – kiểu Ý nhưng vẫn đậm đà bản sắc và đặc trưng của văn hóa nước Việt Nam.
 *      responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 */
