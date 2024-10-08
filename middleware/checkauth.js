const jwt = require('jsonwebtoken')
const UserModel=require('../moduls/user')
const { verifylogin } = require('../controller/FrontController')


const checkAuth = async(req,res,next)=>{
    // console.log("hello auth")
    const{token}=req.cookies
    //console.log(token)
    if(!token){
        req.flash('error','unauthorised user please login')
        res.redirect('/')
    }else{
        const verifyToken=jwt.verify(token,'ewryiyuuoiuigfgfh')
        //console.log(verifyToken)
        const data = await UserModel.findOne({_id:verifyToken.ID})
        console.log(data)
        req.userdata=data
        next();   //next method route per pahucha dega
    }
}
module.exports = checkAuth