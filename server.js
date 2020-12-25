// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const port = 3000;

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// GET route returns projectData object
app.get("/all", (req, res) => {
    res.send(projectData);
});

// POST route receives data from the app and adds it to the projectData object
app.post("/addWeather", addWeather);

function addWeather(req, res) {
    newData = {
        temperature: req.body.temp,
        date: req.body.date,
        city: req.body.city,
        sky: req.body.sky,
        icon: req.body.icon,
        response: req.body.response,
    };
    projectData = newData;
    res.send(projectData);
    console.log(projectData);
}

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
