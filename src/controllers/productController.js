const productModel = require("../models/ProductModel")

const getAllProducts = async (req, res, next) => {
    try {
        const result = await productModel.getAllProducts();
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await productModel.getProductById(id);

        if (!result) {
            return res.status(404).json({
                error: "Producto no encontrado"
            })
        }

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    const { name, price, image } = req.body
    try {
        const response = await productModel.createProduct(name, price, image);
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params
    const { name, price, image } = req.body
    try {
        const response = await productModel.updateProduct(name, price, image, id);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await productModel.deleteProduct(id);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}