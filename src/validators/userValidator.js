const { body, param } = require("express-validator")
const ROLES = require("../constants/roles")

const validateCreateUser = [

    body("name")
        .isString()
        .withMessage("name debe ser un string")
        .isLength({ min: 1 })
        .withMessage("name es requerido")
        .trim()
        .escape(),

    body("role")
        .isIn(Object.values(ROLES))
        .withMessage("el rol proporcionado no es válido")
        .trim()
        .escape(),

    body("email")
        .isEmail()
        .withMessage("email inválido")
        .trim()
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("password debe ser un string")
        .isLength({ min: 8 })
        .withMessage("password debe tener al menos 8 caracteres")
        .trim()

]

const validateParamIdAuthSupabase = [
    param("id_auth_supabase")
        .isUUID()
        .withMessage("id_auth_supabase debe ser un UUID válido")
]

module.exports = {
    validateCreateUser,
    validateParamIdAuthSupabase
}