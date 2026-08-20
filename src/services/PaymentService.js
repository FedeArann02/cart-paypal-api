const paypal = require("../config/paypal")

const create = (mappedItems, total, id_sales) => {
    return new Promise((resolve, reject) => {

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `http://localhost:5432/api/payment/success/${id_sales}`,
                cancel_url: `http://localhost:5432/api/payment/cancel/${id_sales}`
            },
            transactions: [{
                item_list: {
                    items: mappedItems
                },
                amount: {
                    currency: "USD",
                    total: total
                },
                description: "Esta es la estructura de pagos con paypal"
            }]
        }

        paypal.payment.create(create_payment_json, (error, payment) => {

            if (error) {
                return reject(error)
            }

            const redirectUrl = payment.links.find(
                link => link.rel === "approval_url"
            ).href

            resolve(redirectUrl)
        })
    })
}

const execute = (paymentId, PayerID, total) => {
    return new Promise((resolve, reject) => {

        const execute_payment_json = {
            payer_id: PayerID,
            transactions: [{
                amount: {
                    currency: "USD",
                    total: total
                }
            }]
        }

        paypal.payment.execute(
            paymentId,
            execute_payment_json,
            (error, payment) => {

                if (error) {
                    return reject(error)
                }

                resolve(payment)
            }
        )
    })
}

module.exports = {
    create,
    execute
}
