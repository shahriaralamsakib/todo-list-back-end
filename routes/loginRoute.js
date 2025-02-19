const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile")); // Import Knex configuration

// User Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Both email and password are required." });
    }

    try {
        // Fetch the user by email
        const user = await knex("user").where({ email }).first();

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        // Compare the provided password with the stored password
        if (user.password !== password) { // Compare plain text passwords
            return res.status(401).json({ error: "Invalid email or password." });
        }

        // On successful login
        res.status(200).json({ message: "Login successful", userName: user.userName, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;