import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: 'Producto Generico' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true},
    category: { type: String, default: 'General' }
})

const Product = mongoose.model('Product', productSchema)

export default Product