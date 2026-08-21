const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const authenticate = require("../middleware/authenticate.js")
const isAdmin = require("../middleware/isAdmin.js")
const validate = require("../middleware/validate")
const { validateParamId, validateCreateProduct, validateUpdateProduct } = require("../validators/productValidator.js")

/**
 * @swagger
 * /api/products/:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", productController.getAllProducts)
/**
 * @swagger
 * /api/products/{id_product}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: producto obtenido según su ID
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", validateParamId, validate, productController.getProductById)

/**
 * @swagger
 * /api/products/:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crea un producto nuevo
 *     description: Requiere autenticación mediante Bearer Token y permisos de administrador. Solo los usuarios con rol administrador pueden acceder a este recurso.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: producto Creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: No autenticado o token inválido.
 *       403:
 *         description: Prohibido - Requiere el rol de administrador
 */
router.post("/", authenticate, isAdmin, validateCreateProduct, validate, productController.createProduct)
/**
 * @swagger
 * /api/products/{id_product}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Modifica un producto existente
 *     description: Requiere autenticación mediante Bearer Token y permisos de administrador. Solo los usuarios con rol administrador pueden acceder a este recurso.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id_product
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductRequest"
 *     responses:
 *       200:
 *         description: producto modificado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: No autenticado o token inválido.
 *       403:
 *         description: Prohibido - Requiere el rol de administrador
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", authenticate, isAdmin, validateUpdateProduct, validate, productController.updateProduct)
/**
 * @swagger
 * /api/products/{id_product}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Elimina un producto existente
 *     description: Requiere autenticación mediante Bearer Token y permisos de administrador. Solo los usuarios con rol administrador pueden acceder a este recurso.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id_product
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID del producto
 *     responses:
 *       200:
 *         description: producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: No autenticado o token inválido.
 *       403:
 *         description: Prohibido - Requiere el rol de administrador
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", authenticate, isAdmin, validateParamId, validate, productController.deleteProduct)

module.exports = router;