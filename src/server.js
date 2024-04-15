const express = require("express");
const routerUser = require("./router/userRouter");

const app = express();
app.use(express.json());
app.use(routerUser)

module.exports = app;