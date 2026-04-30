import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import mongoose from 'mongoose'
import { intialisePassport } from './config/passport.js'
import passport from 'passport'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))
intialisePassport()
app.use(passport.initialize())


app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

mongoose.connect(process.env.MONGO_URI)
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`)
})