const express=require("express")
const router=express.Router();

const usuariosController = require("../controllers/usuariosController");


router.get("/:id",usuariosController.calcular)

module.exports=router