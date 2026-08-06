const pool = require("../config/db")
const table = "sales_detail"

const getSaleDetailById = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
    return rows[0];
}

const createSaleDetail = async (id_sales, id_product, description, price_sale, amount, total) => {
    const { rows } = await pool.query(`INSERT INTO ${table}(id_sales, id_product, description, price_sale, amount, total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [id_sales, id_product, description, price_sale, amount, total])
    return rows[0];
}

module.exports = {
    getSaleDetailById,
    createSaleDetail,
}