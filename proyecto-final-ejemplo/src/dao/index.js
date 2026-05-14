import dotenv from "dotenv"
dotenv.config()

export let productsDao

switch (process.env.PERSISTENCIA) {
    case "production":
        console.log('Persistencia en produccion')
        productsDao = await import("./production/products.dao.js")
        break
    case "development":
        console.log('Persistencia en desarrollo')
        productsDao = await import("./development/products.dao.js")
        break
    default:
        console.log('Persistencia en desarrollo')
        productsDao = await import("./development/products.dao.js")
        break
}