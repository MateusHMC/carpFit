const db = require("../../../config/db");

class AvaliacaoRepository {
  async findByUserId(userId) {
    const [rows] = await db.query(
      `
      SELECT 
        avaliacao.id AS avaliacao_id,
        avaliacao.IdUsuario,
        avaliacao.nivel_atividade,
        avaliacao.objetivo,
        avaliacao.peso,
        avaliacao.data_avaliacao
        usuario.nascimento
      FROM avaliacao
      INNER JOIN usuario ON usuario.id = avaliacao.IdUsuario
      WHERE avaliacao.IdUsuario = ?
      ORDER BY avaliacao.data_avaliacao DESC
      limit 1;
      `,
      [userId]
    );
    return rows.length ? rows[0] : null;
  }

  async create(data) {
    const { usuario_id, nivel_atividade, objetivo, peso } = data;
    const [result] = await db.query(
      "INSERT INTO avaliacao (usuario_id, nivel_atividade, objetivo, peso) VALUES (?, ?, ?,?)",
      [usuario_id, nivel_atividade, objetivo]
    );
    return { id: result.insertId, usuario_id, nivel_atividade, objetivo, peso };
  }

  async delete(id) {
    await db.query("DELETE FROM avaliacao WHERE id = ?", [id]);
    return { mensagem: "Avaliação deletada com sucesso" };
  }
}

module.exports = new AvaliacaoRepository();
