const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin.js")
const validate = require("../middleware/validate.js")
const { validateCreateUser, validateParamIdAuthSupabase } = require("../validators/userValidator.js")

/**
 * @swagger
 * /api/users/{id_auth_supabase}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Obtiene un usuario por su id_auth_supabase
 *     parameters:
 *       - in: path
 *         name: id_auth_supabase
 *         required: true
 *         schema:
 *           type: string
 *         description: id_auth_supabase
 *     responses:
 *       200:
 *         description: Usuario obtenido según su id_auth_supabase
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id_auth_supabase", authenticate, validateParamIdAuthSupabase, validate, userController.getUserBySupabaseId)

/**
 * @swagger
 * /api/users/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Obtiene todos los usuarios
 *     description: Requiere autenticación mediante Bearer Token y permisos de administrador. Solo los usuarios con rol administrador pueden acceder a este recurso.
 *     responses:
 *       200:
 *         description: Obtiene una lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       401: 
 *         description: No autenticado o token inválido.
 *       403:
 *         description: Prohibido - Requiere el rol de administrador
 */
router.get("/", authenticate, isAdmin, userController.getAllUsers)
/**
 * @swagger
 * /api/users/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Crea un nuevo usuario
 *     description: Requiere autenticación mediante Bearer Token y permisos de administrador. Solo los usuarios con rol administrador pueden acceder a este recurso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserRequest"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       401: 
 *         description: No autenticado o token inválido.
 *       403:
 *         description: Prohibido - Requiere el rol de administrador
 *       409:
 *         description: El usuario ya existe
 */
router.post("/create", authenticate, isAdmin, validateCreateUser, validate, userController.createUser)

module.exports = router