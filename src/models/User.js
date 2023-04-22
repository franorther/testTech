import mongoose from "mongoose";
import bcrypts from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    userType: {
        type: String,
        required: true
    },  
    password: {
        type: String,
        required: true
    },
})

userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcrypts.genSalt(10);
        user.password = await bcrypts.hash(user.password, salt);
        next();
    } catch (error) {
         throw new Error(error)
    }
})

userSchema.methods.comparePassword = async function(clientPass){
 return await bcrypts.compare(clientPass, this.password);
}

export const User =mongoose.model('User', userSchema)