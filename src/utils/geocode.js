const req = require('request')

const geocode = (address,callback) => {
    const url =  'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicGluZWFwcGxlaWl0aWFuIiwiYSI6ImNqeW12M3gwOTBjaWUzZG1vMnNwam9kOTEifQ.Q3a-tMj8KfBvk7i3q2-ebg'   

    req({url, json:true}, (err,{ body })=> {
        if(err) {
            callback('Unable to connect to location service', undefined)
        }
        else if(body.message){
            callback(body.message, undefined)
        }
        else if(!body.features.length) {
            callback('No such place found', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode