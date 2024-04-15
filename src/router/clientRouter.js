const express = require('express');
const addClient = require('../controllers/addClient');
const dataRegisterValidation = require('../middlewares/dataRegisterValidation');

const clientRouter = express();

clientRouter.get('/test')
clientRouter.post('/newclient', dataRegisterValidation, addClient);



module.exports = clientRouter;