const { getSaleById } = require("../models/SaleModel")
const { getSaleDetailByIdSale } = require("../models/SaleDetailModel")
const PaymentService = require("../services/PaymentService")

const createPayment = async (req, res, next) => {
    try {

        const { id_sales } = req.body
        const saleDetail = await getSaleDetailByIdSale(id_sales)
        const sale = await getSaleById(id_sales)

        const mappedItems = saleDetail.map(item => ({
            name: item.description,
            sku: `SKU-${item.id_product}`,
            price: item.price_sale.toString(),
            currency: "USD",
            quantity: item.amount
        }))

        const redirectUrl = await PaymentService.create(mappedItems, sale.total, id_sales)
        res.status(200).json({ redirectUrl:redirectUrl} )

    } catch (error) {
        next(error)
    }
}

const executePayment = async (req, res, next) => {

    try {
        const { id_sales } = req.params
        const { paymentId, PayerID } = req.query

        const payment = await PaymentService.execute(
            id_sales,
            paymentId,
            PayerID
        )

        res.status(200).json({ payment })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    createPayment,
    executePayment
}