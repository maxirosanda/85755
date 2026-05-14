import express from "express";
import {fork} from "child_process"

const app = express()

app.get("/",(req,res) => {
    res.send("Hola mundo")
})

app.get("/operacion-compleja",(req,res)=>{
    let suma = 0;
    for(let i = 0; i < 5e10; i++) {
        suma += i;
    }
    res.send(`Suma realizada: ${suma}`)
})

app.get("/operacion-compleja-fork",(req,res)=>{
    const child = fork("./src/operacion-compleja.js")
    child.send("start")
    child.on("message",(suma) => {
        res.send(`Suma realizada con fork: ${suma}`)
    })
})

app.listen(process.env.PORT || 3000,() => {
    console.log("Server running on port ",process.env.PORT || 3000)
})

//spawn vs exec (proxima clase)
