const avaliacaoRepository = require("../repository/avaliacaoRepository");

class AvaliacaoController {
  async buscarPorUsuario(req, res) {
    try {
      const avaliacao = await avaliacaoRepository.findByUserId(req.params.userId);
      if (!avaliacao) return res.status(404).json({ erro: "Avaliação não encontrada" });
      res.json(avaliacao);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar avaliação" });
    }
  }

  async criar(req, res) {
    try {
      const avaliacao = await avaliacaoRepository.create(req.body);
      res.status(201).json(avaliacao);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao criar avaliação" });
    }
  }

  async deletar(req, res) {
    try {
      const resultado = await avaliacaoRepository.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar avaliação" });
    }
  }
}

module.exports = new AvaliacaoController();
