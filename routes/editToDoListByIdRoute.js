const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../config/knexfile"));

router.patch("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: "To-Do text is required for updating." });
    }

    try {
        const updated = await knex("todo_list").where({ id }).update({ task });

        if (!updated) {
            return res.status(404).json({ message: "To-Do not found." });
        }

        res.status(200).json({ message: "To-Do updated successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;