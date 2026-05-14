import { getProductsService } from "../services/products.service.js"

export const getProductsController = async (req, res) => {

    const [error, products] = await getProductsService()
    if(error){
        return res.status(500).json({ message: error.message })
    }
    res.json(products)
    
}

export const createProductController = (req,res)=>{
    res.json({ message: "Producto creado correctamente" })
}