const UserModel = require("../moduls/user")
const cloudinary = require('cloudinary').v2

// Configuration
cloudinary.config({
    cloud_name: 'dffqenqhi',
    api_key: '156446728488459',
    api_secret: 'Q7SxB-wXsVk3xR4do0A3tSyuaVE' // Click 'View API Keys' above to copy your API secret
});
class FrontController {
    static home = async (req, res) => {
        try {
            //bad me likhna hai
            res.render('home')

        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {
            //bad me likhna hai
            res.render('about')

        } catch (error) {
            console.log(error)
        }
    }

    static login = async (req, res) => {
        try {
            //bad me likhna hai
            res.render('login' ,{msg :req.flash("success")})

        } catch (error) {
            console.log(error)
        }
    }


    static register = async (req, res) => {
        try {
            //bad me likhna hai
            res.render('register',{message:req.flash('error')})

        } catch (error) {
            console.log(error)
        }
    }

    static contact = async (req, res) => {
        try {
            //bad me likhna hai
            res.render('contact')

        } catch (error) {
            console.log(error)
        }
    }

    static userInsert = async (req, res) => {
        try {
            //console.log(req.body)
            // console.log(req.files);


            const { n, e, p, cp } = req.body
            const user = await UserModel.findOne({ email: e })
            if (user) {
                req.flash('error', 'email already axgist')
                res.redirect('/register')
            } else {
                if (n && e && p && cp) {
                    if (p == cp) {
                        const file = req.files.image
                        //console.log(file)
                        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                            folder: "profile"
                        })

                        // console.log(imageUpload) 
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: p,
                            Confirmpassword: cp,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }
                        })
                        await result.save()
                        req.flash('success', 'register successfull')
                        res.redirect('/')//route ka url
                    } else {
                        req.flash('error', 'password & confirmpassword must be same')
                        redirect('/register')
                    }
                } else {
                    req.flash('error', 'all fields are required')
                    res.redirect('/register')
                }
            }


        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = FrontController