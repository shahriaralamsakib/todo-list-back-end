const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile")); // Import Knex configuration

router.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await knex("todo_list").where({ id }).del();

        if (!deleted) {
            return res.status(404).json({ message: "To-Do not found." });
        }

        res.status(200).json({ message: "To-Do deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;