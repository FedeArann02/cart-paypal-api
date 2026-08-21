const saleDetailModel = require("../models/SaleDetailModel")
const saleService = require("../services/SaleService")


const getSaleDetailByIdSale = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await saleDetailModel.getSaleDetailByIdSale(id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const createSaleDetail = async (req, res, next) => {

    try {
        const { id_sale } = req.params
        const { id_product, amount } = req.body

        const response = await saleService.addProductToSale(
            id_sale,
            id_product,
            amount
        )

        res.status(201).json(response)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getSaleDetailByIdSale,
    createSaleDetail,
}