// 'use client '
import mongoose , {Schema} from  "mongoose";


const userSchema =  new mongoose.Schema({
    username: {
        type : String,
        required: [true , "please fill the username"],
        unique: true,
    },
    email: {
        type : String,
        required: [true, "please fill the email"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpairy: Date,
    verifyToken: String,
    VerifyTokenExpairy: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User 