const express = require("express")
const FrontController = require("../controller/FrontController")
const route = express.Router()

// route.get("/",(req,res) =>{
//     res.send('hello world')
// })
// route.get('/aboutt',(req,res) =>{
//     res.send('about page')
// })

route.get('/home',FrontController.home)
route.get('/about',FrontController.about)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',FrontController.contact)



module.exports = route