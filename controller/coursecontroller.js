const courseModel = require('../moduls/course')
const nodemailer=require("nodemailer")
class courseController {
    static courseInsert = async (req, res) => {
        try {
            const { id } = req.userdata
            const { name, email, phone, dob, address, gender, qualification, course } = req.body
            const result = new courseModel({
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                address: address,
                gender: gender,
                qualification: qualification,
                course: course,
                user_id: id
            })
            res.redirect('/courseDisplay')
            await result.save()
            this.sendEmail(name,email,course)
        } catch (error) {
            console.log(error)
        }
    }
    static courseDisplay = async (req, res) => {
        try {
            const { id, name, image } = req.userdata
            const data = await courseModel.find({user_id:id})
            // console.log(data)
            res.render("course/Display", { d: data, n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }
    static courseView = async (req, res) => {
        try {
            const id = req.params.id
            const { name, image } = req.userdata
            const data = await courseModel.findById(id)
            // console.log(data)
            res.render("course/View", { d: data, n: name, i: image })
        } catch (error) {
            console.log(error)

        }
    }

    static courseEdit = async (req, res) => {
        try {
            const id = req.params.id
            const { name, image } = req.userdata
            // console.log(id)
            const data = await courseModel.findById(id)
            // console.log(data)
            res.render('course/Edit', { d: data, n: name, i: image }
            )
        } catch (error) {
            console.log(error)

        }
    }
    static courseUpdate = async (req, res) => {
        try {
            const { image } = req.userdata;
            const id = req.params.id;
            const {
                name,
                email,
                phone,
                dob,
                address,
                gender,
                qualification,
                course,
            } = req.body; // Correct destructuring

            // Update course data by ID
            const data = await courseModel.findByIdAndUpdate(id, {
                name,
                email,
                phone,
                dob,
                address,
                gender,
                qualification,
                course,
            });

            res.redirect("/courseDisplay");
        } catch (error) {
            console.log(error);
        }

    }
    static courseDelete = async (req, res) => {
        try {

        } catch (error) {
            console.log(error)

        }
    }
     
    static sendEmail = async(name,email,course) =>{
         console.log(name,email,course)
        //connect with the smpt server

let transporter = await nodemailer.createTransport({
    host:"smpt.gmail.com",
    port:587,
    auth:{
        user:"asheesh94065@gmail.com",
        pass:""
    },
});
let info = await transporter.sendMail({
    from:"test@gmail.com",   //sender address
    to:email,   //list of reciever
    subject:`Course ${course}`,  //subject line
    text:"hello",   //plain text body
    html:`<b>${name}</b> Course <b>${course}</b> insert successful!<br>`,  //html body
})

    };
}

module.exports = courseController
