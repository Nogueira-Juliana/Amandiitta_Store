const express = require('express');

const { addUser, login } = require('../controllers/addUser');


const userRouter = express();

userRouter.post('/newuser', addUser);
userRouter.post('/login', login);

module.exports = userRouter