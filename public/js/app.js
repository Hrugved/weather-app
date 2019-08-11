mapboxgl.accessToken = 'pk.eyJ1IjoicGluZWFwcGxlaWl0aWFuIiwiYSI6ImNqeW12M3gwOTBjaWUzZG1vMnNwam9kOTEifQ.Q3a-tMj8KfBvk7i3q2-ebg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-74.50, 40],
    zoom: 5
})

const weatherForm = document.querySelector('.search')
const search = document.querySelector('.search__input')
// const forecast = document.querySelector('.forecast')
const summary = document.querySelector('.forecast__summary')
const tempCurr = document.querySelector('.forecast__temp-curr')
const tempHigh = document.querySelector('.forecast__temp-high')
const tempLow= document.querySelector('.forecast__temp-low')
const rainProb = document.querySelector('.forecast__rain-prob')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // messageOne.textContent = 'fetching the weather...'
    // summary.textContent = ''

    const location = search.value

    const url = '/weather?address=' + location

    console.log('fetching url ' + url)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return console.log('Fetching error!')
            } 
            console.log(data)
            
            summary.textContent = data.forecast.summary + '.'
            tempCurr.textContent = 'Current temperature is ' + data.forecast.temp__curr
            tempHigh.textContent = 'with high of ' + data.forecast.temp__high
            tempLow.textContent = 'and low of ' + data.forecast.temp__low
            rainProb.textContent = 'There is ' + data.forecast.rain__prob + ' % chance of rain'

            map.flyTo({
                center: [data.longitude,data.latitude],
                zoom:10
            })

            var marker = new mapboxgl.Marker({
                draggable: true
                })
                .setLngLat([data.longitude, data.latitude])
                .addTo(map);
        })    
    })
})