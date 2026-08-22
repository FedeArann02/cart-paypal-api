const paypal = require("../config/paypal")
const saleModel = require("../models/SaleModel")

const create = (mappedItems, total, id_sales) => {
    return new Promise((resolve, reject) => {

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url:  `${process.env.PAYPAL_RETURN_URL}${id_sales}`,
                cancel_url: process.env.PAYPAL_CANCEL_URL,
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

const execute = async (id_sales, paymentId, PayerID) => {

    const sale = await saleModel.getSaleById(id_sales)

    if (!sale) {
        throw new Error("Sale not found")
    }

    if (sale.status === "APROBADO") {
        throw new Error("Sale already approved")
    }

    if (!paymentId || !PayerID) {
        throw new Error("Missing PayPal payment data")
    }

    const execute_payment_json = {
        payer_id: PayerID,
        transactions: [{
            amount: {
                currency: "USD",
                total: sale.total.toString()
            }
        }]
    }

    const payment = await new Promise((resolve, reject) => {

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

    if (payment.state !== "approved") {
        throw new Error("El pago no fue aprobado por PayPal")
    }

    const paidAmount = payment.transactions[0].amount.total

    if (Number(paidAmount) !== Number(sale.total)) {
        throw new Error(
            "El importe del pago no coincide con el total de la venta"
        )
    }

    const currency = payment.transactions[0].amount.currency

    if (currency !== "USD") {
        throw new Error("La moneda del pago no es válida")
    }

    await saleModel.updateSaleStatus(
        "APROBADO",
        id_sales
    )

    return payment
}

module.exports = {
    create,
    execute
}
