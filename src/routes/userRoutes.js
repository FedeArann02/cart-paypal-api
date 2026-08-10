const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin.js")

router.get("/:id_auth_supabase", authenticate, userController.getUserBySupabaseId)
router.get("/", authenticate, isAdmin, userController.getAllUsers)
router.post("/create", authenticate, isAdmin, userController.createUser)

module.exports = router