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
        usuario.nascimento
      FROM avaliacao
      INNER JOIN usuario ON usuario.id = avaliacao.IdUsuario
      WHERE avaliacao.IdUsuario = ?;
      `,
      [userId]
    );
    return rows.length ? rows[0] : null;
  }

  async create(data) {
    const { usuario_id, nivel_atividade, objetivo } = data;
    const [result] = await db.query(
      "INSERT INTO avaliacao (usuario_id, nivel_atividade, objetivo) VALUES (?, ?, ?)",
      [usuario_id, nivel_atividade, objetivo]
    );
    return { id: result.insertId, usuario_id, nivel_atividade, objetivo };
  }

  async delete(id) {
    await db.query("DELETE FROM avaliacao WHERE id = ?", [id]);
    return { mensagem: "Avaliação deletada com sucesso" };
  }
}

module.exports = new AvaliacaoRepository();
