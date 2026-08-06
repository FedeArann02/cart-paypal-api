const pool = require("../config/db")
const table = "sales"

const getAllSales = async () => {
    const { rows } = await pool.query(`SELECT * FROM ${table}`)
    return rows;
}

const getSaleByUserId = async (id_user) => {
    const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id_user = $1`, [id_user])
    return rows[0];
}

const createSale = async (id_user, status, total) => {
    const { rows } = await pool.query(`INSERT INTO ${table}(id_user, status, total) VALUES ($1, $2, $3) RETURNING *`, [id_user, status, total])
    return rows[0];
}

const updateSaleState = async (status, id) => {
    const { rows } = await pool.query(`UPDATE ${table} SET status = $1 WHERE id = $2 RETURNING *`, [status, id])
    return rows[0];
}

const deleteSale = async (id) => {
    const { rows } = await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id])
    return rows[0];
}

module.exports = {
    getAllSales,
    getSaleByUserId,
    createSale,
    updateSaleState,
    deleteSale
}