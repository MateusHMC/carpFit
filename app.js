const express = require("express");
require("dotenv").config();

const usuarioRoutes = require("../carpFit/src/domain/carpfit/routers/usuariosRoute");
const avaliacaoRoutes = require("../carpFit/src/domain/carpfit/routers/avaliacaoRoute");
const alimentosRoutes = require("../carpFit/src/domain/alimentos/routes/alimentosRoutes")

const app = express();
app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use("/avaliacoes", avaliacaoRoutes);
app.use("/alimentos", alimentosRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
