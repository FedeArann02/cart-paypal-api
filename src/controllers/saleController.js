const saleModel = require("../models/SaleModel")

const getAllSales = async (req, res, next) => {
    try {
        const result = await saleModel.getAllSales();
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getSaleByUserId = async (req, res, next) => {
    const { id_user } = req.params
    try {
        const response = await saleModel.getSaleByUserId(id_user);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const createSale = async (req, res, next) => {
    const { id_user, status, total } = req.body
    try {
        const response = await saleModel.createSale(id_user, status, total);
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const updateSaleState = async (req, res, next) => {
    const { id } = req.params
    const { name, price, image } = req.body
    try {
        const response = await saleModel.updateSaleState(name, price, image, id);
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteSale = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await saleModel.deleteSale(id);
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllSales,
    getSaleByUserId,
    createSale,
    updateSaleState,
    deleteSale
}