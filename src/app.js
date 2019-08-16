const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (err,{latitude, longitude, location} = {}) => {
        if(err) {
            return res.send({
                error: err
            })
        }

        const url = '../forecast?lng=' + longitude + '&lat=' + latitude

        return res.redirect(url)
    })
})

app.get('/forecast', (req,res) => {
    // CHECK : possible problem if lng or lat = 0
    if(!req.query.lng || !req.query.lat) {
        return res.send({
            error: 'Invalid coordinates recieved'
        })
    }
    const longitude = req.query.lng
    const latitude = req.query.lat

    forecast(latitude,longitude, (err,forecastData) => {
        if(err) {
            return res.send({
                error: err
            })
        }

        res.send({
            forecast: forecastData,
            latitude,
            longitude
        })
    })
})

app.listen(3000,(req,res) => {
    console.log('Server is running on port 3000')
})