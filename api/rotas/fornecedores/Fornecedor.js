const TabelaFornecedor = require('./TabelaFornecedor')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar () { //inserindo na tabela, utilizando a função de validar, para verificar se os campos estão preenchidos corretamente
        this.validar()
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        }) //estamos pedindo para esperar o metodo terminar de ser executado com o 'Await

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar () { //carregando os dados do bacno de dados, através de um ID
        const encontrado = await TabelaFornecedor.pegarPorId(this.id)

        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categoria = encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar () { //atualizando dados
        await TabelaFornecedor.pegarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}
        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor == 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0) { //uma função que retorna uma lista, com o nome das chaves que o objeto possui
            throw new DadosNaoFornecidos
        } 

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)

    }

    remover () { //removendo do bacno de dados, o ID selecionado na URL
        return TabelaFornecedor.remover(this.id) 
    }

    validar () { //validando se os campos estão preenchidos corretamente
        const campos = ['empresa', 'email', 'categoria']
        campos.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}

//metodos da rota

module.exports = Fornecedor