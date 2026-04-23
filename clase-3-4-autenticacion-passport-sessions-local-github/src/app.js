import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import productsRouter from "./routes/product.router.js";
import usersRouter from "./routes/user.router.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_COOKIE_KEY));

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 60 * 1000,
    }),
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});