const express = require('express')
const app = express()
const port = 2000
const web = require(('./routes/web'))
const connectDb = require('./db/connectDb')
//cookies parser
const cookieparser =require('cookie-parser')
app.use(cookieparser())


const fileupload =require('express-fileupload');



//html css set
app.set('view engine', 'ejs')
//css image link
app.use(express.static('public'))

// fileuploadimage
app.use(fileupload({
    limit: {fileSize: 50 * 1024 * 1024},
    useTempFiles: true,

}));

//connect flash and sessions
 const session =require('express-session')
 const flash = require('connect-flash')

 //message
 app.use(session({
    secret:'secret',
    cookie:{
        maxAge:60000 },
        resave:false,
        saveUninitialized:false,
 }))
 // flash message
 app.use(flash())
///connect db
connectDb()

//userinsert
app.use(express.urlencoded({ extended: true }));


//routeing
app.use('/', web)

//server create
app.listen(port, () => {
    console.log(`server start localhost:${port}`)
})