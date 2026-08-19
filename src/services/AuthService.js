const supabase = require("../config/supabase")

const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    if (error) {
        throw error
    }
    return data.user
}

module.exports = {
    signUp
}