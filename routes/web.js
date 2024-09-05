const express = require("express")
const FrontController = require("../controller/FrontController")
const AdminController = require("../controller/admin/AdminController")
const route = express.Router()



route.get('/home',FrontController.home)
route.get('/about',FrontController.about)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',FrontController.contact)

//insert Data
route.post('/userInsert',FrontController.userInsert)



//admincontroller
route.get('/admin/dashboard',AdminController.dashboard)
route.get('/admin/addstudent',AdminController.display)
route.get('/admin/adduser',AdminController.adduser)
route.get('/admin/views/User/:id',AdminController.viewsUser)
route.get('/admin/edit/User/:id',AdminController.EditUser)






module.exports = route