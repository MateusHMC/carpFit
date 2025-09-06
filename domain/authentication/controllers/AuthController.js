const authRepository = require("../repository/AuthRepository");

const register = async (req, res) => {
  const { nome, senha, confirmarSenha } = req.body;

  if (!nome || !senha || !confirmarSenha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos" });
  }

  if (senha !== confirmarSenha) {
    return res.status(400).json({ mensagem: "As senhas não conferem" });
  }

  try {
    const existingUser = await authRepository.getUserByName(nome);
    if (existingUser) {
      return res.status(400).json({ mensagem: "Usuário já existe" });
    }

    const newUser = await authRepository.createUser(nome, senha);
    return res
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso!", user: newUser });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor ao tentar cadastrar usuário" });
  }
};

const login = async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const user = await authRepository.validateUser(nome, senha);

    if (!user) {
      return res
        .status(401)
        .json({ mensagem: "Usuário ou senha inválidos!" });
    }

    req.session.user = { id: user.id, nome: user.nome };

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      user: { id: user.id, nome: user.nome },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor ao tentar fazer login!" });
  }
};

module.exports = { register, login };
