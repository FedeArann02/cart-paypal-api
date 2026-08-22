const userModel = require("../models/UserModel")
const supabaseAdmin = require("../config/supabaseAdmin")

const getUserWithEmailBySupId = async (id_auth_supabase) => {

    const user = await userModel.getUserBySupabaseId(
        id_auth_supabase
    )

    if (!user) {
        throw new Error("User not found")
    }

    const { data, error } = await supabaseAdmin.auth.admin.getUserById(
        id_auth_supabase
    )

    if (error) {
        throw error
    }

    return {
        ...user,
        email: data.user.email
    }
}

const getAllUsersWithEmail = async () => {

    const users = await userModel.getAllUsers()

    const usersWithEmail = await Promise.all(
        users.map(async (user) => {

            const { data, error } = await supabaseAdmin.auth.admin.getUserById(
                user.id_auth_supabase
            )

            if (error) {
                throw error
            }

            return {
                ...user,
                email: data.user.email
            }

        })
    )

    return usersWithEmail
}

module.exports = {
    getUserWithEmailBySupId,
    getAllUsersWithEmail
}