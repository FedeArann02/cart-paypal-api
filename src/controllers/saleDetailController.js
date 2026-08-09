const saleDetailModel = require("../models/SaleDetailModel")
const {getSaleByUserId} = require("../models/SaleModel")

const getSaleDetailByIdSale = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await saleDetailModel.getSaleDetailByIdSale(id);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const createSaleDetail = async (req, res, next) => {

    const id_user = req.params.id_user
    const { id_product, description, price_sale, amount, total } = req.body
    try {
        const sale = await getSaleByUserId(id_user)
        if(!sale){
            return res.status(404).json({ error: "Cart not found" })
        }
        
        const response = await saleDetailModel.createSaleDetail(sale.id, id_product, description, price_sale, amount, total);
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getSaleDetailByIdSale,
    createSaleDetail,
}