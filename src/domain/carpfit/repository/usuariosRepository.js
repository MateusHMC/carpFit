const db = require("../../../config/db")

class usuarioRepositoty{
    async findAll(){

        const[row] = await db.query("SELECT * FROM usuario;")

        return row

    }

    async findById(id){
        const [row] = await db.query("SELECT * FROM usuario WHERE id=?",[id])
        return row[0]
    }

    async create(data){
        const[nome, peso, altura, sexo, nascimento] = data

        const [result] = await db.query("INSERT INTO usuario(nome,nascimento,sexo,peso")

        return {id:result.insertId,...data}
    }

    async delete(id){

        db.query("DELETE FROM usuario WHERE id=?",[id])
        return({mensagem:"Usuario deletado com sucesso"})
    }
}

(async () => {
    const crf = new usuarioRepositoty();
    try{
        const dado = {nome:"carlos", peso:78.30, altura:1.80, sexo:"M", nascimento:"2000-03-20"}
        const newUsuario = await crf.create(dado)
        console.log("Novo usuario criado com sucesso: ", newUsuario)
    } catch(erro) {
        console.error("Erro ao criar usuario", erro);
    }
})();

module.exports = new usuarioRepositoty();