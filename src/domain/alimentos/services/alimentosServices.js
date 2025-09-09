class AlimentosService {
  async buscarAlimento(nome) {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(nome)}&search_simple=1&action=process&json=1`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Erro ao acessar Open Food Facts API");
    }

    const data = await res.json();
    if (!data.products || !data.products.length) return null;

    return data.products.slice(0, 5).map((p) => ({
      nome: p.product_name_pt || p.product_name || "Sem nome",
      calorias: p.nutriments?.["energy-kcal_100g"] ?? null,
      proteina: p.nutriments?.["proteins_100g"] ?? null,
      carboidratos: p.nutriments?.["carbohydrates_100g"] ?? null
    }));
  }
}

module.exports = new AlimentosService();
