const { body } = require("express-validator")

const validateSignup = [
    body("email")
        .isEmail()
        .withMessage("email inválido")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("password debe ser un string")
        .isLength({ min: 8 })
        .withMessage("password debe tener al menos 8 caracteres")
]

const validateSignin = [
    body("email")
        .isEmail()
        .withMessage("email inválido")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("password debe ser un string")
        .notEmpty()
        .withMessage("password es requerida")
]

module.exports = {
    validateSignup,
    validateSignin
}