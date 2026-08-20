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
 *     description: >
 *       Crea una nueva venta asociada al usuario autenticado.
 *       La venta se crea inicialmente con estado PENDIENTE y total 0.
 *       El total será actualizado por el backend a medida que se agreguen
 *       los detalles de la venta.
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
 * /api/cart/item/{id_sale}:
 *   post:
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     summary: crea un nuevo detalle perteneciente a una venta
 *     parameters:
 *      - in: path
 *        name: id_sale
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID de la venta
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
 *       404: 
 *         description: venta no encontrado
 */
router.post("/item/:id_sale", authenticate, saleDetailController.createSaleDetail)

module.exports = router;