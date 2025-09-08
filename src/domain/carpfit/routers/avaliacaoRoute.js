const express = require("express");
const avaliacaoController = require("../controllers/avaliacaoController");

const router = express.Router();

router.get("/usuario/:userId", avaliacaoController.buscarPorUsuario);
router.post("/", avaliacaoController.criar);
router.delete("/:id", avaliacaoController.deletar);

module.exports = router;
