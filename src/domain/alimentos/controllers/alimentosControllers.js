const alimentosServices = require("../services/alimentosServices.js")

const buscar = async(req, res) =>{
    const { nome } = req.query

    if (!nome) {
        return res.status(400).json({ mensagem: "Requisição inválida: o campo 'nome' não foi fornecido"})
    }

    try {
        const resultados = await alimentosServices.buscarAlimento(nome)

        if (!resultados){
            return res.status(404).json({ mensagem: "Alimento não encontrado" })
        }

        res.status(200).json(resultados)
    } catch (err) {
        console.error("Erro no controller:",err.message)
        res.status(500).json({ mensagem: "Erro ao buscar alimento" })
    }
}

module.exports = { buscar }
