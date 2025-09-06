function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ mensagem: "Acesso negado! Faça login primeiro" });
  }
}

module.exports = authMiddleware;
