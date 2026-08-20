const express = require("express");
const router = express.Router();
const paypalController = require("../controllers/paypalController");
const authenticate = require("../middleware/authenticate");

/**
 * @swagger
 * /api/payment/create/:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Crear un pago de PayPal
 *     description: Crea una solicitud de pago en PayPal utilizando los productos y el
 *       importe total proporcionados. Requiere autenticación mediante Bearer Token.
 *       Si la operación es exitosa, devuelve la URL a la que el cliente debe
 *       redirigir al usuario para aprobar el pago.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PayPalPaymentRequest"
 *     responses:
 *       200:
 *         description: Pago creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/PayPalPaymentResponse'
 *       401:
 *         description: No autenticado o token inválido.
 *       500:
 *         description: Error al crear el pago en PayPal.
 */
router.post("/create", authenticate, paypalController.createPayment)

/**
 * @swagger
 * /api/payment/success/{sale_id}:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Ejecutar y confirmar un pago
 *     description: Ejecuta el pago previamente aprobado por el usuario en PayPal.
 *       Requiere el identificador de la
 *       venta. Los parámetros paymentId y PayerID son proporcionados por PayPal
 *       después de que el usuario aprueba el pago. Si la ejecución es exitosa y los datos de la venta coinciden,
 *       la venta asociada se actualiza al estado CONFIRMADO.
 *     parameters:
 *      - in: path
 *        name: sale_id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID de la venta asociada al pago.
 *      - in: query
 *        name: paymentId
 *        required: true
 *        description: Identificador del pago generado por PayPal.
 *        schema:
 *          type: string
 *          example: PAY-123456789
 *      - in: query
 *        name: PayerID
 *        required: true
 *        description: Identificador del comprador proporcionado por PayPal.
 *        schema:
 *          type: string
 *          example: ABC123456
 *     responses:
 *       200:
 *         description: Pago ejecutado y venta confirmada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/PayPalPaymentExecuteResponse'
 *       401:
 *         description: No autenticado o token inválido.
 *       500:
 *         description: Error al crear el pago en PayPal.
 */
router.get("/success/:sale_id", paypalController.executePayment)

module.exports = router