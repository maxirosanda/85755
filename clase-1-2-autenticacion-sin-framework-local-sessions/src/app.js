import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import usersRouter from "./routes/users.routes.js";
import { engine } from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import path from 'path';
import { fileURLToPath } from 'url';
import MongoStore from "connect-mongo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.SECRET_COOKIE_KEY));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 60 * 1000
    }),
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

// Cookies ejemplos -------------------------------------------------------------------

app.get("/setCookie", (req, res) => {
    res.cookie("coderCookie", "Esta es una cookie de coder", { maxAge: 60 * 60 * 1000, signed: true });
    res.send("Cookie set");
});

app.get("/getCookie", (req, res) => {
    res.send(req.signedCookies.coderCookie);
});

app.get("/deleteCookie", (req, res) => {
    res.clearCookie("coderCookie");
    res.send("Cookie deleted");
});
// Fin Cookies ejemplos -------------------------------------------------------------------

mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});