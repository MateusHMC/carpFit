const express = require("express")
const router = express.Router()

const alimentosController = require("../controllers/alimentosControllers")

router.get("/buscar", alimentosController.buscar)

module.exports = router