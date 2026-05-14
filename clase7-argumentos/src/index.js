// ejemplo de process

/*
console.log(process.cwd())
console.log(process.pid)
console.log(process.platform)
console.log(process.version)
console.log(process.argv)
*/

// commander (libreria para manejar argumentos de forma mas amigable y declarativa)
// https://www.npmjs.com/package/commander

import { Command } from "commander";
import dotenv from "dotenv"

const program = new Command()

program.option("-d --development", "Variable para modo desarrollo",false)
        .option("-u --user <user>","Usuario que desea loguearse","")

program.parse()

const options = program.opts()

//console.log("options", options)

if (options.development) {
    dotenv.config({ path: ".env.dev" })
} else {
    dotenv.config({ path: ".env" })
}
console.log("puerto",process.env.PORT);
