/* Este controlador consume el servicio de autenticación de Supabase.
No requiere un modelo, ya que las operaciones de registro e inicio de sesión
son gestionadas directamente por Supabase Auth. */

const supabase = require("../config/supabase")
const { createUser } = require("../models/UserModel")

const signUpNewEmail = async (req, res) => {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return res.status(400).json({ error: error.stack })
    res.status(200).json({ user: data.user }) //retorno data.user para facilitarcela a mi cliente

    const pUser = {
        role: "user",
        id_auth_supabase: data.user.id,
        name: "generico"
    }
    await createUser(pUser)
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