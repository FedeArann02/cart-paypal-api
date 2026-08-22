const express = require("express");
const router = express.Router();
const paypalController = require("../controllers/paypalController");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate")
const { validateCreatePayment, validateExecutePayment } = require("../validators/paymentValidator")

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
router.post("/create", authenticate, validateCreatePayment, validate, paypalController.createPayment)

/**
 * @swagger
 * /api/payment/success/{id_sales}:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Ejecutar y confirmar un pago
 *     description: |
 *       Ejecuta y confirma el pago previamente aprobado por el usuario en PayPal.
 *       Requiere el identificador de la venta. Los parámetros paymentId, token
 *       y PayerID son proporcionados por PayPal después de que el usuario
 *       aprueba el pago.
 *
 *       Si la ejecución es exitosa y los datos del pago coinciden con la venta,
 *       la venta asociada se actualiza al estado APROBADO.
 *
 *       Este endpoint funciona como una URL de retorno (callback) utilizada
 *       por PayPal después de completar el proceso de pago.
 *     parameters:
 *      - in: path
 *        name: id_sales
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
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
 *       500:
 *         description: Error al ejecutar el pago en PayPal.
 */
router.get("/success/:id_sales", validateExecutePayment, validate, paypalController.executePayment)

module.exports = router