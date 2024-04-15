const { validate } = require('email-validator');
const { parse, isValidNumber } = require('libphonenumber-js');
const knex = require('../conection/conection');
const axios = require('axios');

const dataRegisterValidation = async (req, res, next) => {
    const { nome, email, cep, numero_casa, telefone } = req.body;
    //valida dados
    if (!(nome && email && telefone && cep && numero_casa)) {
        return res.status(400).json({ error: 'Faltam informações no corpo da requisição.' });
    }
    //valida email
    if (!validate(email)) return res.status(400).json({ error: 'Campo email não é um email válido.' });

    //valida telefone
    const parsedTelefone = parse(telefone, 'BR');
    const isValid = isValidNumber(parsedTelefone);

    if (!isValid) return res.status(400).json({ error: 'Campo telefone não é um telefone válido.' });

    //valida cep e verifica se email existe no bd
    try {
        const emailExists = await knex('clientes').first().where({ email });
        if (emailExists) return res.status(400).json({ message: 'Email já cadastrado.' });
        const phonoeExists = await knex('clientes').first().where({ telefone });
        if (phonoeExists) return res.status(400).json({ message: 'Telefone já cadastrado.' });

        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (data.erro) return res.status(400).json({ message: 'Cep inválido.' });
    } catch (error) {
        return res.status(500).json(`Erro: ${error.message}`);
    }

    next()
}

module.exports = dataRegisterValidation