const users = require("../models/User")
const supabase = require("../config/supabase")

const signUpNewEmail = async (req, res) => {
    const {email, password} = req.body
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return res.status(400).json({error: error.stack})
        res.status(200).json({user: data.user})
}

const signInNewSession = async (req, res) => {
    const {email, password} = req.body
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return res.status(400).json({error: error.stack})
        res.status(200).json({session: data})
}

module.exports = {
    signUpNewEmail,
    signInNewSession
}