import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/users.router.js";
import mongoose from "mongoose";
import productsRouter from "./routes/product.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

connectDB();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});