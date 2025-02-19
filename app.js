const express = require('express');
const morgan = require('morgan');
const { connectDB } = require("./config/database");
const knex = require("knex")(require("./config/knexfile"));
const healthRoute = require("./routes/healthRoute");
const RegisterUserRoute = require("./routes/RegisterUserRoute");
const getUsersRoute = require("./routes/getUsersRoute");
const loginRoute = require("./routes/loginRoute");
const getToDoListByIdRoute = require("./routes/getToDoListByIdRoute");
const addToDoListByIdRoute = require("./routes/addToDoListByIdRoute");
const deleteToDoListByIdRoute = require("./routes/deleteToDoListByIdRoute");
const editToDoListByIdRoute = require("./routes/editToDoListByIdRoute");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined'));
app.use(express.json());

connectDB();

app.use("/api", healthRoute);
app.use("/api", RegisterUserRoute);
app.use("/api", getUsersRoute);
app.use("/api", loginRoute);
app.use("/api", getToDoListByIdRoute);
app.use("/api", addToDoListByIdRoute);
app.use("/api", deleteToDoListByIdRoute);
app.use("/api", editToDoListByIdRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    knex.raw("SELECT 1+1 AS result")
        .then(() => {
            console.log("Connected to the database successfully.");
        })
        .catch((error) => {
            console.error("Database connection error:", error);
        });
});