const express = require("express")
const router = express.Router()
const {signUpNewEmail, signInNewSession} = require("../controllers/authController")
const validate = require("../middleware/validate")
const { validateSignup, validateSignin } = require("../validators/authValidator")

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
 *       201:
 *         description: usuario creado exitosamente
 *       400:
 *         description: Datos de registro inválidos.
 *       409:
 *         description: El usuario ya existe
 */
router.post("/signup", validateSignup, validate, signUpNewEmail)
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
 *         description: Sesión creada exitosamente
 *       400:
 *         description: Credenciales inválidas.
 */
router.post("/signin", validateSignin, validate, signInNewSession)

module.exports = router