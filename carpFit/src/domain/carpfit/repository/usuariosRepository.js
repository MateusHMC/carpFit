const db = require("../../../config/db")

class AvaliacaoRepository {
    async findByUserId(userId) {
        const [rows] = await db.query(`
    SELECT 
      avaliacao.id AS avaliacao_id,
      avaliacao.usuario_id,
      avaliacao.nivel_atividade,
      avaliacao.objetivo,
      usuario.nascimento
    FROM avaliacao
    INNER JOIN usuario ON usuario.id = avaliacao.usuario_id
    WHERE avaliacao.usuario_id = ?;
    `, [userId])
    
    return rows[0];
    }
}
 
class usuarioRepositoty{
    async findAll(){
 
        const[row] = await db.query("SELECT * FROM usuario;")
 
        return row
 
    }
 
    async findById(id){
        const [row] = await db.query("SELECT * FROM usuario WHERE id=?",[id])
        return row[0]
    }
 
    async create(data) {
      const { nome, peso, altura, sexo, nascimento } = data;
    
      const [result] = await db.query(
        "INSERT INTO usuario (nome, nascimento, sexo, peso, altura) VALUES (?, ?, ?, ?, ?)",
        [nome, nascimento, sexo, peso, altura]
      );
    
      return { id: result.insertId, nome, nascimento, sexo, peso, altura };
    }
    
    async delete(id){
 
        db.query("DELETE FROM usuario WHERE id=?",[id])
        return({mensagem:"Usuario deletado com sucesso"})
    }
}
 

(async () => {
    const crf = new usuarioRepositoty();
    try{
        const dado = {nome:"alexandre", peso:78.30, altura:1.80, sexo:"M", nascimento:"2000-03-20"}
        const newUsuario = await crf.create(dado)
        console.log("Novo usuario criado com sucesso: ", newUsuario)
    } catch(erro) {
        console.error("Erro ao criar usuario", erro);
    }
})();
 
module.exports = new usuarioRepositoty();