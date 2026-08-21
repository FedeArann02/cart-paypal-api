const { body, param, query } = require("express-validator")

const validateCreatePayment = [
    body("id_sales")
        .notEmpty()
        .withMessage("id_sales es requerido")
        .isInt({ min: 1 })
        .withMessage("id_sales debe ser un entero mayor a 0")
]

const validateExecutePayment = [
    param("id_sales")
        .notEmpty()
        .withMessage("sale_id es requerido")
        .isInt({ min: 1 })
        .withMessage("sale_id debe ser un entero mayor a 0"),

    query("paymentId")
        .notEmpty()
        .withMessage("paymentId es requerido")
        .isString()
        .withMessage("paymentId debe ser un string")
        .trim(),

    query("PayerID")
        .notEmpty()
        .withMessage("PayerID es requerido")
        .isString()
        .withMessage("PayerID debe ser un string")
        .trim()
]

module.exports = {
    validateCreatePayment,
    validateExecutePayment
}