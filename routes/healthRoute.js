const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile"));

router.get("/health", async (req, res) => {
    try {
        // Run a simple query to check the connection
        await knex.raw("SELECT 1+1 AS result"); // A basic query to test connection
        res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ status: "unhealthy", error: error.message });
    }
});

module.exports = router;