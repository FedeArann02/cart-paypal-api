const saleDetailModel = require("../models/SaleDetailModel")
const {getSaleById} = require("../models/SaleModel")

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

    const id_sale = req.params.id_sale
    const { id_product, description, price_sale, amount, total } = req.body

    try {
        const sale = await getSaleById(id_sale)
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