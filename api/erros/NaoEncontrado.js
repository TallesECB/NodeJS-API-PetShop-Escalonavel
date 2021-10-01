class NaoEncontrado extends Error {
    constructor(nome) {
        const mensagem = `Fornecedor não foi encontrado!`
        super(mensagem)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado