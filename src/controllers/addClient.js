const knex = require('../conection/conection');
const axios = require('axios');

const addClient = async (req, res) => {
    //const {id} = req.loggedUser;
    const { nome, email, cep, numero_casa, telefone } = req.body;

    try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const endereco = `${data.logradouro},${data.bairro},${data.localidade}/${data.uf} - n.${numero_casa}`;

        await knex('clientes').insert({ nome, email, endereco, telefone });

        return res.status(201).json({ message: 'Cliente inserido com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Server internal error.' });
    }
}

module.exports = addClient;