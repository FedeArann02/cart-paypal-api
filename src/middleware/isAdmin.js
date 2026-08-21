const userModel = require("../models/UserModel")
const ROLES = require("../constants/roles")


const isAdmin = async (req, res, next) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    try {
        const userRole = await userModel.showRoleByUserId(user.id)
        if (userRole !== ROLES.ADMIN) {
            return res.status(403).json({ error: "Forbidden: Administrator role required" })
        }
        next();

    } catch (error) {
        next(error)
    }
}

module.exports = isAdmin