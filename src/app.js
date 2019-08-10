const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials('partialsPath')

app.get('/',(req,res) => {
    res.render('index')
})

app.listen(3000,(req,res) => {
    console.log('Server is running on port 3000')
})