const req = require('request')

const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/8a7e975d0c4d7792423d7ad3e7978d20/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'
    
    req({url, json:true}, (err,{body}) => {
        if(err) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error){
            callback('Unable to find location', undefined)
        }
        else {
            const daily = body.daily.data[0]
            const curr = body.currently
            callback(
                undefined,
                {
                    summary : curr.summary,
                    temp__curr : curr.temperature,
                    temp__low : daily.temperatureLow,
                    temp__high : daily.temperatureHigh,
                    rain__prob : curr.precipProbability
                })
            }
    })    
}

module.exports = forecast