const express = require("express");
const usuarioController = require("../controllers/usuariosController");

const router = express.Router();

router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.buscar);
router.post("/", usuarioController.criar);
router.delete("/:id", usuarioController.deletar);
router.get("/:id/calculo", usuarioController.calcular);

module.exports = router;
