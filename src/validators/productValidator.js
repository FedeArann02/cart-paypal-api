const { body, param } = require("express-validator")

const validateParamId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("id debe ser un entero mayor a 0")
]

const validateCreateProduct = [

    body("name")
        .isString()
        .withMessage("name debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("name es requerido")
        .escape(),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("price debe ser un número mayor o igual a 0"),

    body("image")
        .isURL()
        .withMessage("image debe ser una URL válida")
        .trim()
]

const validateUpdateProduct = [

    ...validateParamId,

    body("name")
        .isString()
        .withMessage("name debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("name es requerido")
        .escape(),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("price debe ser un número mayor o igual a 0"),

    body("image")
        .isURL()
        .withMessage("image debe ser una URL válida")
        .trim()
]

module.exports = {
    validateParamId,
    validateCreateProduct,
    validateUpdateProduct
}