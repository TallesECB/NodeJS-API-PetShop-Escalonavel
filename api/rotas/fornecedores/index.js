const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor
const Serializador = require('../../Serializador')

roteador.get('/', async (requisicao, resposta) => { //listar
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => { //inserir, utilizando o campo de validação para confirmar se os campos estão preenchidos corretamente, nas funções do fornecedor
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar() //pedindo para esperar o metodo criar ser realizado
        resposta.status(201)
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    } catch(erro) {
        proximo(erro)
    }
})

roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => { //buscando por ID
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        resposta.status(200)
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    } catch (erro) { //tratando a mensagem de erro
        proximo(erro)
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => { //atualizando dados
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
    
        const fornecedor = new Fornecedor(dados)
    
        await fornecedor.atualizar()
        resposta.status(204)
        resposta.end()
    
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async (requisicao, resposta, proximo) => { //deletando através do ID passado na URL
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

//Rotas da Nossa API

module.exports = roteador 