const express = require('express');
const { addProduct, getPorduct, getPorductById, deleteProductById, updateProduct } = require('../controllers/addProduct');


const productRouter = express()

productRouter.post('/newproduct', addProduct)
productRouter.get('/product', getPorduct)
productRouter.get('/product/:id', getPorductById)
productRouter.patch('/product/:id', updateProduct)
productRouter.delete('/product/:id', deleteProductById)

module.exports = productRouter