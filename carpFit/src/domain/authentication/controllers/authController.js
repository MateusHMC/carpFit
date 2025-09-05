const authRepository = require("../repositorys/userAuthRepository")

const getLogin = async (req,res) => {
    const {email, senha} = req.body

    try{
        const user = await authRepository.validateUser(email, senha);

        if (!user) {
            return res.status(401).json({ mensagem: "Usuário não autorizado !"})
        }

        req.session.user = { id: user.id, email: user.email }
        return res.status(200).json({ mensagem: "Login realizado com sucesso", user})
    } catch(err) {
        console.error("Erro no login", err)
        return res.status(500).json({ mensagem: "Erro no servidor ao tentar fazer o login !"})
    }
}

module.exports = { getLogin }