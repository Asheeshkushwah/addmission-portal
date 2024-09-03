const mongoose =require('mongoose')

const UserSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'student'
    },
    phone:{
        type:String,
        required:true
    }

}, {timestamps:true,})
const UserModel=mongoose.model('student',UserSchema)

module.exports=UserModel