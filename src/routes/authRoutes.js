const express = require("express")
const router = express.Router()
const {signUpNewEmail, signInNewSession} = require("../controllers/authController")

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: crea un nuevo usuario autorizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterRequest"
 *     responses:
 *       200:
 *         description: usuario creado exitosamente
 *       404:
 *         description: Ruta no encontrada
 *       409:
 *         description: El usuario ya existe
 */
router.post("/signup", signUpNewEmail)
/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: crea una nueva sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginRequest"
 *     responses:
 *       200:
 *         description: sesión creada exitosamente
 *       400:
 *         description: credenciales de logeo inválidas
 */
router.post("/signin", signInNewSession)

module.exports = router