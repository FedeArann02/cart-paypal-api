const authService = require("../services/AuthService")
const userService = require("../services/UserService")
const userModel = require("../models/UserModel")

const getUserBySupabaseId = async (req, res, next) => {

    const { id_auth_supabase } = req.params

    try {

        const response = await userService.getUserWithEmailBySupId(
            id_auth_supabase
        )

        res.status(200).json(response)

    } catch (error) {

        next(error)

    }

}

const getAllUsers = async (req, res, next) => {

    try {

        const response = await userService.getAllUsersWithEmail()

        res.status(200).json(response)

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