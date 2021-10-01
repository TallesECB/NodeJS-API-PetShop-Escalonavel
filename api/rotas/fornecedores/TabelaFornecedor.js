const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar () { //listagem
        return Modelo.findAll({raw: true})
    },

    inserir(fornecedor) { //inserindo
        return Modelo.create(fornecedor)//metodo create do sequelize
    },

    async pegarPorId(id) { //buscando pelo ID
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado()
        }

        return encontrado
    },

    atualizar(id, dadosParaAtualizar) { //atualizando pelo id
        return Modelo.update(
            dadosParaAtualizar, 
            {
                where: {id: id}
            }
        )
    },

    remover (id) { //removendo pelo id
        return Modelo.destroy ({
            where: {id: id}
        })
    }

    //funções da rota
}