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
        default:'teacher'
    }

}, {timestamps:true,})
const UserModel=mongoose.model('teacher',UserSchema)

module.exports=UserModel