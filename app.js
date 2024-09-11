const express = require('express')
const { connect } = require('mongoose')
const app = express()
const port = 2000
const web = require(('./routes/web'))
const connectDb = require('./db/connectDb')
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