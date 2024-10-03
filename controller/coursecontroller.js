const courseModel = require('../moduls/course')
class courseController {
static courseInsert=async(req,res)=>{
    try {
        const {id} = req.userdata
        const{name,email,phone,dob,address,gender,qualification,course}= req.body
        const result = new courseModel({
            name:name,
            email:email,
            phone:phone,
            dob:dob,
            address:address,
            gender:gender,
            qualification:qualification,
            course:course,
            user_id:id
        })
        res.redirect('/courseDisplay')
        await result.save()
    } catch (error) {
       console.log(error) 
    }
}
static courseDisplay=async(req,res)=>{
    try {
        const {id,name,image} = req.userdata 
        const data = await courseModel.find()
        // console.log(data)
        res.render("course/Display", {d:data,n:name,i:image })
    } catch (error) {
        console.log(error)
    }
}
static courseView =async(req,res)=>{
    try {
        const id = req.params.id
        const {name,image} = req.userdata 
        const data = await courseModel.findById(id)
        // console.log(data)
        res.render("course/View",{d:data,n:name,i:image })
    } catch (error) {
        console.log(error)

    }
}

static courseEdit=async(req,res)=>{
    try {
        const id = req.params.id
        const {name,image} = req.userdata
        // console.log(id)
        const data = await courseModel.findById(id)
        // console.log(data)
        res.render('course/Edit', { d:data,n:name,i:image}            
        )
    } catch (error) {
        console.log(error)

    }
}
static courseUpdate=async(req,res)=>{
    try {
        const id = req.params.id
        const{name,image} = req.userdata
        const data = await courseModel.findByIdAndUpdate(id)
        // console.log(data)
        res.render('course/Update',{d:data,n:name,i:image})
    } catch (error) {
        console.log(error)
   
    }
}
static courseDelete=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
  
    }
}
}

module.exports = courseController
