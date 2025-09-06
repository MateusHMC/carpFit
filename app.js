const express = require("express");
require("dotenv").config();

const usuarioRoutes = require("./domain/carpfit/routers/usuariosRoute");
const avaliacaoRoutes = require("./domain/carpfit/routers/avaliacaoRoute");

const app = express();
app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use("/avaliacoes", avaliacaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
