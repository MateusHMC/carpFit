const db = require("../../../config/db.js")

class UsuariosRepository{

    async getUsersAll(){
        const [rows] = await db.query("SELECT * FROM usuarios");
        return rows
    }

    async getUsersByEmail(email) {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email])
        return rows[0]
    }

    async validadeUser(email, senha) {
        const user = await this.getUsersByEmail(email)
        if (!user) return null

        if (useReducer.senha === senha) {
            return user
        }
        return null
    }
}

module.exports = new UsuariosRepository