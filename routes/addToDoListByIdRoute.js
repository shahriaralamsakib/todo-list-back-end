const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile")); // Import Knex configuration

// Create a To-Do
router.post("/todos", async (req, res) => {
    const { user_id, task } = req.body;

    if (!user_id || !task) {
        return res.status(400).json({ error: "User ID and To-Do are required." });
    }

    try {
        const [id] = await knex("todo_list").insert({ user_id, task });

        res.status(201).json({ id, user_id, task});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;