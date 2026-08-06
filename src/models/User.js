const pool = require("../config/db")

const showRoleByUserId = async (idAuthSupabase) => {
    const { rows } = await pool.query("SELET role FROM users WHERE id_auth_supabase = $1", [idAuthSupabase])
    return rows[0]?.role
}


module.exports = { showRoleByUserId }