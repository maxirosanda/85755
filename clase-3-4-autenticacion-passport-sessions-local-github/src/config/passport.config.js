import passport from "passport";
import local from "passport-local"
import GitHubStrategy from "passport-github2"
import User from "../models/user.model.js"
import { createHash, isValidPassword} from "../utils/bcript.js"

const LocalStrategy = local.Strategy

export const initializePassport = () => {

    passport.use("register",new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email",
    },async(req,userName,password,done)=>{
        const { name } = req.body
        if(!name){
            return done(null,false,{message:"Name is required"})
        }
        try {
            const user = await User.findOne({email:userName})

            if(user){
                return done(null,false,{message:"User already exists"})
            }

            const hashedPassword = await createHash(password)
        
            const newUser = {

                name,
                email:userName,
                password:hashedPassword,
            }

            const userCreated = await User.create(newUser)
            return done(null,userCreated)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login',new LocalStrategy({
        usernameField:"email",
    },async(userName,password,done)=>{
        try {
            const user = await User.findOne({"email":userName})
            
            if(!user){
                return done(null,false,{message:"User not found"})
            }

            const isPasswordValid = await isValidPassword(password,user.password)

            if(!isPasswordValid){
                return done(null,false,{message:"Invalid password"})
            }

            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use("github",new GitHubStrategy({
        clientID:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        callbackURL:process.env.GITHUB_CALLBACK_URL,
    },async (_,__,profile,done)=>{
        try {
            const user = await User.findOne({githubId:profile._json.id})
            if(user) done(null,user)
            const newUser = {
                name:profile._json.name,
                email:"",
                githubId:profile._json.id,
                password:"",
                role:"user"
            }
            const result = await User.create(newUser)
            done(null,result)
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await User.findById(id)
            done(null,user)
        } catch (error) {
            done(error)
        }
    })
}