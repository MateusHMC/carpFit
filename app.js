require=("dotenv").config({ path: "../.env" });
const express=require("express")
const app=express();
const PORT=process.env.PORT;
const routesUsuario=require("./domain/carpfit/routers/usuariosRoute")
const cors=require("cors")
app.use(cors())
app.use(express.json)

app.use("/", routesUsuario)

app.listen(PORT,()=>{
    console.log("Servidor ligado!")
})