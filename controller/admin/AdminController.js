const UserModel = require('../../moduls/user')

class AdminController {
    static dashboard = async (req, res) => {
        try {
            res.render('admin/dashboard')
        } catch (errror) {
            console.log(error)
        }
    }

    static display = async (req, res) => {
        try {
            const data =await UserModel.find()
            res.render('admin/display',{d:data})
            // console.log(data)
           
        } catch (error) {
            console.log(error)
        }
    }

   static adduser = async (req, res) => {
    try {
        res.render('admin/adduser')
    } catch (error) {
        console.log(error)
    }
}


}
module.exports = AdminController