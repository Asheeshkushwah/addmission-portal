const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
  
    image:{
        public_id:{
            type:String,
            Required: true,
        },
        url:{
            type:String,
            Required:true,
        }
    },
    token:{
        type:String
    },
    is_verified:{
        type:Number,
        default:0
    },
    role: {
        type: String,
        default: 'user'
    },

}, {timestamps: true })
const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel