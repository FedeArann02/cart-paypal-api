/* Este controlador consume el servicio de autenticación de Supabase.
No requiere un modelo, ya que las operaciones de registro e inicio de sesión
son gestionadas directamente por Supabase Auth. */
const supabase = require("../config/supabase")
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

const signInNewSession = async (req, res) => {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return res.status(400).json({ error: error.stack })
    res.status(200).json({ session: data.session }) //retorno data.session para facilitarcela a mi cliente
}

module.exports = {
    signUpNewEmail,
    signInNewSession
}