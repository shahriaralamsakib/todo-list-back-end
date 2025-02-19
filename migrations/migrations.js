exports.up = function(knex) {
    return knex.schema
        // Create 'users' table
        .createTable("users", function(table) {
            table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
            table.string("userName", 255).notNullable();
            table.string("email", 255).notNullable().unique();
            table.string("password", 255).notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        // Create 'todo_list' table
        .createTable("todo_list", function(table) {
            table.uuid("id").primary();
            table.uuid("userId").notNullable().references("id").inTable("users").onDelete("CASCADE");
            table.string("todo", 255).notNullable();
            table.timestamp("timestamp").defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("todo_list")
        .dropTableIfExists("users");
};