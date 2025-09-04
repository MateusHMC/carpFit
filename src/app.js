require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const routesUsuario = require("./domain/carpfit/routers/usuariosRoute");

app.use(cors());
app.use(express.json());

app.use("/", routesUsuario);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
