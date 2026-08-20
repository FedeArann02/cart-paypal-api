
const errorHandler = (error, req, res, next) => {
    console.error(error)

    if (error.message === "User already registered") {
        return res.status(409).json({
            error: "El usuario ya está registrado"
        })
    }

    res.status(500).json({
        error: "Internal Server Error"
    })
}

module.exports = errorHandler