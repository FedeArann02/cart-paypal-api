const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController.js");
const saleDetailController = require("../controllers/saleDetailController.js");
const authenticate = require("../middleware/authenticate.js")

/**
 * @swagger
 * /api/cart/:
 *   post:
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     summary: crea el proceso de una nueva venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SaleRequest"
 *     responses:
 *       200:
 *         description: venta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/SaleResponse'
 *       401:
 *         description: No autenticado o token inválido.
 */
router.post("/", authenticate, saleController.createSale)
/**
 * @swagger
 * /api/cart/item/{id_user}:
 *   post:
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     summary: crea un nuevo detalle perteneciente a una venta
 *     parameters:
 *      - in: path
 *        name: id_user
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SaleDetailRequest"
 *     responses:
 *       200:
 *         description: detalle de venta creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/SaleDetailResponse'
 *       401:
 *         description: No autenticado o token inválido.
 */
router.post("/item/:id_user", authenticate, saleDetailController.createSaleDetail)

module.exports = router;