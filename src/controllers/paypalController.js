const paypal = require("../config/paypal")
const { updateSaleState } = require("../models/SaleModel")

const createPayment = async (req, res, next) => {
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://return.url",
            cancel_url: "http://cancel.url"
        },
        transactions: [{
            item_list: {
                items: req.body.items
            },
            amount: {
                currency: "USD",
                total: req.body.total
            },
            description: "Esta es la estructura de pagos con paypal"
        }]
    };

    paypal.payment.create(create_payment_json, async function (error, payment) {
        if (error) {
            next(error)
        }
        else {
            res.status(200).json({ payment })
        }
    })
};

const executePayment = async (req, res, next) => {
    const { sale_id } = req.params
    const { paymentId, PayerID } = req.query
    const execute_payment_json = {
        payer_id: PayerID,
        transactions: [{
            amount: {
                currency: "USD",
                total: req.query.total
            }
        }]
    }
    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            next(error)
        }
        else {
            try {
                await updateSaleState("CONFIRMADO", sale_id)
                console.log("completo")
                res.status(200).json({ payment })

            } catch (error) {
                next(error)
            }
        }
    })
}

module.exports = {
    createPayment,
    executePayment
}