const mongoose = require('mongoose')
const Local__Url ='mongodb://127.0.0.1:27017/ADDMISSION PORTEL'

const connectDb =()=>{
    return mongoose.connect(Local__Url)
    .then(()=>{
        console.log("connect success")
    }).catch((error)=>{
        console.log(error)

    })
}
module.exports =connectDb