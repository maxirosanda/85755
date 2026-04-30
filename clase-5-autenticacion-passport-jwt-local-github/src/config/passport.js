import passport from "passport"
import passportJwt from "passport-jwt"
import User from "../models/user.model.js"
import { Strategy as LocalStrategy } from "passport-local"
import { hashPassword, comparePassword } from "../utils/bcrypt.js"
import { Strategy as GithubStrategy } from "passport-github2"
import dotenv from "dotenv"

dotenv.config()

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt

const cookieExtractor = (req) => {
    return req && req.cookies ? req.cookies["token"] : null
}

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
};

export const intialisePassport = () => {
    passport.use("jwt", new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload)
            const user = await User.findOne({ email: jwt_payload.email })
            console.log(user)
            if (!user) {
                return done(null, false, { message: "No existe usuario con ese correo" })
            }
            return done(null, user)
        } catch (error) {
            return done(error, false, { message: "Error al obtener el usuario" })
        }
    }))

    passport.use("register", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },async (req, username, password, done) => {

    const { name, role } = req.body
    try {
        const user = await User.findOne({ email: username })
    if (user) {
        return done(null, false, { message: "El usuario ya existe" })
    }
    const hashedPassword = await hashPassword(password)
    const newUser = {
        email:username,
        password: hashedPassword,
        name: name || 'Username',
        role: role || 'user'
    }
    const userCreated = await User.create(newUser)
    const userForToken = {
        email: userCreated.email, 
        name: userCreated.name, 
        role: userCreated.role, 
        _id: userCreated._id
    }
    return done(null, userForToken)
    } catch (error) {
        console.error("Error al registrar usuario:", error)
        return done(error, false, { message: "Error interno del servidor" })
    }
    }))

    passport.use("login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username })
        if (!user) {
            return done(null, false, { message: "No existe usuario con ese correo" })
        }
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return done(null, false, { message: "La contraseña es incorrecta" })
        }
        const userForToken = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }

        return done(null,userForToken)
        } catch (error) {
            console.error("Error al iniciar sesion:", error)
            return done(error, false, { message: "Error interno del servidor" })
        }
    }))

    passport.use("github", new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },async (_,__,profile,done)=>{
        try {
            const user = await User.findOne({ githubId:profile._json.id})

            if(user){
                const userForToken = {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    _id: user._id
                }
                return done(null, userForToken)
            }

            const newUser = {
                githubId: profile._json.id,
                name: profile._json.name || 'Username',
                role: 'user'
            }
            const userCreated = await User.create(newUser)
            const userForToken = {
                email: userCreated.email,
                name: userCreated.name,
                role: userCreated.role,
                _id: userCreated._id
            }
            return done(null, userForToken)

        } catch (error) {
            console.error("Error al registrar usuario:", error)
            return done(error, false, { message: "Error interno del servidor" })
        }
    }))
}