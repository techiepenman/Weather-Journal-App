/* Global Variables */

const button = document.querySelector('#generate');
const feeling = document.getElementById('feelings');
const zip = document.querySelector('#zip');
const apiKey = '2355a2b859c12189c628fa4...';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Listen for a click on generate button to start the app

button.addEventListener("click", runApp);

function runApp() {
    getData(`${url}${zip.value}&appid=${apiKey}`).then(function (data) {
        postData("/addWeather", { temp: data.main.temp, date: newDate, city: data.name, sky: data.weather[0].description, icon: data.weather[0].icon, response: feeling.value });
        console.log(data);
        updateUI();
    });
} //runApp end

//Fetch api and return the response in json format
const getData = async (api) => {
    const response = await fetch(api);
    try {
        const data = await response.json();
        //  Zip code validation
        if (response.status !== 200) {
            alert("Please enter a valid zip code");
        }
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// Post the data to the local server
const postData = async (path = "", data = {}) => {
    const response = await fetch(path, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}; //postData end

// Update UI dynamically
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        const iconAddress = `http://openweathermap.org/img/wn/${allData.icon}@2x.png`;

        document.querySelector(".new").classList.add("post-color");
        document.querySelector("#date").innerHTML = `<h5>Today:</h5><p class='lg-print'>${allData.date}</p>`;
        document.querySelector("#temp").innerHTML = `<h5>The weather in ${allData.city}:</h5><img src=${iconAddress}><p class='lg-print'>${allData.temperature}° with ${allData.sky}</p>`;
        document.querySelector("#user-response").innerHTML = `<h5>The plan is:</h5><p class='sm-print'>${allData.response}</p>`;
    } catch (error) {
        console.log("error", error);
    }
};
