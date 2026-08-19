const paypal = require("../config/paypal")
const { updateSaleStatus, getSaleById } = require("../models/SaleModel")
const { getSaleDetailByIdSale } = require("../models/SaleDetailModel")

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

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: "http://localhost:5173/pago/success",
                cancel_url: "http://cancel.url"
            },
            transactions: [{
                item_list: {
                    items: mappedItems
                },
                amount: {
                    currency: "USD",
                    total: sale.total
                },
                description: "Esta es la estructura de pagos con paypal"
            }]
        }

        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                return next(error)
            }

            const redirectUrl = payment.links.find(
                link => link.rel === "approval_url"
            ).href

            res.status(200).json({ redirectUrl })
        })

    } catch (error) {
        next(error)
    }
}

const executePayment = async (req, res, next) => {
    try {
        const { id_sales } = req.params
        const { paymentId, PayerID } = req.query

        const sale = await getSaleById(id_sales)

        const execute_payment_json = {
            payer_id: PayerID,
            transactions: [{
                amount: {
                    currency: "USD",
                    total: sale.total
                }
            }]
        }

        paypal.payment.execute(
            paymentId,
            execute_payment_json,
            async (error, payment) => {

                if (error) {
                    return next(error)
                }

                try {
                    await updateSaleStatus("CONFIRMADO", sale_id)

                    res.status(200).json({ payment })

                } catch (error) {
                    next(error)
                }
            }
        )

    } catch (error) {
        next(error)
    }
}
module.exports = {
    createPayment,
    executePayment
}