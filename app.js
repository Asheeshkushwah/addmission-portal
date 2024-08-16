const express = require('express')
const { connect } = require('mongoose')
const app = express()
const port = 2000
const web = require(('./routes/web'))
const connectDb =require('./db/connectDb')

//routeing
// app.get('/', (req, res) => {
//     res.send('hello world')
// })
// app.get('/about', (req, res) => {
//     res.send('about page')
// }) 

//html css set
app.set('view engine', 'ejs')
//css image link
app.use(express.static('public'))
///connect db
connectDb()



//routeing
app.use('/', web)

//server create
app.listen(port, () => {
    console.log(`server start localhost:${port}`)
})