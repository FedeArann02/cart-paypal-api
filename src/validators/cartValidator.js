const { body, param } = require("express-validator")

const validateAddProductToSale = [

    param("id_sale")
        .isInt({ min: 1 })
        .withMessage("id_sale debe ser un entero mayor a 0"),

    body("id_product")
        .isInt({ min: 1 })
        .withMessage("id_product debe ser un entero mayor a 0"),

    body("amount")
        .isInt({ min: 1 })
        .withMessage("amount debe ser un entero mayor a 0")
]

module.exports = {
    validateAddProductToSale
}