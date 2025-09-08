const fetch = require("node-fetch");

class AlimentosService {
  async buscarAlimento(nome) {
    const url = `http://localhost:8080/api/alimentos?nome=${encodeURIComponent(nome)}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Erro ao acessar Nutri-API");
    }
    const data = await res.json();

    if (!data.length) return null;

    return data.slice(0, 5).map(p => ({
      nome: p.nome || "Sem nome",
      calorias: p.calorias ?? null,
      proteina: p.proteina_g ?? null,
      carboidratos: p.carboidratos_g ?? null
    }));
  }
}

module.exports = new AlimentosService();