class FrontController{
    static home =async(req,res) =>{
        try{
            //bad me likhna hai
            res.render('home')
           
        }catch(error)
        {
            console.log(error)
        }
    }

    static about =async(req,res) =>{
        try{
            //bad me likhna hai
            res.render('about')
           
        }catch(error)
        {
            console.log(error)
        }
    }

    static login =async(req,res) =>{
        try{
            //bad me likhna hai
            res.render('login')
           
        }catch(error)
        {
            console.log(error)
        }
    }


    static register =async(req,res) =>{
        try{
            //bad me likhna hai
            res.render('register')
           
        }catch(error)
        {
            console.log(error)
        }
    }

    static contact =async(req,res) =>{
        try{
            //bad me likhna hai
            res.render('contact')
           
        }catch(error)
        {
            console.log(error)
        }
    }

    
}
module.exports = FrontController