const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile"));

router.get("/users", async (req, res) => {
    try {
        const users = await knex("user").select("*"); // Fetch all users
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});;

module.exports = router;