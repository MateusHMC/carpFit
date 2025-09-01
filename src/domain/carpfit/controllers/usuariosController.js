const usuarioRepository = require("../repositories/usuarioRepository");
const avaliacaoRepository = require("../repositories/avaliacaoRepository");
 
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
    "Extremamente ativa": 1.9
  };
  const fator = fatores[nivel];
  if (!fator) throw new Error("Nível de atividade inválido");
  return fator;
}
 
function calcularCalorias(gastoTotal, objetivo) {
  const ajustes = {
    "ganhar": gastoTotal + 500,
    "perder": gastoTotal - 500,
    "manter": gastoTotal
  };
  const calorias = ajustes[objetivo];
  if (calorias === undefined) throw new Error("Objetivo inválido");
  return calorias;
}
 
class UsuarioController {
  async calcular(req, res) {
    let usuario;
    try {
      const userId = parseInt(req.params.id);
      usuario = await usuarioRepository.findById(userId);
      if (!usuario) throw new Error("Usuário não encontrado");
    } catch (err) {
      return res.status(404).json({ erro: err.message });
    }
 
    let avaliacao;
    try {
      avaliacao = await avaliacaoRepository.findByUserId(usuario.id);
      if (!avaliacao) throw new Error("Avaliação não encontrada");
    } catch (err) {
      return res.status(404).json({ erro: err.message });
    }
 
 
    let tmb;
    try {
      if (usuario.sexo === "M") {
        tmb = calcularTMBHomem(usuario.peso, usuario.altura, idade);
      } else if (usuario.sexo === "F") {
        tmb = calcularTMBMulher(usuario.peso, usuario.altura, idade);
      } else {
        throw new Error("Sexo inválido! Use 'M' ou 'F'.");
      }
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao calcular TMB: " + err.message });
    }
 
    let fatorAtividade;
    try {
      fatorAtividade = getFatorAtividade(avaliacao.nivel_atividade);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
 
    let gastoTotal;
    try {
      gastoTotal = tmb * fatorAtividade;
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao calcular Gasto Energético Total: " + err.message });
    }
 
 
    let calorias;
    try {
      calorias = calcularCalorias(gastoTotal, avaliacao.objetivo);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
 
    try {
      res.status(200).json({
        usuario: usuario.nome,
        idade,
        peso: usuario.peso,
        altura: usuario.altura,
        sexo: usuario.sexo,
        nivel_atividade: avaliacao.nivel_atividade,
        objetivo: avaliacao.objetivo,
        tmb: Math.round(tmb),
        gastoTotal: Math.round(gastoTotal),
        calorias: Math.round(calorias)
      });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao retornar dados: " + err.message });
    }
  }
}
 
module.exports = new UsuarioController();
 
 