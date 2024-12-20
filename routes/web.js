const express = require("express")
const FrontController = require("../controller/FrontController")
const AdminController = require("../controller/admin/AdminController")
const checkAuth = require("../middleware/checkauth")
const courseController = require("../controller/coursecontroller")
const route = express.Router()
const courseModel =require("../moduls/course")

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

//profile
route.get('/profile',checkAuth,FrontController.profile)
route.post('/changePassword',checkAuth,FrontController.ChangePassword)
route.post('/updateProfile',checkAuth,FrontController.updateProfile)




//admincontroller
route.get('/admin/dashboard',checkAuth,AdminController.dashboard)
route.get('/admin/studentDisplay',checkAuth,AdminController.display)
route.get('/admin/addstudent',checkAuth,AdminController.display)
route.get('/admin/adduser',checkAuth,AdminController.adduser)
route.get('/admin/viewsUser/:id',checkAuth,AdminController.viewsUser)
route.get('/admin/editUser/:id',checkAuth,AdminController.EditUser)
route.post('/admin/UpdateUser/:id',checkAuth,AdminController.UpdateUser)
route.get('/admin/deleteUser/:id',checkAuth,AdminController.deleteUser)
route.post('/admin/userInsert',checkAuth,AdminController.userInsert)


route.post('/verifylogin',FrontController.verifylogin)


//forget password
route.post('/forgot_password',FrontController.forgotpassword)
//admincourse display

route.get('/admin/coursedisplay',checkAuth,AdminController.coursedisplay)
route.get('/admin/courseView',checkAuth,AdminController. courseView )


//status update
route.post("/admin/statusupdate/id",AdminController.statusupdate)





module.exports = route