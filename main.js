console.log("hello hello")

const getData = async (zipcode) => {
    const res1 = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=45f1e51dbef05ae84cdd6e1e87e8b9fa`)
    const data1 = await res1.json()
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data1.lat}&lon=${data1.lon}&appid=45f1e51dbef05ae84cdd6e1e87e8b9fa`)
    const data = await res.json() // converting res to json. .json() is a promise, so we have to use await
    let weatherList = []
    weatherList.push(Math.round((data.main.temp_max-273.15)*(9/5)+32).toString()+` \xB0F`)
    weatherList.push(Math.round((data.main.temp_min-273.15)*(9/5)+32).toString()+' \xB0F')
    weatherList.push(data.weather[0]["description"])
    weatherList.push(data.main.humidity+'%')
    weatherList.push(data1.name)
    return weatherList
};

const createList = (temp_max, temp_min, weather, hum, city) => {
    const my_temp_max = document.getElementById('high')
    const my_temp_min = document.getElementById('low')
    const my_weather = document.getElementById('forecast')
    const my_hum = document.getElementById('humidity')
    const my_city = document.getElementById('city')
    my_temp_max.innerText = temp_max
    my_temp_min.innerText = temp_min
    my_weather.innerText = weather
    my_hum.innerText = hum
    my_city.innerText = city
    // my_h4.className = 'list-group-item list-group-item-action list-group-item-light'
    // document.querySelector('section.list-group').insertAdjacentElement('beforeend', my_h4)
};

// this function will be called on click
const loadData = async () => {
    const myInput = document.querySelector('input').value // there is only one input on the page, otherwise, we would have to be specific
    const myList = await getData(myInput); // originally, there was no parameter for getData, but now we are passing in the myInput because we are using information from the page
    createList(myList[0], myList[1], myList[2], myList[3], myList[4])
};


const clearData = () => {
    document.querySelector('section').innerHTML=''
};


