const saleModel = require("../models/SaleModel")
const userModel = require("../models/UserModel")

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
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getSaleById = async (req, res, next) => {
    const { id_sale } = req.params
    try {
        const response = await saleModel.getSaleById(id_sale);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const createSale = async (req, res, next) => {

    try {
        const id_auth_supabase = req.user.id
        const user = await userModel.getUserBySupabaseId(id_auth_supabase)

        const status = "PENDIENTE"
        const total = 0

        const response = await saleModel.createSale(
            user.id,
            status,
            total
        )

        res.status(201).json(response)

    } catch (error) {
        next(error)
    }
}

const deleteSale = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await saleModel.deleteSale(id);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllSales,
    getSaleByUserId,
    getSaleById,
    createSale,
    deleteSale
}