const userModel = require("../models/userModel")

const getUserBySupabaseId = async (req, res, next) => {
    const idAuthSupabase = req.params.id_auth_supabase;
    try {
        const response = await userModel.getUserBySupabaseId(idAuthSupabase);
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const response = await userModel.getAllUsers();
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    const { role, id_auth_supabase, name } = req.body
    try {
        const response = await userModel.createUser(role, id_auth_supabase, name);
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    getUserBySupabaseId,
    createUser
}