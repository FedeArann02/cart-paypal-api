const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase")

router.get("/credentials", (req, res)=>{
    res.json({supabase})
})