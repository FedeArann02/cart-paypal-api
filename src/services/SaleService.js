const pool = require("../config/db")
const saleModel = require("../models/SaleModel")
const saleDetailModel = require("../models/SaleDetailModel")
const productModel = require("../models/ProductModel")

const addProductToSale = async (id_sale, id_product, amount) => {

    const sale = await saleModel.getSaleById(id_sale)

    if (!sale) {
        throw new Error("Sale not found")
    }

    if (sale.status === "APROBADO") {
        throw new Error("La venta ya fue aprobada")
    }

    const product = await productModel.getProductById(id_product)

    if (!product) {
        throw new Error("Product not found")
    }

    const price_sale = product.price
    const totalDetail = price_sale * amount

    const client = await pool.connect()

    try {

        await client.query("BEGIN")

        const saleDetail = await saleDetailModel.createSaleDetail(
            client,
            id_sale,
            product.id,
            product.name,
            price_sale,
            amount,
            totalDetail
        )

        await saleModel.addSaleTotal(
            client,
            id_sale,
            totalDetail
        )

        await client.query("COMMIT")

        return saleDetail

    } catch (error) {

        await client.query("ROLLBACK")
        throw error

    } finally {

        client.release()
    }
}

module.exports = {
    addProductToSale
}