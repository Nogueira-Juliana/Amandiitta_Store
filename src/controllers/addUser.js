const knex = require('../conection/conection')
const bcrypt = require('bcrypt')

const addUser = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome && !email && !senha) {
        return res.status(400).json({ message: 'Campos nome, email e senha são obrigatórios' })
    }
    const existEmail = await knex('usuarios').where({ email }).first()
    if (existEmail) {
        return res.status(409).json({ message: 'Já existe cadastro com esse email' })
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const user = {
        nome,
        email,
        senha: senhaCriptografada
    }

    try {
        const newUser = await knex('usuarios').insert(user)

        const { senha: _, ...dataUser } = user
        return res.status(200).json(dataUser)
    } catch (error) {
        return res.status(500).json({ message: 'Serer internal error.' });
    }
}


const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const user = await knex('usuarios').where({ email }).first()
        if (!user) {
            return res.status(404).json({ message: 'Email ou senha inválidos' })
        }

        const password = await bcrypt.compare(senha, user.senha)
        if (!password) {
            return res.status(400).json({ message: 'Email ou senha inválidos' })
        }

        return res.status(200).json({ message: 'Usário logado' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server internal error.' });
    }
}

module.exports = {
    addUser,
    login
}