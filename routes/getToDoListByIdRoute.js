const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile")); // Import Knex configuration

// Get To-Do List by User ID
router.get("/todos/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        const todos = await knex("todo_list").where({ user_id }).select("*");

        if (todos.length === 0) {
            return res.status(404).json({ message: "No to-do items found for this user." });
        }

        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;