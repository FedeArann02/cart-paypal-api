const pool = require("../config/db")
const table = "users"

const showRoleByUserId = async (idAuthSupabase) => {
    const { rows } = await pool.query(`SELECT role FROM ${table} WHERE id_auth_supabase = $1`, [idAuthSupabase])
    return rows[0]?.role
}

const getUserBySupabaseId = async (idAuthSupabase) => {
    const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id_auth_supabase = $1`, [idAuthSupabase])
    return rows[0]
}

const createUser = async (role, id_auth_supabase, name) => {
    const { rows } = await pool.query(`INSERT INTO ${table}(role, id_auth_supabase, name) VALUES ($1, $2, $3) RETURNING *`, [role, id_auth_supabase, name])
    return rows[0];
}

module.exports = { 
    showRoleByUserId,
    getUserBySupabaseId,
    createUser
 }