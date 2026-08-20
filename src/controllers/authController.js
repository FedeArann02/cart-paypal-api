const authService = require("../services/AuthService")
const userModel = require("../models/UserModel")

const signUpNewEmail = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userAuth = await authService.signUp(email, password)

        const user = await userModel.createUser(
            "user",
            userAuth.id,
            "generico"
        )
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

const signInNewSession = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const session = await authService.signIn(email, password)

        res.status(200).json({ session: session })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUpNewEmail,
    signInNewSession
}