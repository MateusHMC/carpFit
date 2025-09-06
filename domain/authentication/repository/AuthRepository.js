const db = require("../../../config/db.js");

class AuthRepository {
  async createUser(nome, senha) {
    const [result] = await db.query(
      "INSERT INTO usuario (nome, senha) VALUES (?, ?)",
      [nome, senha]
    );
    return { id: result.insertId, nome };
  }

  async getUserByName(nome) {
    const [rows] = await db.query(
      "SELECT * FROM usuario WHERE nome = ?",
      [nome]
    );
    return rows[0];
  }

  async validateUser(nome, senha) {
    const user = await this.getUserByName(nome);
    if (!user) return null;


    if (user.senha === senha) {
      return user;
    }

    return null;
  }
}

module.exports = new AuthRepository();
