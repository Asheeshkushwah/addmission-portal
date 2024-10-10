const UserModel = require("../moduls/user")
const cloudinary = require('cloudinary').v2
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

// Configuration
cloudinary.config({
    cloud_name: 'dffqenqhi',
    api_key: '156446728488459',
    api_secret: 'Q7SxB-wXsVk3xR4do0A3tSyuaVE' // Click 'View API Keys' above to copy your API secret
});
class FrontController {
    static home = async (req, res) => {
        try {
            const {name,image,email} =req.userdata
            res.render('home',{ n:name,i:image,e:email } )

        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {
            const {name,image} =req.userData;
            res.render('about',{ n:name,i:image})

        } catch (error) {
            console.log(error)
        }
    }

    static login = async (req, res) => {
        try {
            res.render("login", {
                msg: req.flash("success"),
                // message: req.flash("success"),
                msg1: req.flash("error"),

            });
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            //bad me likhna hai
            res.render('register', { message: req.flash('error') })

        } catch (error) {
            console.log(error)
        }
    }

    static contact = async (req, res) => {
        try {
            const {name,image} =req.userData;
            res.render('contact',{ n:name,i:image } )
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
                        const hashPassword = await bcrypt.hash(p, 10);
                        const file = req.files.image
                        //console.log(file)
                        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                            folder: "profile"
                        })

                        // console.log(imageUpload) 
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashPassword,
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




    static verifylogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            // console.log(req.body)
            const user = await UserModel.findOne({ email: email });
            // console.log(user)
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    if(user.role == "admin"){
                        var token = jwt.sign({ ID: user._id}, 'ewryiyuuoiuigfgfh')
                        // console.log(token)
                        res.cookie('token',token)
    
                        res.redirect('/admin/dashboard')
                    }
                    if(user.role == "user"){
                        var token = jwt.sign({ ID: user._id}, 'ewryiyuuoiuigfgfh')
                        // console.log(token)
                        res.cookie('token',token)
    
                        res.redirect('/home')
                    }
                    // token create
                   
                } else {
                    req.flash("error", "Email or password is not valid");
                    res.redirect('/home')
                }
            } else {
                req.flash("error", "you are not a registered user.");
                res.redirect("/")
            }
        } catch (error) {
            console.log(error)
        }
    }


    static logout = async (req, res) => {
        try {
            // res.send("contact page")
            res.clearCookie("token");  //clearcookies
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }

    //profile
    static profile = async (req, res) => {
        try {
          const {name,image,email}= req.userdata
          res.render("profile",{
            n:name,
            i:image,
            e:email
          })
          
        } catch (error) {
            console.log(error)
        }
    }

    static ChangePassword = async (req, res) => {
        try {
          const {id}= req.userdata;
        //  console.log(req.body)
          const {op,np,cp}=req.body;
          if(op && np && cp){
            const user = await UserModel.findById(id);
            const isMatched =await bcrypt.compare(op,user.password);
            // console.log(isMatched)
            if(!isMatched){
                req.flash("error","current password is incorrect");
                res.redirect("/profile")
            }else{
                if (np != cp){
                    req.flash("error","password does not match");
                    res.redirect("/profile");
                }else{
                    const newHashPassword =await bcrypt.hash(np,10);
                    await UserModel.findByIdAndUpdate(id ,{
                        password:newHashPassword,
                    });
                    req.flash("success","password updated successfully");
                    res.redirect("/")
                }
            }
          }else{
            req.flash("error" ,"all fields are required");
            res.redirect("/profile");
          }
          
        } catch (error) {
            console.log(error)
        }
    }

    static updateProfile =async(req,res)=>{
        try{
            const {id} =req.userdata;
            const {name,emial}=req.body;
            if(req.files){
                const user =await UserModel.findById(id);
                const imageID =user.image.public_id;
                console.log(imageID);

                //deleting image for cloudnary
                await cloudinary.uploader.destroy(imageID);
                //new image update
                const imagefile =req.files.image;
                const imageUpload =await cloudinary.uploader.upload(
                    imagefile.tempFilePath,
                    {
                        folder:"userprofile",
                    }
                );
                var data ={
                    name:name,
                    email:emial,
                    image:{
                        public_id:imageUpload.public_id,
                        url:imageUpload.secure_url,
                    },
                };
            }else{
                var data ={
                    name:name,
                    email:email,
                };
            }
            await UserModel.findByIdAndUpdate(id,data);
            req.flash("success","update profile successfully");
            res.redirect("/profile")
        }catch(error){
            console.log(error);
        }

    } ;
    
}
    


module.exports = FrontController