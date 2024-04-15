require('dotenv').config();
const express = require('express');
const { json } = require('express')
const clientRouter = require('./router/clientRouter');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');


const app = express();

app.use(json());
app.use(userRouter)
app.use(clientRouter)
app.use(productRouter)

app.listen(process.env.PORT, () => { console.log('Star Serv') })