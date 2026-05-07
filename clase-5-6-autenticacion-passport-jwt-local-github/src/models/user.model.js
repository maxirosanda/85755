import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String, default: 'Username' },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    githubId: { type: String },
})

const User = mongoose.model('User', userSchema)

export default User