const authService = require("../services/AuthService")
const userModel = require("../models/UserModel")

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
    try {
        const { email, password, name, role } = req.body
        const userAuth = await authService.signUp(email, password)
        const user = await userModel.createUser(
            role,
            userAuth.id,
            name
        )
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    getUserBySupabaseId,
    createUser
}