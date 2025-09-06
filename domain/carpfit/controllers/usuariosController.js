const usuarioRepository = require("../repository/usuariosRepository");
const avaliacaoRepository = require("../repository/avaliacaoRepository");

// ---------------- Funções auxiliares ----------------
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

function calcularTMBHomem(peso, altura, idade) {
  return 10 * peso + 6.25 * altura - 5 * idade + 5;
}

function calcularTMBMulher(peso, altura, idade) {
  return 10 * peso + 6.25 * altura - 5 * idade - 161;
}

function getFatorAtividade(nivel) {
  const fatores = {
    "Sedentária": 1.2,
    "Levemente ativa": 1.375,
    "Moderadamente ativa": 1.55,
    "Muito ativa": 1.725,
    "Extremamente ativa": 1.9,
  };
  return fatores[nivel] || null;
}

function calcularCalorias(gastoTotal, objetivo) {
  if (objetivo === "ganhar") {
    return gastoTotal + 500;
  } else if (objetivo === "perder") {
    return gastoTotal - 500;
  } else if (objetivo === "manter") {
    return gastoTotal;
  } else {
    return null;
  }
}

// ---------------- Controller ----------------
class UsuarioController {
  // Listar todos usuários
  async listar(req, res) {
    try {
      const usuarios = await usuarioRepository.findAll();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }

  // Buscar usuário por ID
  async buscar(req, res) {
    try {
      const usuario = await usuarioRepository.findById(req.params.id);
      if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  }

  // Criar usuário
  async criar(req, res) {
    try {
      const usuario = await usuarioRepository.create(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao criar usuário" });
    }
  }

  // Deletar usuário
  async deletar(req, res) {
    try {
      const resultado = await usuarioRepository.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar usuário" });
    }
  }

  // Calcular dados de saúde
  async calcular(req, res) {
    try {
      const userId = parseInt(req.params.id);

      // Buscar usuário
      const usuario = await usuarioRepository.findById(userId);
      if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

      // Buscar avaliação
      const avaliacao = await avaliacaoRepository.findByUserId(usuario.id);
      if (!avaliacao) return res.status(404).json({ erro: "Avaliação não encontrada" });

      // Calcular idade
      const idade = calcularIdade(usuario.nascimento);

      // Converter altura (de metros para cm, se necessário)
      const altura = usuario.altura * 100;
      const peso = usuario.peso;

      // Calcular TMB
      let tmb;
      if (usuario.sexo === "M") {
        tmb = calcularTMBHomem(peso, altura, idade);
      } else if (usuario.sexo === "F") {
        tmb = calcularTMBMulher(peso, altura, idade);
      } else {
        return res.status(400).json({ erro: "Sexo inválido! Use 'M' ou 'F'." });
      }

      // Calcular gasto energético total
      const fatorAtividade = getFatorAtividade(avaliacao.nivel_atividade);
      if (!fatorAtividade) return res.status(400).json({ erro: "Nível de atividade inválido" });

      const gastoTotal = tmb * fatorAtividade;

      // Ajustar calorias pelo objetivo
      const calorias = calcularCalorias(gastoTotal, avaliacao.objetivo);
      if (!calorias) return res.status(400).json({ erro: "Objetivo inválido" });

      // Resposta final
      res.json({
        usuario: usuario.nome,
        idade,
        peso,
        altura: usuario.altura,
        sexo: usuario.sexo,
        nivel_atividade: avaliacao.nivel_atividade,
        objetivo: avaliacao.objetivo,
        tmb: Math.round(tmb),
        gastoTotal: Math.round(gastoTotal),
        calorias: Math.round(calorias),
      });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao calcular dados: " + err.message });
    }
  }
}

module.exports = new UsuarioController();
