const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile")); // Import Knex configuration

// User Registration Route
router.post("/register", async (req, res) => {
    const { userName, email, password } = req.body;

    // Basic input validation
    if (!userName || !email || !password) {
        return res.status(400).json({ error: "All fields are required: userName, email, and password." });
    }

    try {
        // Insert the user into the database
        const [id] = await knex("user").insert({ userName, email, password });

        // Send response
        res.status(201).json({ id, userName, email });
    } catch (error) {
        // Handle unique constraint violations and other errors
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;