const knex = require('../conection/conection')

const addProduct = async (req, res) => {
    const { descricao, qtd_estoque, valor, imagem, fornecedor_id } = req.body

    if (!descricao && qtd_estoque && valor && imagem && fornecedor_id) {
        return res.status(409).json({ messaage: 'Todos os campos devem ser preenchidos' })
    }

    try {
        const product = {
            descricao,
            qtd_estoque,
            valor,
            imagem,
            fornecedor_id
        }

        const existProduct = await knex('produtos').where({ descricao }).first()
        if (existProduct) {

            return res.status(401).json({ message: 'Já existe um produto cadastrado com essa descrição' })
        }
        if (qtd_estoque <= 0) {
            return res.status(401).json({ message: 'A quantidade de estoque deve ser maior que 0' })
        }
        if (valor <= 0) {
            return res.status(401).json({ message: 'O valor do produto deve ser maior que 0' })
        }

        const newProduct = await knex('produtos').insert(product)

        return res.status(200).json(product)


    } catch (error) {

        return res.status(500).json({ message: 'Server internal error.' })
    }
}


const getPorduct = async (req, res) => {
    try {

        const allProduct = await knex('produtos')

        if (allProduct.length === 0) {
            return res.status(404).json({ message: 'Não há produtos para serem exibidos' })
        }
        return res.status(200).json(allProduct)

    } catch (error) {
        return res.status(500).json({ message: 'Server internal error.' })
    }
}

const getPorductById = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(404).json({ message: 'Informa o numero de identificação do produto' })
        }

        const existProduct = await knex('produtos').where({ id }).first()
        if (existProduct === undefined) {
            return res.status(404).json({ message: 'Nenhum produto encontrado com esse identificador' })
        }

        const product = await knex('produtos').where({ id }).first()
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ message: 'Server internal error.' })
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params


    try {
        const existProduct = await knex('produtos').where({ id }).first()
        if (existProduct === undefined) {
            return res.status(404).json({ message: 'Nenhum produto encontrado com esse identificador' })
        }

        const deleteProduct = await knex('produtos').where({ id }).del()
        return res.status(200).json({ message: 'Produto deletado com sucesso!' })

    } catch (error) {
        return res.status(500).json({ message: 'Server internal error.' })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { descricao, qtd_estoque, valor, imagem, fornecedor_id } = req.body

    try {
        const existProduct = await knex('produtos').where({ id }).first()
        if (existProduct === undefined) {
            return res.status(404).json({ message: 'Nenhum produto encontrado com esse identificador' })
        }


        if (qtd_estoque <= 0) {
            return res.status(400).json({ message: 'Quantdade de estoque deve ser maior que 0' })
        }
        if (valor <= 0) {
            return res.status(400).json({ message: 'O valor do produto deve ser maior que 0' })
        }

        const newProduct = {
            descricao,
            qtd_estoque,
            valor,
            imagem,
            fornecedor_id
        }

        const editProduct = await knex('produtos').where({ id }).update(newProduct)

        return res.status(200).json(newProduct)

    } catch (error) {
        return res.status(500).json({ message: 'Server internal error.' })
    }
}

module.exports = {
    addProduct,
    getPorduct,
    getPorductById,
    deleteProductById,
    updateProduct
}