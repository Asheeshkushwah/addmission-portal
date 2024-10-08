const courseModel = require('../../moduls/course')
const UserModel = require('../../moduls/user')

class AdminController {

    static dashboard = async (req, res) => {
        try {
            const { name, image } = req.userdata
            //console.log(req.userdata)
           res.render('admin/dashboard', { n: name, i: image })

        } catch (error) {
            console.log(error)
        }
    }

    static display = async (req, res) => {
        try {
            const { name, image } = req.userdata

            const data = await UserModel.find()
            res.render('admin/display', { d: data, n: name, i: image })
            // console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    static adduser = async (req, res) => {
        try {
            const { name, image } = req.userdata
            res.render('admin/adduser', { n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }

    static viewsUser = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id)
            const { name, image } = req.userdata
            const data = await UserModel.findById(id)
            // console.log(data)
            res.render('admin/viewsUser', { d: data, n: name, i: image });
        } catch (error) {
            console.log(error)
        }
    }
    static EditUser = async (req, res) => {
        try {
            const id = req.params.id;
            const { name, image } = req.userdata
            // console.log(id)
            const data = await UserModel.findById(id)
            console.log(data)
            res.render('admin/EditUser', { d: data, n: name, i: image });
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

    static userInsert = async (req, res) => {
        try {
            const { n, e, p } = req.body

            const result = new UserModel({
                name: n,
                email: e,
                password: p
            })
            await result.save()
            res.redirect('/admin/studentDisplay')

        } catch (error) {
            console.log(error)
        }
    };


    ///course display

    static coursedisplay = async (req, res) => {
        try {
            const { name, image } = req.userdata
            const data = await courseModel.find()
            // console.log(id)
            res.render('admin/course/display', { d: data, n: name, i: image })
        } catch (errror) {
            console.log(error)
        }
    }

    static courseView = async (req, res) => {
        try {
            const { name, image } = req.userdata
            const id = req.params.id;
            // console.log(id)
            const data = await CourseModel.findById(id)
            // console.log(data)
            res.render('admin/course/View', { d: data,n:name,i:image });
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = AdminController