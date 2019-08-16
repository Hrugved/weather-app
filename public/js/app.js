mapboxgl.accessToken = 'pk.eyJ1IjoicGluZWFwcGxlaWl0aWFuIiwiYSI6ImNqeW12M3gwOTBjaWUzZG1vMnNwam9kOTEifQ.Q3a-tMj8KfBvk7i3q2-ebg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-74.50, 40],
    zoom: 5
})

var marker = new mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([-73.99462890625558,40.74491110332883])
    .addTo(map);

const weatherForm = document.querySelector('.form')
const search = document.querySelector('.form__input')
// const forecast = document.querySelector('.forecast')
const summary = document.querySelector('.forecast__summary')
const tempCurrText = document.querySelector('.forecast__temp-curr__text')
const tempCurrValue = document.querySelector('.forecast__temp-curr__value')
const tempHigh = document.querySelector('.forecast__temp-high')
const tempLow= document.querySelector('.forecast__temp-low')
const rainProb = document.querySelector('.forecast__rain-prob')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const url = '/weather?address=' + location

    console.log('fetching url ' + url)

    fetchAndDisplay(url)
})

marker.on('dragend',() => {
    const coords = marker.getLngLat()
    console.log(coords)
    search.value = ''
    const url = '../forecast?lng=' + coords.lng + '&lat=' + coords.lat
    console.log(url)
    fetchAndDisplay(url)
})

fetchAndDisplay = (url) => {
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            return console.log('Fetching error!')
        } 
        console.log(data)
        
        summary.textContent = data.forecast.summary + '.'
        tempCurrText.textContent = 'Current temp of ' 
        tempCurrValue.textContent = data.forecast.temp__curr
        tempHigh.textContent = 'with high of ' + data.forecast.temp__high
        tempLow.textContent = 'and low of ' + data.forecast.temp__low
        rainProb.textContent = 'With ' + data.forecast.rain__prob + ' % chance of rain'

        map.flyTo({
            center: [data.longitude,data.latitude],
            zoom:10
        })

        marker.setLngLat([data.longitude, data.latitude]).addTo(map);
    })
})
}