const db = require("../../../config/db")

class UsuarioRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM usuario;")
    return rows
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM usuario WHERE id = ?", [id])
    return rows[0]
  }

  async create(data) {
    const { nome, peso, altura, sexo, nascimento } = data

    const [result] = await db.query(
      "INSERT INTO usuario (nome, nascimento, sexo, peso, altura) VALUES (?, ?, ?, ?, ?)",
      [nome, nascimento, sexo, peso, altura]
    )

    return { id: result.insertId, nome, nascimento, sexo, peso, altura }
  }

  async delete(id) {
    await db.query("DELETE FROM usuario WHERE id = ?", [id])
    return { mensagem: "Usuário deletado com sucesso" }
  }
}

module.exports = new UsuarioRepository()
