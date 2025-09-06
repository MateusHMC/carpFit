const db = require("../../../config/db");

class UsuarioRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM usuario");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM usuario WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { nome, peso, altura, sexo, nascimento } = data;
    const [result] = await db.query(
      "INSERT INTO usuario (nome, peso, altura, sexo, nascimento) VALUES (?, ?, ?, ?, ?)",
      [nome, peso, altura, sexo, nascimento]
    );
    return { id: result.insertId, ...data };
  }

  async delete(id) {
    await db.query("DELETE FROM usuario WHERE id = ?", [id]);
    return { mensagem: "Usuário deletado com sucesso" };
  }
}

module.exports = new UsuarioRepository();
