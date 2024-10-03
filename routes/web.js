const express = require("express")
const FrontController = require("../controller/FrontController")
const AdminController = require("../controller/admin/AdminController")
const checkAuth = require("../middleware/checkauth")
const courseController = require("../controller/coursecontroller")
const route = express.Router()

//course
route.post('/courseInsert',checkAuth,courseController.courseInsert)
route.get('/courseDisplay',checkAuth,courseController.courseDisplay)
route.get('/course/View/:id',checkAuth,courseController.courseView)
route.get('/course/Edit/:id',checkAuth,courseController.courseEdit)
route.post('/course/Update/:id',checkAuth,courseController.courseUpdate)


route.get('/home',checkAuth, FrontController.home)
route.get('/about',checkAuth,FrontController.about)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',checkAuth,FrontController.contact)

//insert Data
route.post('/userInsert',FrontController.userInsert)
route.get('/logout',FrontController.logout)



//admincontroller
route.get('/admin/dashboard',AdminController.dashboard)
route.get('/admin/studentDisplay',AdminController.display)
route.get('/admin/addstudent',AdminController.display)
route.get('/admin/adduser',AdminController.adduser)
route.get('/admin/viewsUser/:id',AdminController.viewsUser)
route.get('/admin/editUser/:id',AdminController.EditUser)
route.post('/admin/UpdateUser/:id',AdminController.UpdateUser)
route.get('/admin/deleteUser/:id',AdminController.deleteUser)
route.post('/admin/userInsert',AdminController.userInsert)


route.post('/verifylogin',FrontController.verifylogin)









module.exports = route