const avaliacaoRepository = require("../repository/avaliacaoRepository");

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

function calculoImc(peso,altura) {
    if(!peso || !altura) {
        throw new Error("Peso e altura são obrigatorios")
    }

    const imc = peso / (altura * altura)

    let classificacao;
    if(imc < 18.5) classificacao = "Abaixo do peso";
    else if(imc < 25) classificacao = "peso normal";
    else if(imc < 30) classificacao = "sobrepeso"
    else if(imc < 35) classificacao = "obesidade grau I"
    else if(imc < 40) classificacao = "obesidade grau II"
    else classificacao = "obesidade grau III"
}
    

class UsuariosServices{
    async calcular(req, res) {
        try {
          const userId = parseInt(req.params.id);
    
          const usuario = await usuarioRepository.findById(userId);
          if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    
          const avaliacao = await avaliacaoRepository.findByUserId(usuario.id);
          if (!avaliacao) return res.status(404).json({ erro: "Avaliação não encontrada" });
    
          const idade = calcularIdade(usuario.nascimento);
    
          const altura = usuario.altura * 100;
          const peso = usuario.peso;
    
          let tmb;
          if (usuario.sexo === "M") {
            tmb = calcularTMBHomem(peso, altura, idade);
          } else if (usuario.sexo === "F") {
            tmb = calcularTMBMulher(peso, altura, idade);
          } else {
            return res.status(400).json({ erro: "Sexo inválido! Use 'M' ou 'F'." });
          }
    
          const fatorAtividade = getFatorAtividade(avaliacao.nivel_atividade);
          if (!fatorAtividade) return res.status(400).json({ erro: "Nível de atividade inválido" });
    
          const gastoTotal = tmb * fatorAtividade;
    
          const calorias = calcularCalorias(gastoTotal, avaliacao.objetivo);
          if (!calorias) return res.status(400).json({ erro: "Objetivo inválido" });
    
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

