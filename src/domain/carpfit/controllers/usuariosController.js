const usuarioRepository = require("../repository/usuariosRepository");
const usuariosServices = require("../services/usuariosServices")

class UsuarioController {
  async listar(req, res) {
    try {
      const usuarios = await usuarioRepository.findAll();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }

  async buscar(req, res) {
    try {
      const usuario = await usuarioRepository.findById(req.params.id);
      if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  }

  async criar(req, res) {
    try {
      const usuario = await usuarioRepository.create(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao criar usuário" });
    }
  }

  async deletar(req, res) {
    try {
      const resultado = await usuarioRepository.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar usuário" });
    }
  }
}

module.exports = new UsuarioController();
