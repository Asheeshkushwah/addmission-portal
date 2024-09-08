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
            const data = await UserModel.find()
            res.render('admin/display', { d: data })
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

    static viewsUser = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id)
            const data = await UserModel.findById(id)
            console.log(data)
            res.render('admin/viewsUser', { d: data });
        } catch (error) {
            console.log(error)
        }
    }
    static EditUser = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id)
            const data = await UserModel.findById(id)
            console.log(data)
            res.render('admin/EditUser', { d: data });
        } catch (error) {
            console.log(error)
        }
    }
    static UpdateUser = async (req, res) => {
        try {
            const id = req.params.id;
            const { n, e, p } = req.body
            // console.log(id)
            const data = await UserModel.findByIdAndUpdate(id, {
                name: n,
                email: e,
                password: p
            })
            res.redirect('/admin/studentDisplay')  //route

        } catch (error) {
            console.log(error)
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id)
            const data = await UserModel.findByIdAndDelete(id)
            res.redirect('/admin/studentDisplay')  //route

        } catch (error) {
            console.log(error)
        }
    }






}
module.exports = AdminController