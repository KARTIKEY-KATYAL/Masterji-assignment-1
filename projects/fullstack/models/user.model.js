import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true
    },
    Password:{
        type : String
    },
    isVerified:{
        type : Boolean,
        default : false
    },
    PasswordresetToken:{
        type : String,
        require : true
    },
    PasswordresetExpiry:{
        type : Date
    },
    VerificationToken:{
        type : String
    }
})

const User = mongoose.model("user",userSchema)

export default User