const { Pool } = require("pg")
const dotenv = require("dotenv")
const fs = require("fs")
const path = require("path")

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("src/certs/ca.crt").toString()
    }
})

pool.connect((error, client, release) => {
    if (error) {
        console.log("Error de conexion", error.stack)
    }
    else {
        console.log("Conexion exitosa")
        release()
    }
})

module.exports = pool