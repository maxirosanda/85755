import { productsDao } from "../dao/index.js"

export const getProductsService = async () => {
    const [error, products] = await productsDao.getAll()
    if (error) {
        return [error, null]
    }
    return [null, products]
}