
async function getBackground() {
    const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=aviation")
    const data = await response.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").innerHTML = `By: ${data.user.name}`
}

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => res.json())
    .then(data => {
        document.getElementById("crypto-img").src = data.image.small
        document.getElementById("crypto-price").innerHTML = `${data.market_data.current_price.eur} €`
    })
    .catch(err => {
        console.error(err)
    })

function showTime() {
    const d = new Date()
    let time = d.toLocaleTimeString('en-us', {timeStyle: "short"})
    document.getElementById("time").innerText = time
}

function getWeather() {
    const userLocation = navigator.geolocation.getCurrentPosition((position) => {
        const baseUrl = "https://apis.scrimba.com/openweathermap/data/2.5/"
        fetch(`${baseUrl}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                const weatherIconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.getElementById("weather-icon").src = weatherIconSrc
                document.getElementById("temperature").innerText = `${Math.round(data.main.temp)} ºC`
                document.getElementById("weather-city").innerText = data.name

            })
            .catch(err => console.error(err))

    })
}

getBackground()
setInterval(showTime, 1000);
getWeather()

