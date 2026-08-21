require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const cartRoutes = require("./routes/cartRoutes")
const userRoutes = require("./routes/userRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const productRoutes = require("./routes/productRoutes")
const errorHandler = require("./middleware/errorHandler")
const setupSwaggerDocs = require("./docs/swagger")

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(bodyParser.json())
setupSwaggerDocs(app)

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/products", productRoutes)

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})