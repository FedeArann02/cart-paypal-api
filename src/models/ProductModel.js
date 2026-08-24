const pool = require("../config/db")
const table = "products"

const getAllProducts = async () => {
    const { rows } = await pool.query(`SELECT * FROM ${table}`)
    return rows;
}

const getProductById = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
    return rows[0];
}

const createProduct = async (name, price, image) => {
    const { rows } = await pool.query(`INSERT INTO ${table}(name, price, image) VALUES ($1, $2, $3) RETURNING *`, [name, price, image])
    return rows[0];
}

const updateProduct = async (name, price, image, id) => {
    const { rows } = await pool.query(`UPDATE ${table} SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *`, [name, price, image, id])
    return rows[0];
}

const deleteProduct = async (id) => {
    const { rows } = await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id])
    return rows[0];
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
